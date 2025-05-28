import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { getPopularMovies, getLatestMovies } from "../services/movieApi.ts";
import MovieCard from "../components/MovieCard.tsx";
import HeroSection from "../components/HeroSection.tsx";
import ProtectedContent from "../components/ProtectedContent.tsx";
import { LoadingSpinner, ErrorState, SEO } from "../components/common/index.ts";
import type { MovieResponse } from "../types/movie.ts";

const Home = () => {
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
