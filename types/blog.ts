import { Product } from "./product";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    content: string; // Markdown 格式内容
    excerpt?: string; // 摘要
    cover_image?: string; // 文章封面图片
    products?: Product[]; // 关联的产品
    seo_title?: string;
    seo_description?: string;
    createdAt: Date
}