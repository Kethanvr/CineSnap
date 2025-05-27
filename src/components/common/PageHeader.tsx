import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({
  title,
  subtitle,
  showBackButton = false,
  backPath,
  icon,
  actions,
  children,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        mb: { xs: 3, sm: 4 },
        pb: { xs: 2, sm: 3 },
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: { xs: 1, sm: 2 },
          mb: subtitle ? 1 : 0,
        }}
      >
        {showBackButton && (
          <IconButton
            onClick={handleBack}
            size={isMobile ? 'medium' : 'large'}
            sx={{
              mt: 0.5,
              bgcolor: 'background.paper',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              mb: subtitle ? 1 : 0,
            }}
          >
            {icon}
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              component="h1"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: isMobile ? 'nowrap' : 'normal',
              }}
            >
              {title}
            </Typography>
            {!isMobile && actions && (
              <Box sx={{ ml: 'auto', flexShrink: 0 }}>
                {actions}
              </Box>
            )}
          </Box>
          
          {subtitle && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: isMobile ? 'nowrap' : 'normal',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      {isMobile && actions && (
        <Box sx={{ mt: 2 }}>
          {actions}
        </Box>
      )}

      {children && (
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;
