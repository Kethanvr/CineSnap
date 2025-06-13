import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Chip,
  LinearProgress,
  Grid,
  Card,
  CardContent,
  Button,
  Tooltip,
  Alert,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { liveApiService, MoodAnalysis } from "../services/liveApi";

interface LiveModeAIProps {
  open: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SessionInfo {
  sessionId: string;
  isConnected: boolean;
  elapsed: number;
  remaining: number;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

const LiveModeAI: React.FC<LiveModeAIProps> = ({ open, onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMood, setCurrentMood] = useState<MoodAnalysis | null>(null);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionIntervalRef = useRef<number | null>(null);

  // Initialize Live API service handlers
  useEffect(() => {
    liveApiService.onMessage((message: string, isUser: boolean) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message,
        isUser,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newMessage]);
    });

    liveApiService.onMoodAnalysis((analysis: MoodAnalysis) => {
      setCurrentMood(analysis);
    });

    liveApiService.onConnectionState((connected: boolean) => {
      setIsConnected(connected);
      setIsConnecting(false);
    });

    liveApiService.onError((errorMessage: string) => {
      setError(errorMessage);
      setIsConnecting(false);
    });

    return () => {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
      }
    };
  }, []);

  // Update session info periodically
  useEffect(() => {
    if (isConnected) {
      sessionIntervalRef.current = setInterval(() => {
        const info = liveApiService.getSessionInfo();
        setSessionInfo(info);
      }, 1000);
    } else {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
        sessionIntervalRef.current = null;
      }
      setSessionInfo(null);
    }

    return () => {
      if (sessionIntervalRef.current) {
        clearInterval(sessionIntervalRef.current);
      }
    };
  }, [isConnected]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Set up video stream when connected
  useEffect(() => {
    const setupVideoStream = () => {
      if (isConnected && sessionInfo?.isVideoEnabled && videoRef.current) {
        const mediaStream = liveApiService.getMediaStream();
        if (mediaStream && videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          console.log(
            "Video stream connected to display element:",
            mediaStream.getTracks()
          );

          // Ensure video plays
          videoRef.current
            .play()
            .catch((e) => console.error("Video play error:", e));
        }
      } else if (videoRef.current) {
        // Clear video when not connected or video disabled
        videoRef.current.srcObject = null;
      }
    };

    // Small delay to ensure the media stream is ready
    if (isConnected && sessionInfo?.isVideoEnabled) {
      setTimeout(setupVideoStream, 100);
    } else {
      setupVideoStream();
    }
  }, [isConnected, sessionInfo?.isVideoEnabled]);

  // Additional effect to handle session info updates
  useEffect(() => {
    if (isConnected && videoRef.current) {
      const mediaStream = liveApiService.getMediaStream();
      if (mediaStream && videoRef.current.srcObject !== mediaStream) {
        videoRef.current.srcObject = mediaStream;
        console.log("Video stream updated:", mediaStream.getTracks());
      }
    }
  }, [sessionInfo]);

  const startLiveSession = async () => {
    setIsConnecting(true);
    setError(null);
    setMessages([]);
    setCurrentMood(null);

    const success = await liveApiService.startLiveSession(true, true);
    if (success) {
      const welcomeMessage: ChatMessage = {
        id: "welcome",
        text: "🎬 Welcome to CineSnap AI Live Mode! I can see and hear you now. Let's find the perfect movie based on your mood and preferences!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  };

  const endSession = () => {
    liveApiService.endSession();
    setIsConnected(false);
    setSessionInfo(null);
    setCurrentMood(null);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const toggleVideo = () => {
    const enabled = liveApiService.toggleVideo();
    setSessionInfo((prev) =>
      prev ? { ...prev, isVideoEnabled: enabled || false } : null
    );
  };

  const toggleAudio = () => {
    const enabled = liveApiService.toggleAudio();
    setSessionInfo((prev) =>
      prev ? { ...prev, isAudioEnabled: enabled || false } : null
    );
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: "#4CAF50",
      sad: "#2196F3",
      stressed: "#FF9800",
      bored: "#9C27B0",
      romantic: "#E91E63",
      adventurous: "#FF5722",
      neutral: "#757575",
    };
    return colors[mood] || colors.neutral;
  };

  const handleClose = () => {
    if (isConnected) {
      endSession();
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: "90vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            🎬 CineSnap AI Live Mode
          </Typography>
          {isConnected && (
            <Chip
              label="LIVE"
              color="success"
              size="small"
              sx={{
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                  "100%": { opacity: 1 },
                },
              }}
            />
          )}
        </Box>
        <IconButton onClick={handleClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
      >
        {/* Session Info Bar */}
        {sessionInfo && (
          <Card sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", color: "white" }}>
            <CardContent sx={{ py: 1 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2">
                    Session: {formatTime(sessionInfo.elapsed)} /{" "}
                    {formatTime(sessionInfo.remaining)}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (sessionInfo.elapsed /
                        (sessionInfo.elapsed + sessionInfo.remaining)) *
                      100
                    }
                    sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.3)" }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                >
                  <Tooltip
                    title={
                      sessionInfo.isVideoEnabled
                        ? "Turn off camera"
                        : "Turn on camera"
                    }
                  >
                    <IconButton onClick={toggleVideo} sx={{ color: "white" }}>
                      {sessionInfo.isVideoEnabled ? (
                        <VideocamIcon />
                      ) : (
                        <VideocamOffIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    title={
                      sessionInfo.isAudioEnabled
                        ? "Mute microphone"
                        : "Unmute microphone"
                    }
                  >
                    <IconButton onClick={toggleAudio} sx={{ color: "white" }}>
                      {sessionInfo.isAudioEnabled ? (
                        <MicIcon />
                      ) : (
                        <MicOffIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="End session">
                    <IconButton onClick={endSession} sx={{ color: "white" }}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={{ flex: 1 }}>
          {/* Video and Controls Column */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: "100%",
              }}
            >
              {/* Video Feed */}
              <Card sx={{ bgcolor: "rgba(0, 0, 0, 0.5)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Your Video
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: 200,
                      bgcolor: "black",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    {isConnected && sessionInfo?.isVideoEnabled ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transform: "scaleX(-1)", // Mirror effect
                          backgroundColor: "#000",
                        }}
                        onLoadedMetadata={() =>
                          console.log("Video metadata loaded")
                        }
                        onPlay={() => console.log("Video started playing")}
                        onError={(e) => console.error("Video error:", e)}
                      />
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        {isConnected ? "Camera disabled" : "Not connected"}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>

              {/* Mood Analysis */}
              {currentMood && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.1)", color: "white" }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Detected Mood
                      </Typography>
                      <Chip
                        label={currentMood.primaryMood.toUpperCase()}
                        sx={{
                          bgcolor: getMoodColor(currentMood.primaryMood),
                          color: "white",
                          fontWeight: "bold",
                          mb: 1,
                        }}
                      />
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Confidence: {Math.round(currentMood.confidence * 100)}%
                      </Typography>
                      <Divider
                        sx={{ my: 1, bgcolor: "rgba(255,255,255,0.3)" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        Recommendations:
                      </Typography>
                      {currentMood.recommendations.map((rec, index) => (
                        <Chip
                          key={index}
                          label={rec}
                          size="small"
                          sx={{
                            m: 0.5,
                            bgcolor: "rgba(255,255,255,0.2)",
                            color: "white",
                          }}
                        />
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Connection Controls */}
              {!isConnected && (
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={startLiveSession}
                    disabled={isConnecting}
                    size="large"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": { bgcolor: "rgba(255, 255, 255, 0.3)" },
                      minWidth: 200,
                    }}
                  >
                    {isConnecting ? "Connecting..." : "Start Live Session"}
                  </Button>
                  <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                    Grant camera and microphone access for the best experience
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>

          {/* Chat Column */}
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  p: 2,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: "white" }}>
                  Live Conversation
                </Typography>

                {/* Messages */}
                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <AnimatePresence>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: message.isUser
                              ? "flex-end"
                              : "flex-start",
                            mb: 1,
                          }}
                        >
                          <Box
                            sx={{
                              maxWidth: "80%",
                              p: 2,
                              borderRadius: 2,
                              bgcolor: message.isUser
                                ? "rgba(255, 255, 255, 0.2)"
                                : "rgba(0, 0, 0, 0.3)",
                              color: "white",
                            }}
                          >
                            <Typography variant="body1">
                              {message.text}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ opacity: 0.7, mt: 0.5, display: "block" }}
                            >
                              {message.timestamp.toLocaleTimeString()}
                            </Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </Box>

                {/* Live Status */}
                {isConnected && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 2,
                      bgcolor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "white", opacity: 0.8 }}
                    >
                      🎤 Speak naturally or show expressions - I'm analyzing
                      your mood in real-time!
                    </Typography>
                  </Box>
                )}

                {!isConnected && messages.length === 0 && (
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 4,
                      bgcolor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: 1,
                    }}
                  >
                    <InfoIcon sx={{ fontSize: 48, opacity: 0.5, mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                      Welcome to Live Mode
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "white", opacity: 0.8 }}
                    >
                      Start a live session to experience real-time video and
                      audio interactions with mood-based movie recommendations!
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default LiveModeAI;
