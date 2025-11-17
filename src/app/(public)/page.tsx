import HeroSlider from '@/components/layout/HomeSlider'
import FeaturesBar from '@/components/layout/FeaturesBar'
import CategoriesGrid from '@/components/layout/CategoriesGrid'
import FeaturedProducts from '@/components/ui/Card'
import PromoBanners from '@/components/layout/PromoBanners'
import Testimonials from '@/components/layout/Testimonials'
import Newsletter from '@/components/layout/Newsletter'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturesBar />
      <CategoriesGrid />
      <FeaturedProducts />
      <PromoBanners />
      <Testimonials />
      <Newsletter />
    </>
  )
}