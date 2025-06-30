'use client';
import Navbar from "@/components/layout/Navbar";
import UserDashboardModule from "@/modules/DashboardModule/user/userdashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserDashboardPage() {
  const { push } = useRouter()
  
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        push('/auth/signin')
      }
    })

  return (
    <div>
      <Navbar />
      <UserDashboardModule />
    </div>
  )
}