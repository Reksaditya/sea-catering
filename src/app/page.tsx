import LandingPageModules from "@/modules/LandingPageModules";
import HowItWorksModule from "@/modules/LandingPageModules/howitworks";
import ServicesModule from "@/modules/LandingPageModules/service";
import TestimonialModule from "@/modules/LandingPageModules/testimonial";
import MealPlanModule from "@/modules/LandingPageModules/mealplan";
import Footer from "@/components/layout/Footer";
import EmailSubscribeModule from "@/modules/LandingPageModules/emailsubscribe";


export default function Home() {
  return (
    <div>
      <LandingPageModules />
      <ServicesModule />
      <HowItWorksModule />
      <MealPlanModule />
      <TestimonialModule />
      <EmailSubscribeModule />
      <Footer />
    </div>
  );
}
