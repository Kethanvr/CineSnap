import React, { useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";

interface ResponsiveAdProps {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const ResponsiveAd: React.FC<ResponsiveAdProps> = ({
  adSlot,
  className,
  style,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
        justifyContent: "center",
        alignItems: "center",
        margin: isMobile ? "15px 0" : "25px 0",
        padding: isMobile ? "10px" : "15px",
        minHeight: isMobile ? "250px" : "90px",
        maxWidth: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          height: isMobile ? "250px" : "auto",
        }}
        data-ad-client="ca-pub-6985167612880362"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Box>
  );
};

export default ResponsiveAd;
