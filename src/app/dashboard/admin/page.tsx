'use client';
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import AdminDashboardModule from "@/modules/DashboardModule/admin/admindashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AdminDashboardPage() {
  const { push } = useRouter()

  useEffect(() => {
    if (localStorage.getItem('role') !== 'admin') {
      toast.error('You are not an admin!')
      push('/')
    }

    if (!localStorage.getItem('token')) {
      push('/auth/signin')
    }
  })

  return (
    <div>
      <Navbar />
      <AdminDashboardModule />
      <Footer />
    </div>
  )
}