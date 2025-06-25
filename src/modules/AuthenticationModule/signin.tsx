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
      localStorage.setItem('token', data.token)
      setToken(data.token)
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
    <div className="h-screen flex flex-col items-center justify-center gap-2">
      <Card className="p-10 shadow-xl flex items-center gap-2">
        <CardContent>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-lg text-center">Sign in to your account</CardDescription>
          <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-7">
            <div>
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                type="email"
                className="w-80 h-12 mt-2"
                onChange={handleChange}
                autoComplete="current-email"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="flex relative">
                <Input
                  name="password"
                  type={type}
                  className="w-80 h-12 mt-2"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
                <span className="absolute top-5 right-3 cursor-pointer" onClick={toggleIcon}>{icon}</span>
              </div>
              <div className="flex justify-end">
                <p className="text-primary text-sm mt-2 cursor-pointer">Forgot Password?</p>
              </div>
            </div>
            <div>
              <Button
                variant="default"
                className="w-full h-12 mt-7"
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
    </div>
  )
}