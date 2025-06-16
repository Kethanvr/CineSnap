import React, { useEffect } from "react";
import { Box, Typography, Divider } from "@mui/material";

interface InArticleAdProps {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
  showLabel?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const InArticleAd: React.FC<InArticleAdProps> = ({
  adSlot,
  className,
  style,
  showLabel = true,
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <Box
      className={className}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "30px 0",
        padding: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        borderRadius: "8px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        ...style,
      }}
    >
      {showLabel && (
        <>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Advertisement
          </Typography>
          <Divider sx={{ width: "100%", marginBottom: "15px", opacity: 0.3 }} />
        </>
      )}

      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          textAlign: "center",
        }}
        data-ad-client="ca-pub-6985167612880362"
        data-ad-slot={adSlot}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-full-width-responsive="true"
      />
    </Box>
  );
};

export default InArticleAd;
