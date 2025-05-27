import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An error occurred while loading content. Please try again.',
  onRetry,
  fullScreen = false,
}: ErrorStateProps) => {
  return (
    <Box
      sx={{
        minHeight: fullScreen ? '100vh' : '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 3,
        p: 4,
        bgcolor: fullScreen ? 'background.default' : 'transparent',
      }}
    >
      <ErrorOutline 
        sx={{ 
          fontSize: { xs: 48, sm: 64 }, 
          color: 'error.main',
          opacity: 0.7 
        }} 
      />
      <Box>
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ maxWidth: 400, mx: 'auto' }}
        >
          {message}
        </Typography>
      </Box>
      {onRetry && (
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorState;
