import { GoogleGenerativeAI, SchemaType, FunctionDeclaration } from "@google/generative-ai";
import {
  searchMovies,
  getMoviesByGenre,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getLatestMovies,
  getGenres,
} from "./movieApi";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("VITE_GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export interface AiResponse {
  message: string;
  movies?: Movie[];
  suggestions?: string[];
  needsMoreInfo?: boolean;
}

export interface UserContext {
  mood?: string;
  timeOfDay?: string;
  preferredGenres?: string[];
  watchDuration?: string;
  companions?: string[];
  recentlyWatched?: Movie[];
  favoriteActors?: string[];
  avoidGenres?: string[];
}

class CineSnapAI {
  private model;
  private conversationHistory: Array<{
    role: "user" | "model";
    parts: Array<{ text: string }>;
  }> = [];
  private userContext: UserContext = {};

  constructor() {
    this.model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
    });
  }
  // Function definitions for the AI to call
  private getMovieFunctions(): FunctionDeclaration[] {
    return [
      {
        name: "searchMovies",
        description: "Search for movies by title, actor, or keyword",        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            query: { type: SchemaType.STRING, description: "Search query for movies" },            page: {
              type: SchemaType.NUMBER,
              description: "Page number for pagination",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "getMoviesByGenre",
        description: "Get movies filtered by specific genre",        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            genreId: {
              type: SchemaType.STRING,
              description: "Genre ID to filter movies",
            },            sortBy: {
              type: SchemaType.STRING,
              description: "Sort order for movies",
              enum: [
                "popularity.desc",
                "vote_average.desc",
                "release_date.desc",
                "revenue.desc",
              ],
            },
          },
          required: ["genreId"],
        },
      },      {        name: "getPopularMovies",
        description: "Get currently popular movies",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            page: { type: SchemaType.NUMBER, description: "Page number" },
          },
        },
      },
      {        name: "getTopRatedMovies",
        description: "Get highest rated movies of all time",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            page: { type: SchemaType.NUMBER, description: "Page number" },
          },
        },
      },
      {        name: "getUpcomingMovies",
        description: "Get upcoming movie releases",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            page: { type: SchemaType.NUMBER, description: "Page number" },
          },
        },
      },      {        name: "getLatestMovies",
        description: "Get the latest movie releases currently in theaters",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {
            page: { type: SchemaType.NUMBER, description: "Page number" },
          },
        },
      },      {
        name: "getGenres",
        description: "Get all available movie genres",
        parameters: {
          type: SchemaType.OBJECT,
          properties: {},
        },
      },
    ];
  }

  // Execute function calls from the AI
  private async executeFunction(functionName: string, args: any): Promise<any> {
    try {
      switch (functionName) {
        case "searchMovies":
          return await searchMovies(args.query, args.page || 1);
        case "getMoviesByGenre":
          return await getMoviesByGenre(args.genreId, {
            sort_by: args.sortBy || "popularity.desc",
          });
        case "getPopularMovies":
          return await getPopularMovies(args.page || 1);
        case "getTopRatedMovies":
          return await getTopRatedMovies(args.page || 1);
        case "getUpcomingMovies":
          return await getUpcomingMovies(args.page || 1);
        case "getLatestMovies":
          return await getLatestMovies(args.page || 1);
        case "getGenres":
          return await getGenres();
        default:
          throw new Error(`Unknown function: ${functionName}`);
      }
    } catch (error) {
      console.error(`Error executing function ${functionName}:`, error);
      throw error;
    }
  }

  // Main chat method
  async chat(
    userMessage: string,
    context?: Partial<UserContext>
  ): Promise<AiResponse> {
    try {
      // Update user context
      if (context) {
        this.userContext = { ...this.userContext, ...context };
      }

      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt();

      // Add user message to conversation
      this.conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }],
      });

      // Start a chat session with function calling
      const chat = this.model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: systemPrompt }],
          },
          ...this.conversationHistory,
        ],
        tools: [{ functionDeclarations: this.getMovieFunctions() }],
      });

      const result = await chat.sendMessage(userMessage);
      const response = result.response;

      // Handle function calls
      let movies: Movie[] = [];
      const functionCalls = response.functionCalls();

      if (functionCalls && functionCalls.length > 0) {
        for (const call of functionCalls) {
          try {
            const functionResult = await this.executeFunction(
              call.name,
              call.args
            );

            // Send function result back to AI
            await chat.sendMessage([
              {
                functionResponse: {
                  name: call.name,
                  response: functionResult,
                },
              },
            ]);

            // Collect movies from function results
            if (functionResult.results) {
              movies = [...movies, ...functionResult.results.slice(0, 6)]; // Limit to 6 movies
            }
          } catch (error) {
            console.error("Function call error:", error);
          }
        }

        // Get final response after function calls
        const finalResult = await chat.sendMessage(
          "Based on the function results, provide your movie recommendations and explanation."
        );
        const finalResponse = finalResult.response.text();

        // Add AI response to conversation history
        this.conversationHistory.push({
          role: "model",
          parts: [{ text: finalResponse }],
        });

        return {
          message: finalResponse,
          movies: movies.length > 0 ? movies : undefined,
          suggestions: this.generateFollowUpSuggestions(),
          needsMoreInfo: false,
        };
      }

      // No function calls - regular conversation
      const aiMessage = response.text();

      // Add AI response to conversation history
      this.conversationHistory.push({
        role: "model",
        parts: [{ text: aiMessage }],
      });

      return {
        message: aiMessage,
        suggestions: this.generateFollowUpSuggestions(),
        needsMoreInfo: this.checkIfNeedsMoreInfo(aiMessage),
      };
    } catch (error) {
      console.error("CineSnap AI Error:", error);
      return {
        message:
          "I'm having trouble processing your request right now. Could you try rephrasing your question?",
        suggestions: [
          "What's popular right now?",
          "I'm feeling adventurous",
          "Something light and funny",
        ],
        needsMoreInfo: false,
      };
    }
  }

  private buildSystemPrompt(): string {
    const contextInfo = Object.entries(this.userContext)
      .filter(([_, value]) => value !== undefined)
      .map(
        ([key, value]) =>
          `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
      )
      .join("\n");

    return `You are CineSnap AI, a friendly and knowledgeable movie recommendation assistant. Your goal is to help users discover the perfect movies based on their mood, preferences, and context.

Key Instructions:
1. Always be conversational, enthusiastic, and personable
2. Ask follow-up questions to better understand user preferences
3. Use function calls to search for and recommend movies
4. Consider user's mood, time of day, and viewing context
5. Provide 3-6 movie recommendations when possible
6. Explain WHY you're recommending each movie
7. Be aware of different genres and cater to various tastes
8. Keep responses concise but informative

User Context:
${contextInfo || "No specific context provided yet"}

When recommending movies:
- Consider the user's stated mood and preferences
- Think about viewing context (alone, with friends, family, date night, etc.)
- Balance popular picks with hidden gems
- Explain your reasoning for each recommendation
- Ask clarifying questions if you need more information

Remember: You're not just a search engine - you're a movie-loving friend helping someone find their next great watch!`;
  }

  private generateFollowUpSuggestions(): string[] {
    const suggestions = [
      "What's your mood like right now?",
      "Any favorite actors or directors?",
      "Something new or a classic?",
      "Are you watching alone or with others?",
      "How much time do you have?",
      "Any genres you want to avoid?",
    ];

    // Return 3 random suggestions
    return suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);
  }

  private checkIfNeedsMoreInfo(message: string): boolean {
    const indicators = [
      "tell me more",
      "what about",
      "any preference",
      "what genre",
      "mood",
      "?",
    ];
    return indicators.some((indicator) =>
      message.toLowerCase().includes(indicator)
    );
  }

  // Reset conversation
  resetConversation(): void {
    this.conversationHistory = [];
    this.userContext = {};
  }

  // Update user context
  updateContext(context: Partial<UserContext>): void {
    this.userContext = { ...this.userContext, ...context };
  }

  // Get conversation history
  getConversationHistory() {
    return this.conversationHistory;
  }
}

export const cineSnapAI = new CineSnapAI();
