"use client";

import React from "react";

interface LoopingVideoCardProps {
  /** 来自 Cloudinary 的视频文件 URL */
  videoSrc: string;
  /** 来自 Cloudinary 的视频封面图 URL */
  posterSrc: string;
  /** 用于可访问性的 alt 文本，描述视频内容 */
  alt?: string;
  /** 允许传入额外的 Tailwind CSS 类以进行自定义样式 */
  className?: string;
}

const LoopingVideoCard = ({
  videoSrc,
  posterSrc,
  alt = "loop Video",
  className = "",
}: LoopingVideoCardProps) => {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-xl ${className}`}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        src={videoSrc}
        poster={posterSrc}
        className="object-fill"
        aria-label={alt}
      ></video>
    </div>
  );
};

export default LoopingVideoCard;
