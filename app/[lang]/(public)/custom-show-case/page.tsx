import { LoadMore } from "@/components/common/LoadMore";
import ProductCard from "@/components/common/ProductCard";
import { getInitialShowCases } from "@/services/api/showCase";

export default async function CasesPage() {
  const { data: initialProducts, meta } = await getInitialShowCases();
  const pageCount = meta.pagination.pageCount;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            我们的定制案例
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            探索我们为全球客户精心打造的独特产品与解决方案。
          </p>
        </div>

        <div className="masonry-container mt-12">
          {initialProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
          
          <LoadMore initialPageCount={pageCount} />
        </div>

        {initialProducts.length === 0 && (
            <div className="mt-12 text-center text-gray-500">
                <p>暂无产品案例，敬请期待！</p>
            </div>
        )}
      </div>
    </div>
  );
}
