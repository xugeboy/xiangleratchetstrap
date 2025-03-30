"use client";
import Plyr from "plyr";
import { useEffect, useRef, useState } from "react";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  url: string;
  title: string;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let player: Plyr | null = null;

    if (videoRef.current) {
      player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "fullscreen",
        ],
        settings: ["speed", "quality"],
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
        youtube: {
          noCookie: false,
          customControls: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          modestbranding: 1,
        },
        tooltips: { controls: true, seek: true },
        keyboard: { focused: true, global: true },
      });

      // 监听播放状态变化
      player.on("play", () => setIsPlaying(true));
      player.on("pause", () => setIsPlaying(false));
      player.on("ended", () => setIsPlaying(false));
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, []);

  // Convert YouTube URL to embed URL if needed
  const getEmbedUrl = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const videoId = url.match(
    /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([^&\s]+)/
  )?.[1];
  const posterUrl = videoId
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : "";

  const defaultStyle = {
    "--plyr-color-main": "#00e41b",
    "--video-height": "auto",
    "--video-mobile-height": "600px",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties;

  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold py-4">{title}</h2>

      <div
        className="plyr plyr--full-ui plyr--video plyr--youtube plyr--fullscreen-enabled plyr__poster-enabled"
        style={defaultStyle}
      >
        <div className="rounded-lg overflow-hidden bg-gray-100 w-full">
          <div
            ref={videoRef}
            className="plyr__video-wrapper plyr__video-embed"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              src={`${getEmbedUrl(
                url
              )}?autoplay=0&controls=0&disablekb=1&playsinline=1&cc_load_policy=0&cc_lang_pref=auto&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&customControls=true&noCookie=false&enablejsapi=1`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              title={title}
              frameBorder="0"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full"
            />
            <div
              className="plyr__poster"
              style={{
                backgroundImage: `url("${posterUrl}")`,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: isPlaying ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
