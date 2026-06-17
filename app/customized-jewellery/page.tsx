import FAQs from "../component/website/FAQ";
import { customizedJewelleryFAQProps } from "../data/Faqdata";
import CustomAbout from "./component/CustomAbout";
import CustomBooking from "./component/CustomBooking";
import CustomCTA from "./component/CustomCTA";
import CustomHero from "./component/Customhero";
import CustomJewel from "./component/CustomJewels";
import CustomLeadForm from "./component/CustomLeadForm";
import CustomPricing from "./component/CustomPricing";
import CustomProcess from "./component/CustomProcess";
import Customtable from "./component/CustomTable";

export default function CustomJewelleryPage() {
  return (
    <>
      <CustomHero />
      <CustomAbout />
      <Customtable />
      <CustomJewel />
      <CustomProcess />
      <CustomPricing />
      <CustomBooking />
      <CustomLeadForm />
      <FAQs {...customizedJewelleryFAQProps} />
      <CustomCTA />
    </>
  );
}
