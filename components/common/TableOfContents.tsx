"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";

// 定义标题的数据结构
interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  children?: ReactNode;
}

/**
 * 目录组件
 * - 接收标题列表并渲染
 * - 粘性定位，随页面滚动
 * - 使用 IntersectionObserver 自动高亮当前章节
 */
export default function TableOfContents({ headings, children }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 如果存在，先断开旧的 observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // 创建一个新的 IntersectionObserver 来观察标题元素
    observer.current = new IntersectionObserver(
      (entries) => {
        // 寻找第一个正在进入视口的条目并高亮
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveId(intersectingEntry.target.id);
        }
      },
      // rootMargin 用于微调触发范围，-80% 的 bottom margin 意味着标题需要在屏幕靠上的位置才算激活
      { rootMargin: "0px 0px -80% 0px" }
    );

    // 获取所有标题对应的 DOM 元素并开始观察
    const elements = headings
      .map(({ id }) => document.getElementById(id))
      .filter((el) => el);
    elements.forEach((el) => observer.current?.observe(el!));

    // 组件卸载时停止观察
    return () => observer.current?.disconnect();
  }, [headings]); // 当 headings 变化时，重新执行 effect

  // 如果没有标题，则不渲染目录
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="p-4 bg-gray-50 rounded-lg">
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`py-1 ${heading.level === 3 ? "ml-4" : ""}`}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(`#${heading.id}`)?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className={`transition-colors duration-200 text-sm ${
                activeId === heading.id
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
      {children ? <div className="mt-4">{children}</div> : null}
    </nav>
  );
}
