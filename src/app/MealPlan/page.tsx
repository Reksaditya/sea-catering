import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MealPlanSection from "@/modules/MealPlanModules";

export default function MealPlan() {
  return (
    <div>
      <Navbar />
      <MealPlanSection/>
      <Footer />
    </div>
  )
}