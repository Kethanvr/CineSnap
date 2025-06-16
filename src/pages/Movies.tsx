import { useInfiniteQuery } from "@tanstack/react-query";
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
import { getLatestMovies } from "../services/movieApi.ts";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie.ts";
import { CalendarToday } from "@mui/icons-material";
import { SEO } from "../components/common/index.ts";
import { ResponsiveAd, InArticleAd } from "../components/ads";

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

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<MovieResponse>({
      queryKey: ["latest-movies"],
      queryFn: ({ pageParam = 1 }) => getLatestMovies(pageParam as number),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.total_pages + 1 : undefined,
      initialPageParam: 1,
    });

  const handleLoadMore = () => {
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
      <SEO
        title="Latest Movies | CineSnap - Discover New Films"
        description={`Discover ${totalResults} latest movies. Stay updated with the newest film releases, trending movies, and must-watch cinema on CineSnap.`}
        url="https://cinesnap.kethanvr.me/movies"
        keywords="latest movies, new movies, recent films, movie releases, trending movies, CineSnap"
      />
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

        {/* Advertisement - Top of movies page */}
        <ResponsiveAd adSlot="5678901234" />

        <Grid container spacing={3}>
          {allMovies.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  bgcolor: "background.paper",
                  // Overlay removed
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

        {/* Advertisement - Middle of movies list */}
        {allMovies.length > 12 && (
          <Grid item xs={12}>
            <InArticleAd adSlot="6789012345" />
          </Grid>
        )}

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
