import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Skeleton,
  Stack,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getLatestMovies } from "../services/movieApi";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { CalendarToday } from "@mui/icons-material";
import { useState } from "react";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  hasNextPage: boolean;
}

const Movies = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<
      MovieResponse,
      Error,
      InfiniteData<MovieResponse>,
      (string | number)[],
      number
    >({
      queryKey: ["latest-movies", page],
      queryFn: ({ pageParam }) => getLatestMovies(pageParam),
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
            Latest Movies
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
          {allMovies.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  bgcolor: "background.paper",
                }}
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  sx={{
                    height: isMobile ? 200 : 300,
                    objectFit: "cover",
                    transition: "none",
                  }}
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ mb: 1, fontWeight: 500 }}
                  >
                    {movie.title}
                  </Typography>
                  <Rating
                    value={movie.vote_average / 2}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {hasNextPage && (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Movies;
