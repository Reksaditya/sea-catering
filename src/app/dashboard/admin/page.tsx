import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AdminDashboardModule from "@/modules/DashboardModule/admin/admindashboard";

export default function AdminDashboardPage() {
  return (
    <div>
      <Navbar />
      <AdminDashboardModule />
      <Footer />
    </div>
  )
}