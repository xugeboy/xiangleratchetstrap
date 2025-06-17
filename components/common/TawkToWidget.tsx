'use client';

import { useState, useEffect, useCallback } from 'react';

// Tawk.to 的注入逻辑保持不变
const injectTawkToScript = () => {
  // 确保脚本只被注入一次
  if (document.getElementById('tawk-to-script')) return;

  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  (function() {
    var s1 = document.createElement("script");
    s1.id = 'tawk-to-script'; // 给脚本一个ID以便检查
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    var s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);
  })();
};

const TawkToWidget = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  // 使用 useCallback 来确保函数实例的稳定
  const handleConsentChange = useCallback(() => {
    // 再次进行健壮性检查
    if (window.UC_UI && typeof window.UC_UI.isServiceConsentGiven === 'function') {
      // 确保 'Tawk.to' 与您在 Usercentrics 后台设置的 Service ID 完全一致
      if (window.UC_UI.isServiceConsentGiven('tawk.to')) {
        setConsentGiven(true);
      }
    }
  }, []);

  useEffect(() => {
    // 定义我们的初始化函数
    const initialize = () => {
      handleConsentChange(); // 立即检查一次
      window.addEventListener('uc:service-consent-given', handleConsentChange);
    };

    // 检查 CMP 是否已经准备就绪
    if (window.UC_UI && typeof window.UC_UI.isServiceConsentGiven === 'function') {
      initialize();
    } else {
      // 如果没有，就等待 'uc:cmp-ready' 事件
      window.addEventListener('uc:cmp-ready', initialize, { once: true });
    }

    // 组件卸载时，清理所有事件监听器
    return () => {
      window.removeEventListener('uc:service-consent-given', handleConsentChange);
      window.removeEventListener('uc:cmp-ready', initialize);
    };
  }, [handleConsentChange]); // 依赖于稳定版的 handleConsentChange 函数

  useEffect(() => {
    if (consentGiven) {
      injectTawkToScript();
    }
  }, [consentGiven]);

  return null;
};

export default TawkToWidget;