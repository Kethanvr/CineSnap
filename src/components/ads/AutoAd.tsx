import React, { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AutoAd: React.FC = () => {
  useEffect(() => {
    // Auto ads are automatically placed by Google AdSense
    // This component ensures the script is loaded and auto ads are enabled
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-6985167612880362",
          enable_page_level_ads: true,
        });
      }
    } catch (error) {
      console.error("Auto AdSense error:", error);
    }
  }, []);

  // Auto ads don't require a visible component
  return null;
};

export default AutoAd;
