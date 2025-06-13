# 🤖 CineSnap AI Setup Guide

Welcome to CineSnap AI! This guide will help you set up the AI-powered movie recommendation feature that uses Google's Gemini 2.0 Flash model.

## 🚀 Features

- **Conversational Movie Recommendations**: Chat with AI to get personalized movie suggestions
- **Voice Input Support**: Use your voice to ask for recommendations (browser-dependent)
- **Mood-Based Search**: Tell the AI your mood and get perfect matches
- **Function Calling**: AI can intelligently search your movie database
- **Context Awareness**: Remembers conversation context for better recommendations
- **Beautiful UI**: Modern chat interface with animations and movie cards

## 🔧 Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Environment Variables

Create a `.env` file in the root directory with the following:

```env
# Your existing TMDB API key
VITE_TMDB_API_KEY=your_tmdb_api_key_here

# Add this new line for Gemini AI
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies

The required dependencies should already be installed:

- `@google/generative-ai` - Google's Gemini API SDK
- `react-speech-kit` - Voice input/output support

If not, run:

```bash
npm install @google/generative-ai react-speech-kit
```

### 4. Start the Development Server

```bash
npm run dev
```

## 🎯 How to Use CineSnap AI

### Method 1: Floating AI Button

- Look for the purple AI button in the bottom-right corner
- Click it to open the chat interface

### Method 2: Navbar AI Button

- Click the AI brain icon in the top navigation bar
- Available on both desktop and mobile

### Method 3: Home Page Integration

- Visit the home page to see the "Meet CineSnap AI" section
- Try "Surprise Me!" for instant recommendations
- Or click "Chat with AI" for a conversation

## 💬 Example Conversations

Here are some ways to interact with CineSnap AI:

### Mood-Based Requests

- "I'm feeling nostalgic, what should I watch?"
- "I need something uplifting and funny"
- "I'm in the mood for a thrilling adventure"
- "Something romantic for date night"

### Specific Preferences

- "Show me the best sci-fi movies from the 2010s"
- "I love Christopher Nolan films, what else should I watch?"
- "What are some good horror movies that aren't too scary?"
- "I want to watch something with great cinematography"

### Context-Aware Requests

- "I'm watching with my 8-year-old, any family-friendly suggestions?"
- "I have 90 minutes before bed, something light?"
- "My friends are coming over, what's a good group movie?"

## 🎤 Voice Features

CineSnap AI supports voice input in compatible browsers:

- **Chrome/Edge**: Full support for voice recognition
- **Firefox**: Limited support
- **Safari**: Basic support
- **Mobile**: Varies by device and browser

To use voice:

1. Click the microphone icon in the chat
2. Speak your request clearly
3. The AI will process your voice input and respond

## ⚙️ Technical Details

### AI Model

- **Model**: Gemini 2.0 Flash Thinking Mode
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 2048
- **Function Calling**: Enabled for movie database queries

### Available Functions

The AI can call these functions to search your movie database:

- `searchMovies` - Search by title, actor, or keyword
- `getMoviesByGenre` - Filter by specific genres
- `getPopularMovies` - Get trending movies
- `getTopRatedMovies` - Get highest-rated films
- `getUpcomingMovies` - Get upcoming releases
- `getLatestMovies` - Get latest theater releases

### Privacy & Data

- Conversations are not stored permanently
- Only current session context is maintained
- No personal data is sent to Google beyond your movie preferences
- API calls are made directly from your browser

## 🛠️ Customization Options

### Adding New Conversation Triggers

You can add AI buttons to other pages by:

```tsx
import type { UserContext } from "../services/cineSnapAi";

// In your component props
interface YourComponentProps {
  onOpenAI?: (context?: Partial<UserContext>) => void;
}

// Add a button that opens AI with context
<Button onClick={() => onOpenAI?.({ mood: "adventurous" })}>
  Find Adventure Movies
</Button>;
```

### Modifying AI Behavior

Edit `src/services/cineSnapAi.ts` to:

- Change the AI's personality in `buildSystemPrompt()`
- Add new function calls for additional movie data
- Modify conversation flow and responses

### UI Customization

The AI chat interface is in `src/components/CineSnapAI.tsx`:

- Modify colors and gradients
- Change animation timings
- Customize chat bubble styles
- Add new features like movie trailers

## 🐛 Troubleshooting

### Common Issues

**"API Key Error"**

- Make sure your Gemini API key is correctly set in `.env`
- Verify the key is active at [Google AI Studio](https://makersuite.google.com/app/apikey)

**"Voice input not working"**

- Check browser compatibility
- Ensure microphone permissions are granted
- Try typing instead if voice fails

**"No movie recommendations"**

- Check that your TMDB API key is working
- Verify internet connection
- Try simpler requests like "popular movies"

**"AI responses are slow"**

- This is normal for the first request (model initialization)
- Subsequent requests should be faster
- Check your internet connection

### Getting Help

If you encounter issues:

1. Check the browser console for error messages
2. Verify both API keys are set correctly
3. Make sure all dependencies are installed
4. Try clearing browser cache and restarting

## 🌟 What's Next?

Future enhancements planned:

- **User Preferences**: Remember favorite genres and actors
- **Watch History Integration**: Avoid recommending already-watched movies
- **Social Features**: Share AI recommendations with friends
- **Enhanced Context**: Time of day, weather-based suggestions
- **Multiple Languages**: Support for non-English conversations

## 🎬 Enjoy Your AI-Powered Movie Discovery!

CineSnap AI is designed to make finding your next favorite movie as easy as having a conversation. Whether you know exactly what you want or need some inspiration, just start chatting and let the AI guide you to the perfect film!

Happy movie watching! 🍿
