"use client";

import { useEffect } from "react";
import Script from "next/script";
import clarity from "@microsoft/clarity";

const GA_ID = "G-795QK7FWKL";
const CLARITY_ID = "r2wr3mx71m";

export default function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      clarity.init(CLARITY_ID);
    }
  }, []);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Google Analytics script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
