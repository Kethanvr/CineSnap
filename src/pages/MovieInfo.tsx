import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Chip,
  Grid,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import {
  CalendarMonth,
  Language,
  AccessTime,
  AttachMoney,
  LocalMovies,
} from "@mui/icons-material";

const MovieInfo = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id || ""),
    enabled: !!id,
  });

  const formatCurrency = (value: number) => {
    if (!value || value === 0) return "Not Available";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={`skeleton-${index}`}
              variant="rectangular"
              height={100}
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
            Movie information not found
          </Typography>
        </Container>
      </Box>
    );
  }

  const infoItems = [
    {
      icon: <CalendarMonth sx={{ color: "primary.main" }} />,
      label: "Release Date",
      value: new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: <AccessTime sx={{ color: "primary.main" }} />,
      label: "Runtime",
      value: `${movie.runtime} minutes`,
    },
    {
      icon: <Language sx={{ color: "primary.main" }} />,
      label: "Original Language",
      value: movie.original_language?.toUpperCase(),
    },
    {
      icon: <AttachMoney sx={{ color: "primary.main" }} />,
      label: "Budget",
      value: formatCurrency(movie.budget),
    },
    {
      icon: <AttachMoney sx={{ color: "primary.main" }} />,
      label: "Revenue",
      value: formatCurrency(movie.revenue),
    },
    {
      icon: <LocalMovies sx={{ color: "primary.main" }} />,
      label: "Status",
      value: movie.status,
    },
  ];

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
          Movie Information
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  {infoItems.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      {item.icon}
                      <Box>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          gutterBottom
                        >
                          {item.label}
                        </Typography>
                        <Typography variant="body1">{item.value}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Genres
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {movie.genres?.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        mb: 1,
                      }}
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieInfo;
