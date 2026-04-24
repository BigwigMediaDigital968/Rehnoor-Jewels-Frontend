import AboutHero from "./component/AboutHero";
import OurStory from "./component/AboutStory";
import WhyTrustUs from "./component/WhyTrustUs";
import Features from "./component/Features";
import OurPartners from "./component/OurPartners";
import OurTeam from "./component/OurTeam";
import SocialFeed from "../component/website/SocialFeed";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <WhyTrustUs />
      <Features />
      {/* <OurPartners /> */}
      {/* <OurTeam /> */}
      {/* <SocialFeed /> */}
    </main>
  );
}
