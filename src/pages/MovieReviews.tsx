import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Rating,
  Stack,
  Skeleton,
  Divider,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi.ts";
import type { Movie, Review } from "../types/movie.ts";
import { Comment } from "@mui/icons-material";
import { formatDate } from "../utils/dateUtils";

const MovieReviews = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={`skeleton-${index}-${Date.now()}`}
              variant="rectangular"
              height={200}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Stack>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Box sx={{ py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" align="center">
            Movie not found
          </Typography>
        </Container>
      </Box>
    );
  }

  const reviews = movie.reviews?.results || [];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Comment sx={{ color: "primary.main" }} />
          <Typography variant="h4" component="h1">
            {movie.title} - Reviews
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {reviews.length} reviews
          </Typography>
        </Stack>

        {/* Reviews */}
        {reviews.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No reviews available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Be the first to review this movie
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {reviews.map((review: Review) => (
              <Card
                key={review.id}
                sx={{
                  bgcolor: "background.paper",
                  transition: "transform 0.2s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-4px)" },
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    {/* Author Info */}
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        flexWrap: "wrap",
                        gap: { xs: 1, sm: 2 },
                      }}
                    >
                      <Avatar
                        src={`https://image.tmdb.org/t/p/w200${review.author_details?.avatar_path}`}
                        alt={review.author}
                        sx={{ width: 48, height: 48 }}
                      >
                        {review.author?.[0]?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" component="div">
                          {review.author}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          {formatDate(review.created_at)}
                        </Typography>
                      </Box>
                      {review.author_details?.rating && (
                        <Rating
                          value={review.author_details.rating / 2}
                          precision={0.5}
                          readOnly
                          sx={{ ml: "auto" }}
                        />
                      )}
                    </Stack>

                    <Divider />

                    {/* Review Content */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.secondary",
                        fontSize: { xs: "0.9rem", sm: "1rem" },
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {review.content}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default MovieReviews;
