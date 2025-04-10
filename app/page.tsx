import HeroSection from "@/components/home/hero-section"
import CapabilitiesSection from "@/components/home/capabilities-section"
import IndustriesSection from "@/components/home/industries-section"
import CategoriesSection from "@/components/home/categories-section"
import ProductsSection from "@/components/home/products-section"
import ArticlesSection from "@/components/home/articles-section"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />
      <CapabilitiesSection />
      <IndustriesSection />
      <CategoriesSection />
      <ProductsSection />
      <ArticlesSection />
    </main>
  )
}

