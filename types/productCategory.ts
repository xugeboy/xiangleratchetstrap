import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { Product } from "./product";
import { Gallery } from "./gallery";

export interface ProductCategory {
    documentId: string;
    id: number;
    name: string;
    description: BlocksContent;
    slug: string;
    sort: number;
    featured_image?: Gallery;
    parent?: ProductCategory | null;
    children?: ProductCategory[];
    products?: Product[];
    seo_title?: string;
    seo_description?: string;
    publishedAt: string;
    updatedAt: string;
    allLanguageSlugs: string[]
  }
