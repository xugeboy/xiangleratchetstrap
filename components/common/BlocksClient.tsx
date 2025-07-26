"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";
import Image from "next/image";
import { getCloudinaryPublicId } from "@/utils/formatUtils";

export default function BlocksClient({ content }: { content: BlocksContent }) {
  return (
    // 使用 prose 类可以为文章内容提供漂亮的默认样式
    <div className="prose prose-lg max-w-none">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mb-4 text-[15px] text-gray-800">{children}</p>
          ),
          heading: ({ id, children, level }) => {
            const Tag = `h${level}` as keyof JSX.IntrinsicElements;
            const headingStyles = {
              1: "text-[28px] font-bold mt-6 mb-4 scroll-mt-24",
              2: "text-[22px] font-semibold mt-8 mb-3 scroll-mt-24",
              3: "text-[18px] font-semibold mt-6 mb-2 scroll-mt-24",
              4: "text-lg font-semibold mt-4 mb-2 scroll-mt-24",
              5: "text-base font-semibold mt-3 mb-1 scroll-mt-24",
              6: "text-sm font-semibold mt-2 mb-1 scroll-mt-24",
            };
            return (
              <Tag id={id} className={headingStyles[level] || "text-lg scroll-mt-24"}>
                {children}
              </Tag>
            );
          },
          list: ({ children, format }) => {
            if (format === "ordered") {
              return <ol className="list-decimal pl-6 my-4">{children}</ol>;
            }
            return <ul className="list-disc pl-6 my-4">{children}</ul>;
          },
          link: ({ children, url }) => (
            <Link
              href={url}
              className="text-red-600 underline hover:text-blue-800"
            >
              {children}
            </Link>
          ),
          image: ({ image }) => {
            return (
              <figure className="my-8">
                <Image
                  src={getCloudinaryPublicId(image.url)}
                  width={image.width || 800}
                  height={image.height || 600}
                  alt={image.alternativeText || ''}
                  className="object-cover rounded-lg mx-auto"
                />
                {image.caption && <figcaption className="text-center text-sm text-gray-500 mt-2">{image.caption}</figcaption>}
              </figure>
            );
          },
        }}
      />
    </div>
  );
}
