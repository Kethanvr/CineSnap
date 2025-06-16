import { useEffect, useState } from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const useAdSense = () => {
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);
  const [adSenseError, setAdSenseError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAdSense = () => {
      try {
        if (typeof window !== "undefined") {
          // Initialize adsbygoogle array if not exists
          window.adsbygoogle = window.adsbygoogle || [];

          // Check if AdSense script is loaded
          const adSenseScript = document.querySelector(
            'script[src*="adsbygoogle"]'
          );
          if (adSenseScript) {
            setIsAdSenseLoaded(true);
          } else {
            setAdSenseError("AdSense script not found");
          }
        }
      } catch (error) {
        console.error("AdSense initialization error:", error);
        setAdSenseError(
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    };

    initializeAdSense();
  }, []);

  const pushAd = (adConfig?: any) => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push(adConfig || {});
      }
    } catch (error) {
      console.error("Error pushing ad:", error);
      setAdSenseError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  const enableAutoAds = () => {
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({
          google_ad_client: "ca-pub-6985167612880362",
          enable_page_level_ads: true,
        });
      }
    } catch (error) {
      console.error("Error enabling auto ads:", error);
      setAdSenseError(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return {
    isAdSenseLoaded,
    adSenseError,
    pushAd,
    enableAutoAds,
  };
};
