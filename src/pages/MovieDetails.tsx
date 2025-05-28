import { useQuery } from "@tanstack/react-query";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Button,
  Chip,
  Divider,
  Avatar,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  getMovieDetails,
  formatCurrency,
  formatRuntime,
  getMovieWatchProviders,
  determineMovieSuccess,
} from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import {
  ArrowForward,
  Theaters,
} from "@mui/icons-material";
import { formatDate } from "../utils/dateUtils";
import { LoadingSpinner, ErrorState, BreadcrumbNav, SEO } from "../components/common/index.ts";

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: movie, isLoading: isLoadingMovie, error: movieError } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id || ""),
    enabled: !!id,
  });

  const { data: watchProviders, isLoading: isLoadingProviders } = useQuery({
    queryKey: ["watchProviders", id],
    queryFn: () => getMovieWatchProviders(id || ""),
    enabled: !!id,
  });

  const isLoading = isLoadingMovie || isLoadingProviders;

  if (isLoading) {
    return <LoadingSpinner size={48} />;
  }

  if (movieError || !movie) {
    return (
      <ErrorState 
        title="Movie Not Found"
        message="The movie you're looking for could not be found." 
        onRetry={() => window.location.reload()}
        fullScreen
      />
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

  const movieStatus = movie ? determineMovieSuccess(movie) : null;
  const usProviders = watchProviders?.US;  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <SEO 
        title={`${movie.title} (${new Date(movie.release_date).getFullYear()}) | CineSnap`}
        description={movie.overview || `Watch ${movie.title} and discover more movies on CineSnap - your AI-powered movie discovery companion.`}
        image={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : "https://cinesnap.kethanvr.me/og-image.jpg"}
        url={`https://cinesnap.kethanvr.me/movie/${movie.id}`}
        keywords={`${movie.title}, ${movie.genres?.map(g => g.name).join(', ')}, Movie, Film, CineSnap`}
      />
      {/* Breadcrumb Navigation */}
      <Container maxWidth="xl" sx={{ pt: { xs: 2, sm: 3 } }}>
        <BreadcrumbNav 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Movies', path: '/movies' },
            { label: movie.title }
          ]}
        />
      </Container>

      {/* Backdrop */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "250px", sm: "350px", md: "600px" },
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>      {/* Content */}
      <Container
        maxWidth="xl"
        sx={{
          mt: { xs: -15, sm: -20, md: -40 },
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Poster */}
          <Grid item xs={12} sm={4} md={3}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: (theme) => theme.shadows[20],
                mx: { xs: 'auto', sm: 0 },
                maxWidth: { xs: 250, sm: '100%' },
              }}
            >
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "2/3",
                }}
              />
            </Card>
          </Grid>

          {/* Movie Info */}
          <Grid item xs={12} sm={8} md={9}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                color: "white",
                textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
                mb: { xs: 1, sm: 2 },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              {movie.title}
            </Typography>            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems={{ xs: "center", sm: "flex-start" }}
              sx={{ mb: 3 }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Rating value={movie.vote_average / 2} precision={0.5} readOnly size="small" />
                <Typography color="text.secondary" variant="body2">
                  {movie.vote_average.toFixed(1)}/10
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                {movie.vote_count.toLocaleString()} votes
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{ 
                mb: 3, 
                flexWrap: "wrap", 
                gap: 1,
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}
            >
              {movie.genres.slice(0, isMobile ? 3 : movie.genres.length).map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                  }}
                />
              ))}
            </Stack>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 3,
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                maxWidth: "800px",
                lineHeight: 1.7,
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              {movie.overview}
            </Typography>

            <Divider sx={{ my: { xs: 3, md: 4 }, borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Feature Cards */}
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {/* Additional Info Card */}
              {/* Movie Info Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: { xs: 2, sm: 3 },
                        flexDirection: { xs: "column", sm: "row" },
                        gap: { xs: 1, sm: 0 }
                      }}
                    >
                      <Typography variant="h6" sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                        Movie Info
                      </Typography>
                      <Button
                        component={RouterLink}
                        to="info"
                        endIcon={<ArrowForward />}
                        size={isMobile ? "small" : "medium"}
                        sx={{ color: "primary.main" }}
                      >
                        View Details
                      </Button>
                    </Box>
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Release Date
                        </Typography>
                        <Typography>
                          {formatDate(movie.release_date)}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Runtime
                        </Typography>
                        <Typography>{formatRuntime(movie.runtime)}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Budget
                        </Typography>
                        <Typography>{formatCurrency(movie.budget)}</Typography>
                      </Box>
                      {movieStatus && (
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary">
                            Box Office Performance
                          </Typography>
                          <Chip
                            icon={<Theaters />}
                            label={movieStatus}
                            color={
                              movieStatus === "Blockbuster"
                                ? "success"
                                : movieStatus === "Hit"
                                ? "primary"
                                : "error"
                            }
                            sx={{ mt: 1 }}
                          />
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* Watch Providers Card */}
              {usProviders && (
                <Grid item xs={12} md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Where to Watch
                      </Typography>
                      {usProviders.flatrate && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Stream
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {usProviders.flatrate.map((provider: Provider) => (
                              <Tooltip key={provider.provider_id} title={provider.provider_name}>
                                <Avatar
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Tooltip>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      {usProviders.rent && (
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Rent
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {usProviders.rent.map((provider: Provider) => (
                              <Tooltip key={provider.provider_id} title={provider.provider_name}>
                                <Avatar
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Tooltip>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      {usProviders.buy && (
                        <Box>
                          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Buy
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {usProviders.buy.map((provider: Provider) => (
                              <Tooltip key={provider.provider_id} title={provider.provider_name}>
                                <Avatar
                                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                                  alt={provider.provider_name}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </Tooltip>
                            ))}
                          </Stack>
                        </Box>
                      )}
                      {usProviders.link && (
                        <Button
                          href={usProviders.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          fullWidth
                          sx={{ mt: 3 }}
                        >
                          View All Watch Options
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* Production Companies Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Production Companies</Typography>
                      <Button
                        component={RouterLink}
                        to="companies"
                        endIcon={<ArrowForward />}
                        sx={{ color: "primary.main" }}
                      >
                        View All
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      {movie.production_companies.slice(0, 2).map((company) => (
                        <Grid item xs={12} key={company.id}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                            }}
                          >
                            {company.logo_path ? (
                              <Avatar
                                src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                variant="rounded"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  bgcolor: "background.paper",
                                }}
                              />
                            ) : (
                              <Avatar
                                variant="rounded"
                                sx={{
                                  width: 60,
                                  height: 60,
                                  bgcolor: "primary.main",
                                }}
                              >
                                {company.name[0]}
                              </Avatar>
                            )}
                            <Box>
                              <Typography variant="subtitle2">
                                {company.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {company.origin_country}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Cast Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Top Cast</Typography>
                      <Button
                        component={RouterLink}
                        to="cast"
                        endIcon={<ArrowForward />}
                        sx={{ color: "primary.main" }}
                      >
                        View All
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      {movie.credits?.cast?.slice(0, 4).map((person) => (
                        <Grid item xs={12} sm={6} key={person.id}>
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

              {/* Media Card */}
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Media Gallery</Typography>
                      <Button
                        component={RouterLink}
                        to="images"
                        endIcon={<ArrowForward />}
                        sx={{ color: "primary.main" }}
                      >
                        View All
                      </Button>
                    </Box>
                    <Grid container spacing={2}>
                      {movie.images?.backdrops
                        ?.slice(0, 4)
                        .map((image, index) => (
                          <Grid item xs={6} key={image.file_path}>
                            <Box
                              sx={{
                                position: "relative",
                                paddingTop: "56.25%",
                                borderRadius: 1,
                                overflow: "hidden",
                              }}
                            >
                              <CardMedia
                                component="img"
                                image={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                alt={`Movie backdrop ${index + 1}`}
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Grid>
                        ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              {/* Reviews Card */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Reviews</Typography>
                      <Button
                        component={RouterLink}
                        to="reviews"
                        endIcon={<ArrowForward />}
                        sx={{ color: "primary.main" }}
                      >
                        View All
                      </Button>
                    </Box>
                    <Grid container spacing={3}>
                      {movie.reviews?.results?.slice(0, 2).map((review) => (
                        <Grid item xs={12} md={6} key={review.id}>
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Avatar
                              src={
                                review.author_details.avatar_path
                                  ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                                  : undefined
                              }
                            >
                              {review.author[0]}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle2" gutterBottom>
                                {review.author}
                              </Typography>
                              {review.author_details.rating && (
                                <Rating
                                  value={review.author_details.rating / 2}
                                  precision={0.5}
                                  size="small"
                                  readOnly
                                  sx={{ mb: 1 }}
                                />
                              )}
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {review.content}
                              </Typography>
                            </Box>
                          </Box>
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
