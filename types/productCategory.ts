import { Product } from "./product";
import { Gallery } from "./gallery";

export interface ProductCategory {
    id: number;
    name: string;
    description?: string;
    slug: string;
    sort: number;
    featured_image?: Gallery;
    parent?: ProductCategory | null;
    children?: ProductCategory[];
    products?: Product[];
  }