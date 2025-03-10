import { useQuery } from "@tanstack/react-query";
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import { getPopularMovies, getLatestMovies } from "../../services/movieApi.ts";
import MovieCard from "../../components/MovieCard.tsx";
import HeroSection from "../../components/HeroSection.tsx";
import { MovieResponse } from "../../types/movie.ts";

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
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <HeroSection />

      <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
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

        <Typography variant="h2" gutterBottom sx={{ mb: 4 }}>
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
