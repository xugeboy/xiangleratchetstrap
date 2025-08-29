import { Faq } from "./faq";
import { Gallery } from "./gallery";
import { Product } from "./product";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt?: string; // 摘要
    cover_image?: Gallery; // 文章封面图片
    products?: Product[]; // 关联的产品
    content: unknown[]; // 文章内容
    seo_title?: string;
    seo_description?: string;
    keywords?: string; // SEO关键词
    articleSection?: string; // 文章分类
    wordCount?: number; // 字数统计
    readingTime?: string; // 阅读时间
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blogs: Blog[];
    faqs: Faq[];
    allLanguageSlugs: string[]
}