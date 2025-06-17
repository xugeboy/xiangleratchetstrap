'use client';

import { useEffect, useState } from 'react';

const TawkToWidget = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // 示例：替换为 Usercentrics 实际的 consent 检查逻辑
    const checkConsent = () => {
      const uc = (window as any).Usercentrics;
      if (uc && uc.getConsents) {
        const consents = uc.getConsents();
        const tawkConsent = consents?.find(
          (c: any) => c.templateId === 'tawk.to' || c.dataProcessor === 'tawk.to'
        );
        return tawkConsent?.consentStatus === 'CONSENTED';
      }
      return false;
    };

    const handleConsent = () => {
      if (checkConsent()) {
        setConsentGiven(true);
      }
    };

    // 假设 Usercentrics 触发事件 'UC_UI_INITIALIZED' 或自定义事件
    window.addEventListener('UC_UI_INITIALIZED', handleConsent);
    window.addEventListener('UC_UI_UPDATED', handleConsent);

    // 初始检查一次
    handleConsent();

    return () => {
      window.removeEventListener('UC_UI_INITIALIZED', handleConsent);
      window.removeEventListener('UC_UI_UPDATED', handleConsent);
    };
  }, []);

  useEffect(() => {
    if (!consentGiven) return;

    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    script.setAttribute('data-usercentrics', 'tawk.to');
    script.type = 'text/javascript';

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [consentGiven]);

  return null;
};

export default TawkToWidget;
