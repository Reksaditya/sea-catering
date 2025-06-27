'use client';
import Navbar from "@/components/layout/Navbar";
import SubscribePage from "@/modules/SubscribePageModule";
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SubscriptionPage() {
  const { push } = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      push('/auth/signin')
    }
  })

  return (
    <div>
      <Navbar />
      <SubscribePage />
    </div>
  )
}