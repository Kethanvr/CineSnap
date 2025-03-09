import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Skeleton,
  Stack,
  Chip,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi";
import type { Movie } from "../types/movie";
import { Group } from "@mui/icons-material";

const MovieCast = () => {
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
          {[...Array(12)].map((_, index) => (
            <Skeleton
              key={`skeleton-${index}-${Date.now()}`}
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
            Cast information not found
          </Typography>
        </Container>
      </Box>
    );
  }

  const cast = movie.credits?.cast || [];
  const crew = movie.credits?.crew || [];

  // Group crew members by department
  const crewByDepartment = crew.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {} as Record<string, typeof crew>);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Movie Title */}
        <Typography variant="h4" gutterBottom>
          {movie.title} - Cast & Crew
        </Typography>

        {/* Cast Section */}
        <Box sx={{ mb: 6 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Group sx={{ color: "primary.main" }} />
            <Typography variant="h5">Cast ({cast.length})</Typography>
          </Stack>
          <Grid container spacing={3}>
            {cast.map((person) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${person.id}-${person.character}`}
              >
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        src={
                          person.profile_path
                            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                            : undefined
                        }
                        sx={{ width: 80, height: 80 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" gutterBottom>
                          {person.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontStyle: "italic",
                          }}
                        >
                          as {person.character}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Crew Section */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Crew
          </Typography>
          {Object.entries(crewByDepartment).map(([department, members]) => (
            <Box key={department} sx={{ mb: 4 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {department}
              </Typography>
              <Grid container spacing={3}>
                {members.map((person) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={`${person.id}-${person.job}`}
                  >
                    <Card>
                      <CardContent>
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
                            <Chip
                              label={person.job}
                              size="small"
                              sx={{
                                mt: 0.5,
                                bgcolor: "primary.main",
                                color: "white",
                              }}
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default MovieCast;
