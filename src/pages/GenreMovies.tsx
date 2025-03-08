import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Chip,
} from "@mui/material";
import { getMoviesByGenre } from "../services/movieApi";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/movie";
import { FilterList, Sort, TrendingUp, Add } from "@mui/icons-material";
import { useState } from "react";

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Highest Rated" },
  { value: "release_date.desc", label: "Latest" },
  { value: "revenue.desc", label: "Highest Revenue" },
];

const MOVIES_PER_PAGE = 20;

const GenreMovies = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [displayCount, setDisplayCount] = useState(MOVIES_PER_PAGE);
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data, isLoading } = useQuery({
    queryKey: ["genre-movies", id, sortBy],
    queryFn: () => getMoviesByGenre(id || "", { sort_by: sortBy }),
    keepPreviousData: true,
  });

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + MOVIES_PER_PAGE);
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

  const movies = data?.results || [];
  const displayedMovies = movies.slice(0, displayCount);
  const hasMore = displayCount < movies.length;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <FilterList sx={{ color: "primary.main" }} />
            <Typography variant="h4" component="h1">
              {data?.genre_name} Movies
            </Typography>
            <Chip
              label={`${data?.total_results || 0} movies`}
              color="primary"
              size="small"
            />
          </Stack>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => {
                setSortBy(e.target.value);
                setDisplayCount(MOVIES_PER_PAGE);
              }}
              startAdornment={<Sort sx={{ mr: 1, color: "primary.main" }} />}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* Movies Grid */}
        <Grid container spacing={3}>
          {displayedMovies.map((movie: Movie) => (
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
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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

        {/* Load More */}
        {hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleLoadMore}
              size="large"
            >
              Load More Movies
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GenreMovies;
