import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Skeleton,
  Stack,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { getMovieDetails } from "../services/movieApi";
import type { Movie, Image } from "../types/movie";
import {
  Collections,
  Download,
  Image as ImageIcon,
  Wallpaper,
  BrandingWatermark,
  Add,
} from "@mui/icons-material";
import { useState } from "react";

type ImageType = "backdrops" | "posters" | "logos";

const IMAGES_PER_PAGE = 40;

const MovieImages = () => {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState<ImageType>("backdrops");
  const [displayCount, setDisplayCount] = useState(IMAGES_PER_PAGE);

  const { data: movie, isLoading } = useQuery<Movie>({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id || ""),
    enabled: !!id,
  });

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + IMAGES_PER_PAGE);
  };

  const handleDownload = async (image: Image) => {
    try {
      const response = await fetch(
        `https://image.tmdb.org/t/p/original${image.file_path}`
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `movie-${activeTab}-${Date.now()}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handlePreview = (image: Image) => {
    window.open(
      `https://image.tmdb.org/t/p/original${image.file_path}`,
      "_blank"
    );
  };

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={`skeleton-${index}-${Date.now()}`}
              variant="rectangular"
              height={300}
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
            Images not found
          </Typography>
        </Container>
      </Box>
    );
  }

  const images = movie.images?.[activeTab] || [];
  const imageCounts = {
    backdrops: movie.images?.backdrops?.length || 0,
    posters: movie.images?.posters?.length || 0,
    logos: movie.images?.logos?.length || 0,
  };

  const displayedImages = images.slice(0, displayCount);
  const hasMore = displayCount < images.length;

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <Collections sx={{ color: "primary.main" }} />
          <Typography variant="h4" component="h1">
            {movie.title} - Images
          </Typography>
        </Stack>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, value) => {
            setActiveTab(value);
            setDisplayCount(IMAGES_PER_PAGE);
          }}
          sx={{ mb: 4 }}
        >
          <Tab
            icon={<Wallpaper />}
            label={`Backdrops (${imageCounts.backdrops})`}
            value="backdrops"
          />
          <Tab
            icon={<ImageIcon />}
            label={`Posters (${imageCounts.posters})`}
            value="posters"
          />
          <Tab
            icon={<BrandingWatermark />}
            label={`Logos (${imageCounts.logos})`}
            value="logos"
          />
        </Tabs>

        {/* Images Grid */}
        {displayedImages.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No {activeTab} available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try selecting a different category
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {displayedImages.map((image: Image) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={activeTab === "posters" ? 3 : 4}
                  lg={activeTab === "posters" ? 2 : 3}
                  key={image.file_path}
                >
                  <Card
                    sx={{
                      position: "relative",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "scale(1.02)",
                        "& .image-actions": {
                          opacity: 1,
                        },
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt={`${activeTab} ${images.indexOf(image) + 1}`}
                      sx={{
                        aspectRatio:
                          activeTab === "posters"
                            ? "2/3"
                            : activeTab === "logos"
                            ? "16/9"
                            : "16/9",
                        objectFit: "cover",
                      }}
                      onClick={() => handlePreview(image)}
                    />
                    <Box
                      className="image-actions"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        bgcolor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0,
                        transition: "opacity 0.2s",
                      }}
                    >
                      <Tooltip title="Download">
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(image);
                          }}
                          sx={{ color: "white" }}
                        >
                          <Download />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {hasMore && (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Add />}
                  onClick={handleLoadMore}
                  size="large"
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default MovieImages;
