import LandingPageModules from "./modules/LandingPageModules";
import ServicesModule from "./modules/LandingPageModules/service";
import TestimonialModule from "./modules/LandingPageModules/testimonial";


export default function Home() {
  return (
    <div className="font-monda">
      <LandingPageModules />
      <ServicesModule />
      <TestimonialModule />
    </div>
  );
}
