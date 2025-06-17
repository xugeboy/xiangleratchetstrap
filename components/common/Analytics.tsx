// components/Analytics.js (建议重命名以避免混淆)
import Script from "next/script";

const GA_ID = "G-795QK7FWKL";

export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* Google Analytics script for Usercentrics CMP */}
      <Script
        id="google-analytics-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload" // 1. 修改策略为 lazyOnload
        type="text/plain" // 2. 将类型改为 text/plain
        data-usercentrics="Google Tag Manager" // 3. 添加这个关键属性
      />
      <Script
        id="google-analytics-inline"
        strategy="lazyOnload"
        type="text/plain" // 同样需要修改
        data-usercentrics="Google Tag Manager" // 同样需要添加
      >
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