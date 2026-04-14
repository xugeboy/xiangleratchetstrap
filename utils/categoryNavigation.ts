import { CategoryNavigationItem } from "@/types/categoryNavigation";
import { ProductCategory } from "@/types/productCategory";

function toNavigationChild(category: ProductCategory): CategoryNavigationItem {
  return {
    documentId: category.documentId,
    id: category.id,
    name: category.name,
    slug: category.slug,
    featured_image: category.featured_image,
    children: category.children?.map(toNavigationChild) || [],
  };
}

export function toNavigationCategories(
  categories: ProductCategory[]
): CategoryNavigationItem[] {
  return categories.map(toNavigationChild);
}
