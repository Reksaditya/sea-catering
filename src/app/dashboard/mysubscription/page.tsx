import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MySubscriptionModule from "@/modules/DashboardModule/user/mysubscription";

export default function MySubscriptionPage() {
  return (
    <div>
      <Navbar />
      <MySubscriptionModule />
      <Footer />
    </div>
  )
}