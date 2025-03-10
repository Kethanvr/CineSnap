import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Grid,
  Skeleton,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getTopRatedMovies } from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import { TrendingUp, Star } from "@mui/icons-material";
import { useState } from "react";
import MovieCard from "../components/MovieCard.tsx";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  hasNextPage: boolean;
}

const TopRatedMovies = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      MovieResponse,
      Error,
      InfiniteData<MovieResponse>,
      (string | number)[],
      number
    >({
      queryKey: ["top-rated-movies", page],
      queryFn: ({ pageParam }) => getTopRatedMovies(pageParam),
      getNextPageParam: (lastPage: MovieResponse) =>
        lastPage.hasNextPage ? page + 1 : undefined,
      initialPageParam: 1,
    });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    fetchNextPage();
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          {[...Array(12)].map((_, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={`skeleton-${index}-${Date.now()}`}
            >
              <Skeleton
                variant="rectangular"
                height={isMobile ? 200 : 300}
                sx={{ borderRadius: 2 }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  const currentPage = data?.pages[data.pages.length - 1];
  const totalResults = currentPage?.total_results || 0;
  const allMovies =
    data?.pages.flatMap((page: MovieResponse) => page.results) || [];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Star sx={{ color: "warning.main" }} />
          <Typography variant="h4" component="h1">
            Top Rated Movies
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {totalResults} movies
          </Typography>
        </Stack>

        {/* Movies Grid */}
        <Grid container spacing={3}>
          {allMovies.map((movie: Movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

        {/* Load More */}
        {hasNextPage && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              startIcon={<TrendingUp />}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TopRatedMovies;
