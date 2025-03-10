import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi.ts";
import type { Movie } from "../types/movie.ts";
import { PlayArrow, YouTube, Close } from "@mui/icons-material";
import { useState } from "react";

const MovieTrailers = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id || ""),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {[...Array(6)].map((_, index) => (
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
            Videos not found
          </Typography>
        </Container>
      </Box>
    );
  }

  const videos = movie.videos?.results || [];
  const trailers = videos.filter(
    (video) =>
      video.site === "YouTube" &&
      (video.type === "Trailer" || video.type === "Teaser")
  );

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {movie.title} - Trailers & Videos
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <YouTube sx={{ color: "error.main" }} />
            <Typography variant="h6">
              {trailers.length} {trailers.length === 1 ? "Video" : "Videos"}
            </Typography>
          </Stack>
        </Box>

        {/* Videos Grid */}
        <Grid container spacing={3}>
          {trailers.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.key}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02) rotate(1deg)",
                    "& .play-button": {
                      opacity: 1,
                      transform: "translate(-50%, -50%) scale(1.2)",
                    },
                  },
                }}
                onClick={() => setSelectedVideo(video.key)}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    component="img"
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                    alt={video.name}
                    sx={{
                      width: "100%",
                      aspectRatio: "16/9",
                      objectFit: "cover",
                      borderRadius: "16px 16px 0 0",
                    }}
                  />
                  <IconButton
                    className="play-button"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(1)",
                      bgcolor: "error.main",
                      opacity: 0.9,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "error.dark",
                      },
                    }}
                  >
                    <PlayArrow sx={{ fontSize: "2rem", color: "white" }} />
                  </IconButton>
                </Box>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {video.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {video.type}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Video Dialog */}
        <Dialog
          fullWidth
          maxWidth="lg"
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          sx={{
            "& .MuiDialog-paper": {
              bgcolor: "transparent",
              boxShadow: "none",
              overflow: "hidden",
            },
          }}
        >
          <Box sx={{ position: "relative" }}>
            <IconButton
              onClick={() => setSelectedVideo(null)}
              sx={{
                position: "absolute",
                right: -16,
                top: -16,
                bgcolor: "background.paper",
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              <Close />
            </IconButton>
            <DialogContent sx={{ p: 0 }}>
              {selectedVideo && (
                <Box
                  sx={{
                    position: "relative",
                    paddingTop: "56.25%", // 16:9 aspect ratio
                    overflow: "hidden",
                    borderRadius: 2,
                  }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      border: 0,
                    }}
                  />
                </Box>
              )}
            </DialogContent>
          </Box>
        </Dialog>

        {trailers.length === 0 && (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No trailers available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for video content
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MovieTrailers;
