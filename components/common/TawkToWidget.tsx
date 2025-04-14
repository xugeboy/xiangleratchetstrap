'use client';

import { useEffect } from 'react';

const TawkToWidget = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    }
  }, []);

  return null;
};

export default TawkToWidget;