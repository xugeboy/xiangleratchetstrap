'use client'
import { useEffect } from 'react';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
}

export default function LiteYouTube({ videoId, title }: LiteYouTubeProps) {
  useEffect(() => {
    if (!customElements.get('lite-youtube')) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.0/src/lite-yt-embed.js';
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold py-4">{title}</h2>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/lite-youtube-embed@0.1.0/src/lite-yt-embed.css"
      />
      <lite-youtube videoid={videoId}></lite-youtube>
    </div>
  );
}
