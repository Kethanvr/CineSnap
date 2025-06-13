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
} from "@mui/material";
import {
  Psychology as AIIcon,
  TrendingUp as TrendingIcon,
  Movie as MovieIcon,
  AutoAwesome as SparkleIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { getPopularMovies, getLatestMovies } from "../services/movieApi.ts";
import MovieCard from "../components/MovieCard.tsx";
import HeroSection from "../components/HeroSection.tsx";
import ProtectedContent from "../components/ProtectedContent.tsx";
import { LoadingSpinner, ErrorState, SEO } from "../components/common/index.ts";
import type { MovieResponse } from "../types/movie.ts";
import type { UserContext } from "../services/cineSnapAi.ts";

interface HomeProps {
  onOpenAI?: (context?: Partial<UserContext>) => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAI }) => {
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
                  Tell me your mood, and I'll find the perfect movie for you!
                  Whether you're feeling adventurous, need a good laugh, or want
                  something deep and meaningful - I've got you covered.
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <TrendingIcon fontSize="small" />
                      <Typography variant="body2">
                        Smart Recommendations
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <MovieIcon fontSize="small" />
                      <Typography variant="body2">
                        Voice & Text Support
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <SparkleIcon fontSize="small" />
                      <Typography variant="body2">Mood-Based Search</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <AIIcon fontSize="small" />
                      <Typography variant="body2">
                        Powered by Gemini AI
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
                  <Grid item xs={12} sm={6} md={12}>
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
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

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
    </Box>
  );
};

export default Home;
