import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
  Button,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import {
  Psychology as AIIcon,
  TrendingUp as TrendingIcon,
  Movie as MovieIcon,
  AutoAwesome as SparkleIcon,
  VideoCall as VideoCallIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { getPopularMovies, getLatestMovies } from "../services/movieApi.ts";
import MovieCard from "../components/MovieCard.tsx";
import HeroSection from "../components/HeroSection.tsx";
import ProtectedContent from "../components/ProtectedContent.tsx";
import LiveModeAI from "../components/LiveModeAI.tsx";
import { LoadingSpinner, ErrorState, SEO } from "../components/common/index.ts";
import { ResponsiveAd, InArticleAd } from "../components/ads";
import type { MovieResponse } from "../types/movie.ts";
import type { UserContext } from "../services/cineSnapAi.ts";

interface HomeProps {
  onOpenAI?: (context?: Partial<UserContext>) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAI }) => {
  const [isLiveModeOpen, setIsLiveModeOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useQuery<MovieResponse>({
    queryKey: ["popularMovies"],
    queryFn: () => getPopularMovies(),
  });

  const {
    data: latestMovies,
    isLoading: isLoadingLatest,
    error: errorLatest,
  } = useQuery<MovieResponse>({
    queryKey: ["latestMovies"],
    queryFn: () => getLatestMovies(),
  });

  if (isLoadingPopular || isLoadingLatest) {
    return <LoadingSpinner size={48} />;
  }
  if (errorPopular || errorLatest) {
    return (
      <ErrorState
        message="Failed to load movies. Please try again."
        onRetry={() => window.location.reload()}
        fullScreen
      />
    );
  }
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <SEO
        title="CineSnap | Discover Movies with AI"
        description="Discover, explore, and get movie recommendations instantly with CineSnap - your AI-powered movie discovery companion. Built by Kethan VR."
        url="https://cinesnap.kethanvr.me"
        keywords="CineSnap, AI Movie Finder, Movie Discovery, Popular Movies, Latest Movies, Kethan VR"
      />
      <HeroSection />

      <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6, md: 8 } }}>
        <ProtectedContent />

        {/* CineSnap AI Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper
            elevation={3}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              p: { xs: 3, sm: 4 },
              mb: { xs: 6, sm: 8 },
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                display: { xs: "none", sm: "block" },
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 120,
                height: 120,
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "50%",
                display: { xs: "none", sm: "block" },
              }}
            />

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <AIIcon fontSize="large" />
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }}
                  >
                    Meet CineSnap AI
                  </Typography>
                  <SparkleIcon
                    sx={{ color: "yellow", animation: "pulse 2s infinite" }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    lineHeight: 1.6,
                  }}
                >
                  Your intelligent movie discovery companion! Tell me your mood,
                  preferences, or what you're craving to watch. I'll analyze
                  thousands of movies to find your perfect match. Whether you're
                  feeling nostalgic, need something thrilling, want a good
                  laugh, or crave deep storytelling - I understand you!
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <TrendingIcon fontSize="small" />
                      <Typography variant="body2">
                        Smart Recommendations Engine
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <MovieIcon fontSize="small" />
                      <Typography variant="body2">
                        Voice & Text Conversations
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SparkleIcon fontSize="small" />
                      <Typography variant="body2">
                        Context-Aware Suggestions
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <AIIcon fontSize="small" />
                      <Typography variant="body2">
                        Real-Time Movie Database
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <TrendingIcon fontSize="small" />
                      <Typography variant="body2">
                        Mood & Preference Analysis
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <SparkleIcon fontSize="small" />
                      <Typography variant="body2">
                        Personalized Experience
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={12}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => onOpenAI?.({ mood: "surprise me" })}
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<SparkleIcon />}
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(10px)",
                          border: "1px solid rgba(255, 255, 255, 0.3)",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.3)",
                          },
                          py: 1.5,
                        }}
                      >
                        Surprise Me!
                      </Button>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => onOpenAI?.()}
                        variant="outlined"
                        size="large"
                        fullWidth
                        startIcon={<AIIcon />}
                        sx={{
                          color: "white",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                          "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          },
                          py: 1.5,
                        }}
                      >
                        Chat with AI
                      </Button>
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => setIsLiveModeOpen(true)}
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<VideoCallIcon />}
                        sx={{
                          background:
                            "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
                          color: "white",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #FF5252 30%, #26C6DA 90%)",
                          },
                          py: 1.5,
                          animation: "pulse 2s infinite",
                          "@keyframes pulse": {
                            "0%": {
                              boxShadow: "0 0 0 0 rgba(255, 107, 107, 0.7)",
                            },
                            "70%": {
                              boxShadow: "0 0 0 10px rgba(255, 107, 107, 0)",
                            },
                            "100%": {
                              boxShadow: "0 0 0 0 rgba(255, 107, 107, 0)",
                            },
                          },
                        }}
                      >
                        🎙️ Live Mode
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Advertisement - Top of page after hero */}
        <ResponsiveAd adSlot="1234567890" />

        {/* App Features Overview */}
        <Grid container spacing={4} sx={{ mb: { xs: 6, sm: 8 } }}>
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <TrendingIcon fontSize="large" />
                    <Typography variant="h6" fontWeight="bold">
                      Intelligent Discovery
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, lineHeight: 1.6 }}
                  >
                    Our AI understands your preferences, mood, and viewing
                    context to recommend movies you'll actually love. No more
                    endless scrolling!
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <MovieIcon fontSize="large" />
                    <Typography variant="h6" fontWeight="bold">
                      Complete Movie Database
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, lineHeight: 1.6 }}
                  >
                    Access thousands of movies with detailed information,
                    ratings, cast, trailers, and reviews all in one beautiful
                    interface.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  color: "white",
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <SparkleIcon fontSize="large" />
                    <Typography variant="h6" fontWeight="bold">
                      Conversational Interface
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ opacity: 0.9, lineHeight: 1.6 }}
                  >
                    Chat naturally with our AI using voice or text. Just
                    describe what you're in the mood for, and get instant
                    personalized recommendations.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Advertisement - Between features and latest releases */}
        <InArticleAd adSlot="2345678901" />

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: { xs: 3, sm: 4 },
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.5rem" },
            px: { xs: 1, sm: 0 },
          }}
        >
          Latest Releases
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, sm: 3 }}
          sx={{ mb: { xs: 6, sm: 8 } }}
        >
          {latestMovies?.results?.slice(0, isMobile ? 6 : 8).map((movie) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: { xs: 6, sm: 8 } }} />

        {/* Advertisement - Between latest and popular movies */}
        <ResponsiveAd adSlot="3456789012" />

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: { xs: 3, sm: 4 },
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.5rem" },
            px: { xs: 1, sm: 0 },
          }}
        >
          Popular Movies
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {popularMovies?.results?.slice(0, isMobile ? 6 : 12).map((movie) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Live Mode AI Component */}
      <LiveModeAI
        open={isLiveModeOpen}
        onClose={() => setIsLiveModeOpen(false)}
      />
    </Box>
  );
};

export default Home;
