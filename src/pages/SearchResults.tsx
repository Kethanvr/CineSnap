import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
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
import { searchMovies } from "../services/movieApi";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { Search, TrendingUp } from "@mui/icons-material";
import { useState } from "react";

const SearchResults = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [page, setPage] = useState(1);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useQuery({
      queryKey: ["search", query, page],
      queryFn: () => searchMovies(query, page),
      enabled: !!query,
      keepPreviousData: true,
    });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    fetchNextPage();
  };

  if (!query) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center">
            Please enter a search query
          </Typography>
        </Container>
      </Box>
    );
  }

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

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Search sx={{ color: "primary.main" }} />
          <Typography variant="h4" component="h1">
            Search Results for "{query}"
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {data?.total_results || 0} results found
          </Typography>
        </Stack>

        {/* Results Grid */}
        {data?.results.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No results found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try different keywords or check the spelling
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {data?.results.map((movie: Movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "perspective(1000px) rotateY(0deg)",
                    "&:hover": {
                      transform:
                        "perspective(1000px) rotateY(10deg) translateY(-5px)",
                      "& .movie-info": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=No+Poster"
                      }
                      alt={movie.title}
                      sx={{
                        height: isMobile ? 200 : 300,
                        objectFit: "cover",
                      }}
                    />
                    {!isMobile && (
                      <Box
                        className="movie-info"
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(0, 0, 0, 0.8)",
                          color: "white",
                          p: 2,
                          opacity: 0,
                          transform: "translateY(100%)",
                          transition: "all 0.3s ease-in-out",
                        }}
                      >
                        <Typography variant="subtitle2" noWrap>
                          {movie.title}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mt: 0.5 }}
                        >
                          <Rating
                            value={movie.vote_average / 2}
                            precision={0.5}
                            size="small"
                            readOnly
                          />
                          <Typography variant="caption">
                            {movie.vote_average.toFixed(1)}
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                  {isMobile && (
                    <CardContent sx={{ p: 1 }}>
                      <Typography variant="subtitle2" noWrap>
                        {movie.title}
                      </Typography>
                      <Rating
                        value={movie.vote_average / 2}
                        precision={0.5}
                        size="small"
                        readOnly
                      />
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

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

export default SearchResults;
