import LandingPageModules from "@/modules/LandingPageModules";
import HowItWorksModule from "@/modules/LandingPageModules/howitworks";
import ServicesModule from "@/modules/LandingPageModules/service";
import TestimonialModule from "@/modules/LandingPageModules/testimonial";
import MealPlanModule from "@/modules/LandingPageModules/mealplan";


export default function Home() {
  return (
    <div>
      <LandingPageModules />
      <ServicesModule />
      <HowItWorksModule />
      <MealPlanModule />
      <TestimonialModule />
    </div>
  );
}
