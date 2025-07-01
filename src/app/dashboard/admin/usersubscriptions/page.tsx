import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import UserSubscriptionsPage from "@/modules/DashboardModule/admin/usersubscription";

export default function userSubscriptions() {
  return (
    <div>
      <Navbar />
      <UserSubscriptionsPage />
      <Footer />
    </div>
  )
}