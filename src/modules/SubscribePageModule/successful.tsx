'use client';
import { Button } from "@/components/ui/Button"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Successful() {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  const handleBack = () => {
    setLoading(true)
    setTimeout(() => {
      push('/')
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-7">
      <motion.div
        initial={{ rotate: 180, scale: 0, opacity: 0 }}
        animate={{ rotate: 0, scale: 1, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 15,
          duration: 0.5
        }}
      >
        <Check className="bg-primary p-2 rounded-full w-20 h-20 text-white" />
      </motion.div>
      <div className="flex flex-col items-center">
        <motion.h1
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 260,
            damping: 15,
            delay: 0.2,
            duration: 0.5
          }}
          className="text-5xl text-primary font-bold "
        >
          Subscription Successful
        </motion.h1>
        <motion.p
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            ease: "easeInOut",
            type: "spring",
            stiffness: 260,
            damping: 15,
            delay: 0.4,
            duration: 0.5
          }}
          className="text-xl"
        >
          Thanks for your subscription
        </motion.p>
      </div>
      <motion.div 
        initial={{ translateY: 100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          type: "spring",
          stiffness: 260,
          damping: 15,
          delay: 0.5,
          duration: 0.5
        }}
        className="flex items-center justify-center w-full"
      >
        <Button 
          className="w-1/2 lg:w-1/4" 
          variant={"default"}
          onClick={handleBack}
        >
          {loading ? 'Redirecting...' : 'Back to Home'}
        </Button>
      </motion.div>
    </div>
  )
}