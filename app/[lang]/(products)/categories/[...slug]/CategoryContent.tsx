import Breadcrumb from "@/components/common/Breadcrumb";
import BlocksServer from "@/components/common/BlocksServer";
import { generateCategoryBreadcrumbs } from "@/utils/breadcrumbs";
import { embedSchema, generateSchema } from "@/utils/schema";
import { Product } from "@/types/product";
import { ProductFilter } from "@/types/productFilter";
import { ProductCategory } from "@/types/productCategory";

import CategoryPageClient from "./CategoryPageClient";

interface CategoryContentProps {
  currentCategory: ProductCategory;
  initialProducts: Product[];
  initialTotalPages: number;
  itemsPerPage: number;
  lang: string;
  productFilters: ProductFilter[];
}

export default function CategoryContent({
  currentCategory,
  initialProducts,
  initialTotalPages,
  itemsPerPage,
  lang,
  productFilters,
}: CategoryContentProps) {
  const breadcrumbItems = generateCategoryBreadcrumbs(currentCategory, lang);
  const articleSchema = generateSchema({
    lang,
    type: "CollectionPage",
    data: currentCategory,
    slug: currentCategory.slug,
  });
  const breadcrumbSchema = generateSchema({
    type: "BreadcrumbList",
    breadcrumbItems,
  });
  const schemaMetadataJson = embedSchema(
    [articleSchema, breadcrumbSchema].filter(Boolean)
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaMetadataJson }}
        />
      </section>

      <Breadcrumb items={breadcrumbItems} lang={lang} />

      <CategoryPageClient
        currentCategory={currentCategory}
        initialProducts={initialProducts}
        initialTotalPages={initialTotalPages}
        itemsPerPage={itemsPerPage}
        lang={lang}
        productFilters={productFilters}
      />

      {currentCategory.description && (
        <section className="mt-24 md:mt-40 bg-white rounded-2xl p-2">
          <BlocksServer content={currentCategory.description} />
        </section>
      )}
    </div>
  );
}
