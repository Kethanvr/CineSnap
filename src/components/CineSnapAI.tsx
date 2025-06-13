import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  IconButton,
  Typography,
  Chip,
  Avatar,
  Paper,
  Skeleton,
  Grid,
  Tooltip,
  Alert,
  Collapse,
} from "@mui/material";
import {
  Send as SendIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  Movie as MovieIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useSpeechSynthesis, useSpeechRecognition } from "react-speech-kit";
import {
  cineSnapAI,
  type AiResponse,
  type UserContext,
} from "../services/cineSnapAi";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  movies?: Movie[];
  suggestions?: string[];
}

interface CineSnapAIProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: Partial<UserContext>;
}

const CineSnapAI: React.FC<CineSnapAIProps> = ({
  isOpen,
  onClose,
  initialContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);  const [showMovies] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Speech synthesis for AI responses
  const { speak, cancel } = useSpeechSynthesis();

  // Speech recognition for voice input
  const { listen, stop, supported } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputText(result);
      setIsListening(false);
    },
    onError: (error: any) => {
      console.error("Speech recognition error:", error);
      setIsListening(false);
      setError("Voice recognition failed. Please try typing instead.");
    },
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize conversation with context
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "ai",
        content:
          "🎬 Hey there! I'm CineSnap AI, your personal movie companion! Tell me about your mood or what you're in the mood to watch, and I'll find the perfect movie for you. You can type or use voice input!",
        timestamp: new Date(),
        suggestions: [
          "I'm feeling nostalgic",
          "Something thrilling",
          "Light comedy for tonight",
          "What's trending?",
        ],
      };
      setMessages([welcomeMessage]);

      if (initialContext) {
        cineSnapAI.updateContext(initialContext);
      }
    }
  }, [isOpen, initialContext]);

  // Handle sending messages
  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputText.trim();
    if (!text || isLoading) return;

    setError(null);
    setInputText("");
    setIsLoading(true);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // Get AI response
      const aiResponse: AiResponse = await cineSnapAI.chat(text);

      // Add AI message
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponse.message,
        timestamp: new Date(),
        movies: aiResponse.movies,
        suggestions: aiResponse.suggestions,
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Speak the AI response (optional)
      if (aiResponse.message.length < 200) {
        speak({ text: aiResponse.message });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Sorry, I encountered an error. Please try again.");

      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "I'm having trouble right now. Could you try asking again?",
        timestamp: new Date(),
        suggestions: ["What's popular?", "Surprise me!", "Something funny"],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle voice input
  const toggleVoiceInput = () => {
    if (isListening) {
      stop();
      setIsListening(false);
    } else {
      if (supported) {
        setIsListening(true);
        listen({ interimResults: false });
      } else {
        setError("Voice input is not supported in your browser.");
      }
    }
  };

  // Handle suggestion clicks
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  // Reset conversation
  const resetConversation = () => {
    setMessages([]);
    cineSnapAI.resetConversation();
    setError(null);
    cancel(); // Stop any speaking
  };

  // Handle keyboard events
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: "900px",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        {/* Header */}
        <CardContent sx={{ pb: 1, background: "rgba(255, 255, 255, 0.1)" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "white", color: "primary.main" }}>
                <BotIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  CineSnap AI
                </Typography>                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  Your personal movie companion
                </Typography>
              </Box>
            </Box>
            <Box>
              <Tooltip title="Reset conversation">
                <IconButton onClick={resetConversation} sx={{ color: "white" }}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close">
                <IconButton onClick={onClose} sx={{ color: "white" }}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </CardContent>

        {/* Error Alert */}
        <Collapse in={!!error}>
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{ m: 2, mt: 0 }}
          >
            {error}
          </Alert>
        </Collapse>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            padding: 2,
            paddingTop: error ? 0 : 2,
          }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  display="flex"
                  justifyContent={
                    message.role === "user" ? "flex-end" : "flex-start"
                  }
                  mb={2}
                >
                  <Box display="flex" alignItems="start" gap={1} maxWidth="80%">                    {message.role === "ai" && (
                      <Avatar
                        sx={{
                          bgcolor: "white",
                          color: "primary.main",
                          width: 32,
                          height: 32,
                        }}
                      >
                        <BotIcon fontSize="small" />
                      </Avatar>
                    )}

                    <Box>
                      <Paper
                        sx={{
                          p: 2,
                          backgroundColor:
                            message.role === "user"
                              ? "rgba(255, 255, 255, 0.2)"
                              : "rgba(255, 255, 255, 0.9)",
                          color:
                            message.role === "user" ? "white" : "text.primary",
                          borderRadius: 2,
                          minWidth: 100,
                        }}
                      >
                        <Typography variant="body1">
                          {message.content}
                        </Typography>

                        {/* Suggestions */}
                        {message.suggestions && (
                          <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                            {message.suggestions.map((suggestion, idx) => (
                              <Chip
                                key={idx}
                                label={suggestion}
                                size="small"
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }
                                sx={{
                                  backgroundColor: "rgba(103, 126, 234, 0.2)",
                                  color: "primary.main",
                                  "&:hover": {
                                    backgroundColor: "rgba(103, 126, 234, 0.3)",
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        )}

                        {/* Movie Recommendations */}
                        {message.movies && showMovies && (
                          <Box mt={2}>
                            <Box
                              display="flex"
                              alignItems="center"
                              gap={1}
                              mb={2}
                            >
                              <MovieIcon fontSize="small" />
                              <Typography variant="subtitle2" fontWeight="bold">
                                Recommendations
                              </Typography>
                            </Box>
                            <Grid container spacing={2}>
                              {message.movies.slice(0, 6).map((movie) => (
                                <Grid item xs={12} sm={6} md={4} key={movie.id}>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 300,
                                    }}
                                  >
                                    <MovieCard movie={movie} />
                                  </motion.div>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        )}
                      </Paper>                      <Typography
                        variant="caption"
                        display="block"
                        mt={0.5}
                        sx={{ opacity: 0.7 }}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </Box>                    {message.role === "user" && (
                      <Avatar
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          width: 32,
                          height: 32,
                        }}
                      >
                        <PersonIcon fontSize="small" />
                      </Avatar>
                    )}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <Box display="flex" justifyContent="flex-start" mb={2}>
              <Box display="flex" alignItems="start" gap={1} maxWidth="80%">                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    width: 32,
                    height: 32,
                  }}
                >
                  <BotIcon fontSize="small" />
                </Avatar>
                <Paper
                  sx={{
                    p: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Skeleton variant="text" width={200} />
                    <Typography variant="body2" color="text.secondary">
                      Finding perfect movies...
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <CardContent sx={{ pt: 1, background: "rgba(255, 255, 255, 0.1)" }}>
          <Box display="flex" gap={1} alignItems="end">
            <TextField
              ref={inputRef}
              fullWidth
              multiline
              maxRows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isListening
                  ? "Listening..."
                  : "Ask me about movies, your mood, or what you want to watch..."
              }
              disabled={isLoading || isListening}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />

            {/* Voice input button */}
            {supported && (
              <Tooltip title={isListening ? "Stop listening" : "Voice input"}>
                <IconButton
                  onClick={toggleVoiceInput}
                  disabled={isLoading}
                  sx={{
                    color: isListening ? "error.main" : "white",
                    backgroundColor: isListening
                      ? "white"
                      : "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: isListening
                        ? "rgba(255, 255, 255, 0.9)"
                        : "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  {isListening ? <MicOffIcon /> : <MicIcon />}
                </IconButton>
              </Tooltip>
            )}

            {/* Send button */}
            <Tooltip title="Send message">
              <IconButton
                onClick={() => sendMessage()}
                disabled={!inputText.trim() || isLoading}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CineSnapAI;
