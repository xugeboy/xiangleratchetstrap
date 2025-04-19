"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import Link from "next/link";

export default function BlocksClient({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <p className="mb-4 text-gray-700">{children}</p>
        ),
        heading: ({ children, level }) => {
          const Tag = `h${level}` as keyof JSX.IntrinsicElements;
          const headingStyles = {
            1: "text-3xl font-bold mt-6 mb-4",
            2: "text-2xl font-semibold mt-5 mb-3",
            3: "text-xl font-semibold mt-4 mb-2",
          };
          return (
            <Tag className={headingStyles[level] || "text-lg"}>{children}</Tag>
          );
        },
        // 关键！列表
        list: ({ children, format }) => {
          if (format === "ordered") {
            return <ol className="list-decimal pl-6 my-4">{children}</ol>;
          }
          return <ul className="list-disc pl-6 my-4">{children}</ul>;
        },
        link: ({ children, url }) => (
            <Link href={url} className="text-blue-600 underline hover:text-blue-800">
              {children}
            </Link>
          ),
      }}
    />
  );
}
