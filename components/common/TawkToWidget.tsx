'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * 动态注入Tawk.to的脚本。
 * 这个函数只会在获得用户同意后被调用。
 */
const injectTawkToScript = () => {
  // 检查脚本是否已存在，防止重复注入
  if (document.getElementById('tawk-to-script')) {
    return;
  }

  // 这是您提供的标准Tawk.to注入代码
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  (function() {
    var s1 = document.createElement("script");
    s1.id = 'tawk-to-script'; // 给脚本一个ID，用于上面的检查
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    var s0 = document.getElementsByTagName("script")[0];
    s0.parentNode.insertBefore(s1, s0);
  })();
};

/**
 * 一个与Usercentrics集成的智能Tawk.to组件。
 */
const TawkToWidget = () => {
  // 状态：用于追踪用户是否已同意Tawk.to服务
  const [consentGiven, setConsentGiven] = useState(false);

  // 创建一个稳定的回调函数来处理同意状态的检查
  const handleConsentChange = useCallback(() => {
    // 确保Usercentrics API已准备就绪
    if (window.UC_UI && typeof window.UC_UI.isServiceConsentGiven === 'function') {
      // 检查'Tawk.to'服务的同意状态
      // 这里的'Tawk.to'必须与您在Usercentrics后台设置的Service ID完全一致
      const hasConsent = window.UC_UI.isServiceConsentGiven('Tawk.to');
      if (hasConsent) {
        setConsentGiven(true);
      }
    }
  }, []);

  // Effect 1: 负责监听和初始化同意状态
  useEffect(() => {
    // 定义初始化函数
    const initialize = () => {
      handleConsentChange(); // 立即检查一次，以处理已同意的返回用户
      window.addEventListener('uc:service-consent-given', handleConsentChange);
    };

    // 检查CMP是否已准备好，以处理时序问题
    if (window.UC_UI && typeof window.UC_UI.isServiceConsentGiven === 'function') {
      initialize();
    } else {
      // 如果CMP还没准备好，则等待'uc:cmp-ready'事件
      window.addEventListener('uc:cmp-ready', initialize, { once: true });
    }

    // 组件卸载时，清理事件监听器
    return () => {
      window.removeEventListener('uc:service-consent-given', handleConsentChange);
      window.removeEventListener('uc:cmp-ready', initialize);
    };
  }, [handleConsentChange]);

  // Effect 2: 负责在获得同意后执行脚本注入
  useEffect(() => {
    if (consentGiven) {
      injectTawkToScript();
    }
  }, [consentGiven]); // 仅当consentGiven状态变化时触发

  // 这个组件不渲染任何可见的UI
  return null;
};

export default TawkToWidget;