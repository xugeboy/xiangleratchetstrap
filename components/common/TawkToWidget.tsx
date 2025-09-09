// components/TawkToWidget.js
import Script from 'next/script';

const TawkToWidget = () => {
  // 只在生产环境中加载
  if (process.env.NODE_ENV !== 'production') return null;

  return (
    <Script
      id="tawk-to-loader"
      type="text/plain" // 关键：默认不执行，交由CMP控制
      data-cookieyes="functional"
      strategy="lazyOnload" // 使用低优先级加载
    >
      {`
        /* Start of Tawk.to Script */
        var Tawk_API = Tawk_API || {};
        var Tawk_LoadStart = new Date();
        (function() {
          var s1 = document.createElement("script");
          s1.async = true;
          s1.src = 'https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          var s0 = document.getElementsByTagName("script")[0];
          s0.parentNode.insertBefore(s1, s0);
        })();
        /* End of Tawk.to Script */
      `}
    </Script>
  );
};

export default TawkToWidget;