import { Gallery } from "./gallery";
import { Product } from "./product";

export interface Blog {
    id: number;
    title: string;
    slug: string;
    excerpt?: string; // 摘要
    cover_image?: Gallery; // 文章封面图片
    products?: Product[]; // 关联的产品
    content: []
    seo_title?: string;
    seo_description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blogs: Blog[];
}