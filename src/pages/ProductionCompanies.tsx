import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Stack,
  Grid,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import { Business } from "@mui/icons-material";

const ProductionCompanies = () => {
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
          {[...Array(3)].map((_, i) => (
            <Skeleton
              key={`skeleton-company-${i}`}
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
            Production companies not found
          </Typography>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Business sx={{ color: "primary.main" }} />
          <Typography variant="h4">Production Companies</Typography>
        </Stack>

        <Grid container spacing={3}>
          {movie.production_companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      {company.logo_path ? (
                        <Avatar
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                          alt={company.name}
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "background.paper",
                          }}
                        />
                      ) : (
                        <Avatar
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            bgcolor: "primary.main",
                            fontSize: "2rem",
                          }}
                        >
                          {company.name[0]}
                        </Avatar>
                      )}
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {company.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Business fontSize="small" />
                          {company.origin_country || "Unknown Origin"}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {movie.production_companies.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No production companies available
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductionCompanies;
