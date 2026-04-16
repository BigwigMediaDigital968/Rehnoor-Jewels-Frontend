import HeroSection from "@/app/component/website/Herosection";
import CategoriesSection from "@/app/component/website/Categoriessection";
import BestsellersSection from "@/app/component/website/Bestsellerssection";
import BrandStorySection from "@/app/component/website/Brandstorysection";
import TestimonialsSection from "@/app/component/website/Testimonialssection";
import InstagramSection from "@/app/component/website/Instagramsection";
import ProductGridCarousel from "./component/website/Productgridcarousel";
import GoldPriceScroll from "./component/shared/GoldPriceScroll";
import HomeBlogSection from "./component/website/Homeblogsection";
import Stats from "./component/Stats";

export default function HomePage() {
  return (
    <>
      {/* <GoldPriceScroll /> */}
      <main>
        <HeroSection />
        <CategoriesSection />
        <Stats />
        <BestsellersSection />
        <BrandStorySection />
        <ProductGridCarousel />
        <TestimonialsSection />
        <HomeBlogSection />
        <InstagramSection />
      </main>
    </>
  );
}
