import HeroSlider from '@/components/layout/HomeSlider'
import FeaturesBar from '@/components/layout/FeaturesBar'
import CategoriesGrid from '@/components/layout/CategoriesGrid'
import CategoryShowcase from '@/components/layout/CategoryShowcase'
import FeaturedProducts from '@/components/layout/FeaturedProducts'
import EcommerceHighlights from '@/components/layout/EcommerceHighlights'
import PromoBanners from '@/components/layout/PromoBanners'
import Testimonials from '@/components/layout/Testimonials'
import Newsletter from '@/components/layout/Newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturesBar />
      <CategoriesGrid />
      <CategoryShowcase />
      <FeaturedProducts />
      <EcommerceHighlights />
      <PromoBanners />
      <Testimonials />
      <Newsletter />
    </>
  )
}