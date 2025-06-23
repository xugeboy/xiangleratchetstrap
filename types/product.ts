import { Blog } from "./blog";
import { ProductCategory } from "./productCategory";
import { Galleries, Gallery } from "./gallery";
import { ContentItem } from "@/components/product/AlternatingContent";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import { StrapColorOption } from "./strapColorOption";

export interface Product {
    id: number;
    name: string;
    slug: string;
    code?: string;
    featured_image?: Gallery; // 图片
    gallery?: Galleries; // 图片数组
    see_more: BlocksContent;
    about?: string; // Markdown 内容
    category?: ProductCategory; // 关联的分类
    youtube_url?: string;
    youtube_title?: string;
    related_blogs?: Blog[]; // 关联的博客
    related_products?: Product[]; // 关联的产品
    assembly_break_strength?: string;
    length?: string;
    fixed_end_length?: string;
    end_fitting?: string;
    width?: string;
    working_load_limit?: string;
    material?: string;
    webbing_break_strength?: string;
    grade?: string;
    ratchet_handle?: string;
    finish?: string;
    product_weight?: string;
    alternating_content?: ContentItem[]
    seo_title?: string;
    seo_description?: string;
    publishedAt: string;
    updatedAt: string;
    allLanguageSlugs: string[];
    elongation_at_lc: string;
    compliance: string;
    strap_colors: StrapColorOption[];
}