'use client'
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(<EyeOff />)
  const { push } = useRouter();

  const toggleIcon = () => {
    if (type === 'password') {
      setIcon(<Eye />)
      setType('text')
    } else {
      setIcon(<EyeOff />)
      setType('password')
    }
  }

  const handleSignIn = () => {
    if (email === '' && password === '') {

    } else {
      push('/')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-secondary">
      <Card className="p-10 shadow-xl flex flex-row items-center gap-10">
        <Image alt="logo" width={300} height={300} src={"/seacatering-logo/headlogo.png"} />
        <CardContent>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-lg text-center">Sign in to your account</CardDescription>
          <div className="flex flex-col gap-5 mt-7">
            <div>
              <label htmlFor="email">Email</label>
              <Input 
                name="email" 
                type="email"
                value={email} 
                className="w-80 h-12 mt-2" 
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="flex relative">
                <Input 
                  name="password" 
                  type={type}
                  value={password}
                  className="w-80 h-12 mt-2" 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="current-password"
                />
                <span className="absolute top-5 right-3 cursor-pointer" onClick={toggleIcon}>{icon}</span>
              </div>
              <div className="flex justify-end">
                <p className="text-primary text-sm mt-2 cursor-pointer">Forgot Password?</p>
              </div>
            </div>
          </div>
          <Button
            variant="default"
            className="w-full h-12 mt-7"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <CardDescription className="text-center mt-3">Don't have an account? <a href="/auth/signup" className="text-primary">Sign Up</a></CardDescription>
        </CardContent>
      </Card>
      
      <motion.div 
        initial={{ translateX: 100, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{ 
          ease: "easeInOut",
          duration: 0.8 
        }}
        className={`absolute right-0 top-0 p-5 ${email === '' || password === '' ? 'block' : 'hidden'}`}
      >
        <Card>
          <CardContent>
            <CardTitle>Failed Login</CardTitle>
            <CardDescription>Please enter correct password and email</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}