import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import { getPopularMovies, getLatestMovies } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import type { MovieResponse } from "../types/movie";

const Home = () => {
  const { data: popularMovies, isLoading: isLoadingPopular } =
    useQuery<MovieResponse>({
      queryKey: ["popularMovies"],
      queryFn: () => getPopularMovies(),
    });

  const { data: latestMovies, isLoading: isLoadingLatest } =
    useQuery<MovieResponse>({
      queryKey: ["latestMovies"],
      queryFn: () => getLatestMovies(),
    });

  if (isLoadingPopular || isLoadingLatest) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <HeroSection />

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          Latest Releases
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {latestMovies?.results?.slice(0, 8).map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 8 }} />

        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          Popular Movies
        </Typography>
        <Grid container spacing={3}>
          {popularMovies?.results?.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
