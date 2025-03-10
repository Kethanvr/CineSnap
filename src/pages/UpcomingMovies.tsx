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
import { getUpcomingMovies } from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import { TrendingUp, CalendarToday } from "@mui/icons-material";
import { useState } from "react";
import MovieCard from "../components/MovieCard.tsx";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  hasNextPage: boolean;
}

const UpcomingMovies = () => {
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
      queryKey: ["upcoming-movies", page],
      queryFn: ({ pageParam }) => getUpcomingMovies(pageParam),
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
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <CalendarToday sx={{ color: "primary.main" }} />
          <Typography variant="h4" component="h1">
            Upcoming Movies
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {totalResults} movies
          </Typography>
        </Stack>

        <Grid container spacing={3}>
          {allMovies.map((movie: Movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>

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

export default UpcomingMovies;
