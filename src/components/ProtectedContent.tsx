import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { Box, Typography, Paper, Button } from "@mui/material";

const ProtectedContent = () => {
  const { user } = useUser();

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <SignedOut>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom>
            Join CineSnap Today!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Sign up to save your favorite movies, create watchlists, and get personalized recommendations.
          </Typography>
        </Paper>
      </SignedOut>

      <SignedIn>
        <Paper 
          sx={{ 
            p: 4,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom>
            Welcome back, {user?.firstName || user?.username}! 🍿
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your personalized movie experience awaits. Here you can access your saved movies, 
            watchlists, and personalized recommendations.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="small">
              My Watchlist
            </Button>
            <Button variant="outlined" size="small">
              Recommendations
            </Button>
            <Button variant="outlined" size="small">
              Saved Movies
            </Button>
          </Box>
        </Paper>
      </SignedIn>
    </Box>
  );
};

export default ProtectedContent; 