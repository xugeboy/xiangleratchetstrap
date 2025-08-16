'use client';

import { useEffect, useRef } from 'react';

// --- Props 定义 ---
interface LiteYouTubeProps {
  videoId: string;
  title: string;
}

// --- 辅助函数，用于加载资源 ---
// 我们将加载的 Promise 附加到 window 对象上，以确保它在整个应用中只执行一次。
const loadLiteYouTubeEmbed = () => {
  // @ts-ignore
  if (window.liteYouTubeEmbedLoaded) {
    return Promise.resolve();
  }

  // @ts-ignore
  window.liteYouTubeEmbedLoaded = new Promise((resolve, reject) => {
    // 加载 CSS
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.2/src/lite-yt-embed.css';
    document.head.appendChild(cssLink);

    // 加载 JS
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.3.2/src/lite-yt-embed.js';
    script.onload = () => {
      console.log('Lite YouTube Embed script loaded.');
      resolve();
    };
    script.onerror = () => {
      console.error('Failed to load Lite YouTube Embed script.');
      reject();
    };
    document.body.appendChild(script);
  });

  // @ts-ignore
  return window.liteYouTubeEmbedLoaded;
};


// --- 组件本体 ---
export default function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    loadLiteYouTubeEmbed()
      .then(() => {
        // 当资源加载成功后，检查组件是否仍然挂载
        if (!isMounted || !containerRef.current) return;

        // 检查自定义元素是否已定义
        if (!customElements.get('lite-youtube')) {
            console.error('lite-youtube custom element not defined after script load.');
            return;
        }

        // 手动创建和附加元素，这是最可靠的方式
        const youtubeElement = document.createElement('lite-youtube');
        youtubeElement.setAttribute('videoid', videoId);
        
        containerRef.current.innerHTML = ''; // 清理旧内容
        containerRef.current.appendChild(youtubeElement);
      })
      .catch(error => {
        console.error(error);
      });

    // 清理函数，在组件卸载时将 isMounted 设为 false
    return () => {
      isMounted = false;
    };
  }, [videoId, title]); // 依赖 videoId 和 title 的变化

  return (
    <div className="my-8">
      {title && (<h2 className="text-2xl font-bold py-4">{title}</h2>)}
      <div ref={containerRef}>
        {/* 初始状态可以显示一个加载提示 */}
        <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Loading Video...</p>
        </div>
      </div>
    </div>
  );
}