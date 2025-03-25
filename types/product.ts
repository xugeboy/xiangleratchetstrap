import { Blog } from "./blog";
import { ProductCategory } from "./productCategory";

export interface Product {
    id: number;
    name: string;
    see_more?: string; // Markdown 内容
    about?: string; // Markdown 内容
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
    code?: string;
    slug: string;
    category?: ProductCategory; // 关联的分类
    gallery?: string[]; // 图片数组
    youtube_url?: string;
    related_blogs?: Blog[]; // 关联的博客
    related_products?: Product[]; // 关联的产品
  }