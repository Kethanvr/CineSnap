import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  CircularProgress,
} from "@mui/material";
import theme from "./styles/theme.ts";
import React, { useState } from "react";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import CineSnapAI from "./components/CineSnapAI.tsx";
import AIFloatingButton from "./components/AIFloatingButton.tsx";
import { ScrollToTop } from "./components/common/index.ts";
import { AutoAd } from "./components/ads";
import { usePagePerformance } from "./hooks/useSEO";
import StructuredData from "./components/seo/StructuredData";
import type { UserContext } from "./services/cineSnapAi.ts";
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
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiContext, setAiContext] = useState<Partial<UserContext>>({});

  // Initialize performance optimizations
  usePagePerformance();

  // Function to open AI with specific context
  const openAIWithContext = (context?: Partial<UserContext>) => {
    if (context) {
      setAiContext((prev) => ({ ...prev, ...context }));
    }
    setIsAIOpen(true);
  };

  // Determine if we should show floating button based on current route
  const shouldShowFloatingButton = true; // Can be enhanced with route-based logic

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />{" "}
        <Router>
          <ScrollToTop />

          {/* Global SEO Structured Data */}
          <StructuredData type="WebApplication" data={null} />
          <StructuredData type="Organization" data={null} />
          <StructuredData type="WebSite" data={null} />

          {/* Auto Ads Component - Enables automatic ad placement */}
          <AutoAd />
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
              position: "relative",
            }}
          >
            <Navbar onOpenAI={openAIWithContext} />
            <Box
              component="main"
              sx={{
                flex: 1,
                pt: { xs: 7, sm: 8 },
                display: "flex",
                flexDirection: "column",
                minHeight: "calc(100vh - 64px)", // Account for navbar height
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
              >
                {" "}
                <Routes>
                  <Route
                    path="/"
                    element={<Home onOpenAI={openAIWithContext} />}
                  />
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

            {/* AI Floating Button */}
            {shouldShowFloatingButton && (
              <AIFloatingButton
                onClick={() => setIsAIOpen(true)}
                hasNewSuggestions={false}
              />
            )}

            {/* CineSnap AI Chat Interface */}
            <CineSnapAI
              isOpen={isAIOpen}
              onClose={() => setIsAIOpen(false)}
              initialContext={aiContext}
            />

            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
