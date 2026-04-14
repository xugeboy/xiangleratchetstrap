import { Gallery } from "./gallery";

export interface CategoryNavigationItem {
  documentId: string;
  id: number;
  name: string;
  slug: string;
  featured_image?: Gallery;
  children?: CategoryNavigationItem[];
}
