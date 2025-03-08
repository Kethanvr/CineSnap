import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardMedia,
  CardActions,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Download as DownloadIcon,
  OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import { getMovieImages } from "../../services/movieApi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`images-tabpanel-${index}`}
      aria-labelledby={`images-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
};

const MovieImages = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const { data: images, isLoading } = useQuery({
    queryKey: ["movieImages", id],
    queryFn: () => getMovieImages(id!),
  });

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDownload = (url: string, type: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `movie-${type}-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom>
        Movie Images
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="image categories"
        >
          <Tab label="Wallpapers" />
          <Tab label="Posters" />
          <Tab label="Logos" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {images?.backdrops?.map((image, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  alt={`Wallpaper ${index + 1}`}
                  sx={{ aspectRatio: "16/9" }}
                />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Tooltip title="Open in new tab">
                    <IconButton
                      onClick={() =>
                        window.open(
                          `https://image.tmdb.org/t/p/original${image.file_path}`,
                          "_blank"
                        )
                      }
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={() =>
                      handleDownload(
                        `https://image.tmdb.org/t/p/original${image.file_path}`,
                        "wallpaper"
                      )
                    }
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          {images?.posters?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Poster ${index + 1}`}
                  sx={{ aspectRatio: "2/3" }}
                />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Tooltip title="Open in new tab">
                    <IconButton
                      onClick={() =>
                        window.open(
                          `https://image.tmdb.org/t/p/original${image.file_path}`,
                          "_blank"
                        )
                      }
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={() =>
                      handleDownload(
                        `https://image.tmdb.org/t/p/original${image.file_path}`,
                        "poster"
                      )
                    }
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          {images?.logos?.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ bgcolor: "black" }}>
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  alt={`Logo ${index + 1}`}
                  sx={{ aspectRatio: "16/9", objectFit: "contain", p: 2 }}
                />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Tooltip title="Open in new tab">
                    <IconButton
                      onClick={() =>
                        window.open(
                          `https://image.tmdb.org/t/p/original${image.file_path}`,
                          "_blank"
                        )
                      }
                    >
                      <OpenInNewIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    startIcon={<DownloadIcon />}
                    onClick={() =>
                      handleDownload(
                        `https://image.tmdb.org/t/p/original${image.file_path}`,
                        "logo"
                      )
                    }
                  >
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default MovieImages;
