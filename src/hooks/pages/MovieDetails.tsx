import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  Avatar,
} from "@mui/material";
import { getMovieDetails } from "../../services/movieApi";
import { Movie } from "../../types/movie";

const MovieDetails = () => {
  const { id } = useParams();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
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

  if (!movie) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Movie not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.paper", minHeight: "100vh" }}>
      {/* Backdrop Section */}
      <Box
        sx={{
          height: "70vh",
          position: "relative",
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h2" gutterBottom color="white">
                {movie.title}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.5}
                  readOnly
                />
                <Typography color="white">
                  ({movie.vote_average.toFixed(1)}/10)
                </Typography>
                <Chip
                  label={new Date(movie.release_date).getFullYear()}
                  sx={{ bgcolor: "primary.main" }}
                />
              </Box>
              <Typography variant="body1" color="white" sx={{ mb: 3 }}>
                {movie.overview}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {movie.genres.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{ bgcolor: "primary.main" }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Details Section */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4, bgcolor: "background.paper" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Movie Info
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Release Date
                    </Typography>
                    <Typography>
                      {new Date(movie.release_date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Runtime
                    </Typography>
                    <Typography>{movie.runtime} minutes</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Budget
                    </Typography>
                    <Typography>${movie.budget.toLocaleString()}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Revenue
                    </Typography>
                    <Typography>${movie.revenue.toLocaleString()}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ bgcolor: "background.paper" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Production Companies
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {movie.production_companies.map((company) => (
                    <Box
                      key={company.id}
                      sx={{ display: "flex", alignItems: "center", gap: 2 }}
                    >
                      {company.logo_path ? (
                        <Avatar
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                      ) : (
                        <Avatar
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        >
                          {company.name[0]}
                        </Avatar>
                      )}
                      <Box>
                        <Typography>{company.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {company.origin_country}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {/* Cast Section */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: "background.paper" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Cast
                    </Typography>
                    <Grid container spacing={2}>
                      {movie.credits?.cast?.slice(0, 6).map((person) => (
                        <Grid item xs={12} sm={6} md={4} key={person.id}>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Avatar
                              src={
                                person.profile_path
                                  ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                                  : undefined
                              }
                              sx={{ width: 60, height: 60 }}
                            />
                            <Box>
                              <Typography variant="subtitle2">
                                {person.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {person.character}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Reviews Section */}
              <Grid item xs={12}>
                <Card sx={{ bgcolor: "background.paper" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Reviews
                    </Typography>
                    {movie.reviews?.results?.length ? (
                      movie.reviews.results.slice(0, 3).map((review) => (
                        <Box key={review.id} sx={{ mb: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 1,
                            }}
                          >
                            <Avatar
                              src={
                                review.author_details.avatar_path
                                  ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                                  : undefined
                              }
                            />
                            <Box>
                              <Typography variant="subtitle2">
                                {review.author}
                              </Typography>
                              {review.author_details.rating && (
                                <Rating
                                  value={review.author_details.rating / 2}
                                  precision={0.5}
                                  size="small"
                                  readOnly
                                />
                              )}
                            </Box>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {review.content.slice(0, 200)}...
                          </Typography>
                        </Box>
                      ))
                    ) : (
                      <Typography color="text.secondary">
                        No reviews available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Images Section */}
              <Grid item xs={12}>
                <Card
                  component={Link}
                  to={`/movie/${id}/images`}
                  sx={{
                    bgcolor: "background.paper",
                    textDecoration: "none",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Images
                    </Typography>
                    <Grid container spacing={2}>
                      {movie.images?.backdrops
                        ?.slice(0, 3)
                        .map((image, index) => (
                          <Grid item xs={12} sm={4} key={index}>
                            <CardMedia
                              component="img"
                              image={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                              alt={`Movie backdrop ${index + 1}`}
                              sx={{
                                borderRadius: 1,
                                height: 150,
                                objectFit: "cover",
                              }}
                            />
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;
