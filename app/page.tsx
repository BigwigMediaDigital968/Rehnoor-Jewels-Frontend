import AnnouncementBar from "@/app/component/website/Announcementbar";
import Navbar from "@/app/component/website/Navbar";
import Footer from "@/app/component/website/Footer";
import HeroSection from "@/app/component/website/Herosection";
import CategoriesSection from "@/app/component/website/Categoriessection";
import BestsellersSection from "@/app/component/website/Bestsellerssection";
import BrandStorySection from "@/app/component/website/Brandstorysection";
import TestimonialsSection from "@/app/component/website/Testimonialssection";
import InstagramSection from "@/app/component/website/Instagramsection";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <HeroSection />
        <CategoriesSection />
        <BestsellersSection />
        <BrandStorySection />
        <TestimonialsSection />
        <InstagramSection />
      </main>
      <Footer />
    </>
  );
}
