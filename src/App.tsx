import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import theme from "./styles/theme.ts";
import React from "react";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { ScrollToTop } from "./components/common/index.ts";
// import MovieCard from "./components/MovieCard";
// Lazy load pages
const Home = React.lazy(() => import("./pages/Home.tsx"));
const MovieDetails = React.lazy(() => import("./pages/MovieDetails.tsx"));
const SearchResults = React.lazy(() => import("./pages/SearchResults.tsx"));
const MovieImages = React.lazy(() => import("./pages/MovieImages.tsx"));
const Movies = React.lazy(() => import("./pages/Movies.tsx"));
const MovieCast = React.lazy(() => import("./pages/MovieCast.tsx"));
const MovieReviews = React.lazy(() => import("./pages/MovieReviews.tsx"));
const MovieTrailers = React.lazy(() => import("./pages/MovieTrailers.tsx"));
const GenreMovies = React.lazy(() => import("./pages/GenreMovies.tsx"));
const TopRatedMovies = React.lazy(() => import("./pages/TopRatedMovies.tsx"));
const UpcomingMovies = React.lazy(() => import("./pages/UpcomingMovies.tsx"));
const Categories = React.lazy(() => import("./pages/Categories.tsx"));
const MovieInfo = React.lazy(() => import("./pages/MovieInfo.tsx"));
const ProductionCompanies = React.lazy(
  () => import("./pages/ProductionCompanies.tsx")
);
const About = React.lazy(() => import("./pages/About.tsx"));
const Contact = React.lazy(() => import("./pages/Contact.tsx"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30 * 60 * 1000, // 30 minutes
      gcTime: 30 * 60 * 1000, // Use gcTime instead of cacheTime
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />        <Router>
          <ScrollToTop />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
            }}
          >
            <Navbar />
            <Box
              component="main"
              sx={{
                flex: 1,
                pt: { xs: 7, sm: 8 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <React.Suspense
                fallback={
                  <Box
                    sx={{
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={48} thickness={4} />
                  </Box>
                }
              >                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route
                    path="/movies/top-rated"
                    element={<TopRatedMovies />}
                  />
                  <Route path="/movies/upcoming" element={<UpcomingMovies />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/genre/:id" element={<GenreMovies />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route path="/movie/:id/images" element={<MovieImages />} />
                  <Route path="/movie/:id/cast" element={<MovieCast />} />
                  <Route path="/movie/:id/reviews" element={<MovieReviews />} />
                  <Route
                    path="/movie/:id/trailers"
                    element={<MovieTrailers />}
                  />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/movie/:id/info" element={<MovieInfo />} />
                  <Route
                    path="/movie/:id/companies"
                    element={<ProductionCompanies />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                </Routes>
              </React.Suspense>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
