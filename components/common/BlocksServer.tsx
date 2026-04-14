import type { JSX, ReactNode } from "react";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";

import { getCloudinaryPublicId } from "@/utils/formatUtils";

type BlocksNode = {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: BlocksNode[];
  level?: number;
  format?: "ordered" | "unordered";
  url?: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alternativeText?: string;
    caption?: string;
  };
  plainText?: string;
  id?: string;
};

interface BlocksServerProps {
  content: BlocksContent;
}

function getPlainText(nodes?: BlocksNode[]): string {
  if (!nodes) {
    return "";
  }

  return nodes
    .map((node) => {
      if (node.type === "text") {
        return node.text || "";
      }

      return getPlainText(node.children);
    })
    .join("");
}

function renderFormattedText(node: BlocksNode, key: string) {
  let content: ReactNode = node.text || "";

  if (node.code) {
    content = (
      <code className="rounded bg-gray-100 px-1 py-0.5 text-[0.95em]">
        {content}
      </code>
    );
  }
  if (node.bold) {
    content = <strong>{content}</strong>;
  }
  if (node.italic) {
    content = <em>{content}</em>;
  }
  if (node.underline) {
    content = <u>{content}</u>;
  }
  if (node.strikethrough) {
    content = <del>{content}</del>;
  }

  return <span key={key}>{content}</span>;
}

function renderChildren(children: BlocksNode[] | undefined, parentKey: string) {
  if (!children?.length) {
    return null;
  }

  return children.map((child, index) =>
    renderNode(child, `${parentKey}-${index}`)
  );
}

function renderNode(node: BlocksNode, key: string): ReactNode {
  switch (node.type) {
    case "text":
      return renderFormattedText(node, key);
    case "paragraph":
      return (
        <p key={key} className="mb-4 text-[15px] text-gray-800">
          {renderChildren(node.children, key)}
        </p>
      );
    case "heading": {
      const Tag = `h${node.level || 2}` as keyof JSX.IntrinsicElements;
      const headingStyles = {
        1: "text-[28px] font-bold mt-6 mb-4 scroll-mt-24",
        2: "text-[22px] font-semibold mt-8 mb-3 scroll-mt-24",
        3: "text-[18px] font-semibold mt-6 mb-2 scroll-mt-24",
        4: "text-lg font-semibold mt-4 mb-2 scroll-mt-24",
        5: "text-base font-semibold mt-3 mb-1 scroll-mt-24",
        6: "text-sm font-semibold mt-2 mb-1 scroll-mt-24",
      };

      return (
        <Tag
          key={key}
          id={node.id}
          className={
            headingStyles[node.level as keyof typeof headingStyles] ||
            "text-lg scroll-mt-24"
          }
        >
          {renderChildren(node.children, key)}
        </Tag>
      );
    }
    case "list": {
      const ListTag = node.format === "ordered" ? "ol" : "ul";
      const listClassName =
        node.format === "ordered"
          ? "my-4 list-decimal pl-6"
          : "my-4 list-disc pl-6";

      return (
        <ListTag key={key} className={listClassName}>
          {renderChildren(node.children, key)}
        </ListTag>
      );
    }
    case "list-item":
      return <li key={key}>{renderChildren(node.children, key)}</li>;
    case "quote":
      return (
        <blockquote
          key={key}
          className="my-6 border-l-4 border-gray-300 pl-4 italic text-gray-700"
        >
          {renderChildren(node.children, key)}
        </blockquote>
      );
    case "code":
      return (
        <pre
          key={key}
          className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white"
        >
          <code>{node.plainText || getPlainText(node.children)}</code>
        </pre>
      );
    case "link": {
      const href = node.url || "#";
      const content = renderChildren(node.children, key);

      if (href.startsWith("http://") || href.startsWith("https://")) {
        return (
          <a
            key={key}
            href={href}
            className="text-red-600 underline hover:text-blue-800"
          >
            {content}
          </a>
        );
      }

      return (
        <Link
          key={key}
          href={href}
          className="text-red-600 underline hover:text-blue-800"
        >
          {content}
        </Link>
      );
    }
    case "image":
      if (!node.image?.url) {
        return null;
      }

      return (
        <figure key={key} className="my-8">
          <Image
            src={getCloudinaryPublicId(node.image.url)}
            width={node.image.width || 800}
            height={node.image.height || 600}
            alt={node.image.alternativeText || ""}
            className="mx-auto rounded-lg object-cover"
          />
          {node.image.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {node.image.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return renderChildren(node.children, key);
  }
}

export default function BlocksServer({ content }: BlocksServerProps) {
  return (
    <div className="prose prose-lg max-w-none">
      {(content as BlocksNode[]).map((node, index) =>
        renderNode(node, `block-${index}`)
      )}
    </div>
  );
}
