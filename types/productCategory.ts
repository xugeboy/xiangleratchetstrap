import { Product } from "./product";

export interface ProductCategory {
    id: number;
    name: string;
    description?: string;
    slug: string;
    image?: {
      url: string;
    };
    parent?: ProductCategory | null;
    children?: ProductCategory[];
    products?: {
      data: Product[];
    };
  }