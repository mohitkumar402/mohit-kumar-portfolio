// src/components/AdComponent.jsx
import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
   <ins className="adsbygoogle"
     style={{ display: "block" }}
     data-ad-client="ca-pub-9301648195226858"
     data-ad-slot="7058096815"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

  );
};

export default AdComponent;
