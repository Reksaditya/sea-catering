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
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [errorMsg, setErrorMsg] = useState('')
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)

  const [type, setType] = useState('password')
  const [icon, setIcon] = useState(<EyeOff />)
  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login Failed')
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);
      push('/')
    } catch (error: any) {
      setErrorMsg(error.message)
    } finally {
      setLoading(false)
    }
  }

  const toggleIcon = () => {
    if (type === 'password') {
      setIcon(<Eye />)
      setType('text')
    } else {
      setIcon(<EyeOff />)
      setType('password')
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2 bg-secondary relative">
      <Image src={'/backgroundfoodpattern.png'} fill alt="pattern" className="absolute z-0 inset-0 hidden lg:flex" />
      <Image src={'/backgroundpatternresponsive.png'} fill alt="pattern" className="absolute z-0 inset-0 lg:hidden" />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          duration: 0.5,
        }}
        className="z-10"
      >
        <Card className="p-10 shadow-xl flex items-center gap-2">
          <CardContent>
            <CardTitle className="text-xl md:text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-sm text-center">Sign in to your account</CardDescription>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 md:gap-5 mt-7">
              <Input
                name="email"
                type="email"
                className="mt-2 md:w-96 md:h-12"
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <div className="flex flex-col">
                <div className="flex relative">
                  <Input
                    name="password"
                    type={type}
                    className="mt-2 md:h-12 md:w-96"
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                  <span className="absolute right-3 cursor-pointer scale-90 top-3.5 md:top-5 md:scale-100" onClick={toggleIcon}>{icon}</span>
                </div>
                <a className="text-primary text-sm mt-2 cursor-pointer text-right">Forgot Password?</a>
              </div>
              <div>
                <Button
                  variant="default"
                  className="w-full mt-7 md:h-12"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Sign In'}
                </Button>
                {errorMsg && <p className="text-destructive text-sm text-center mt-2">{errorMsg}</p>}
              </div>
            </form>
            <CardDescription className="text-center mt-3">Don't have an account? <a href="/auth/signup" className="text-primary">Sign Up</a></CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}