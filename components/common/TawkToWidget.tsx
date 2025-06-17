'use client';

import { useState, useEffect } from 'react';

// Tawk.to 的注入逻辑，我们把它提取出来作为一个函数
const injectTawkToScript = () => {
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  (function() {
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/67fc80e0e6ecad190d7cb46b/1iop5ern2'; // 请确保这是您正确的 Property ID
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  })();
};

const TawkToWidget = () => {
  // 使用一个 state 来追踪同意状态
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // 定义一个函数来处理同意状态的变化
    const handleConsent = () => {
      // 检查 Usercentrics 的 API，看指定的服务是否已被同意
      // 确保 'Tawk.to' 与您在 Usercentrics 后台设置的服务名称完全一致
      if (window.UC_UI?.isServiceConsentGiven('Tawk.to')) {
        setHasConsent(true);
      }
    };

    // 第一次加载时立即检查，这针对的是已经给过同意的返回用户
    handleConsent();

    // 监听 Usercentrics 的同意事件
    // 当用户在弹窗中做出选择时，这个事件会被触发
    window.addEventListener('uc:service-consent-given', handleConsent);

    // 组件卸载时，清理事件监听器，防止内存泄漏
    return () => {
      window.removeEventListener('uc:service-consent-given', handleConsent);
    };
  }, []); // 这个 effect 只在组件加载时运行一次

  useEffect(() => {
    // 这个 effect 依赖于 hasConsent 状态
    // 只有当 hasConsent 变为 true 时，才注入 Tawk.to 脚本
    if (hasConsent) {
      injectTawkToScript();
    }
  }, [hasConsent]); // 当 hasConsent 变化时触发

  return null; // 组件本身不渲染任何可见内容
};

export default TawkToWidget;