import Script from "next/script";
const GA_ID = "G-795QK7FWKL";

export default function Analytics() {
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
