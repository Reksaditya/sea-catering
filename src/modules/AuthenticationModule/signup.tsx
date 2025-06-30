'use client'
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [passwordType, setPasswordType] = useState('password')
  const [confirmPasswordType, setConfirmPasswordType] = useState('password')

  const [iconPassword, setIconPassword] = useState(<EyeOff />)
  const [iconConfirmPassword, setIconConfirmPassword] = useState(<EyeOff />)

  const { push } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(form.password)) {
      toast.error('Password must be at least 8 characters long and contain  uppercase letter, lowercase letter, number, and special character');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Password and Confirm Password do not match')
      return;
    }
    
    const toastId = toast.loading('Signing up...')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword
        })
      })

      const data = await res.json();

      if (!res.ok) {
        console.log('Backend error:', data);
        setError(data.error)
        return;
      } else {
        setSuccess(true)
         
        await new Promise((resolve) => setTimeout(resolve, 1500))
        toast.success('Sign Up successful!', { id: toastId })
        push('/auth/signin')
        
      }
    } catch (err: any) {
      setError(err.message)
      toast.error('Sign Up failed!', { id: toastId })
    }
  }

  const toggleIconPassword = () => {
    if (passwordType === 'password') {
      setIconPassword(<Eye />)
      setPasswordType('text')
    } else {
      setIconPassword(<EyeOff />)
      setPasswordType('password')
    }
  }

  const toggleIconConfirmPassword = () => {
    if (confirmPasswordType === 'password') {
      setIconConfirmPassword(<Eye />)
      setConfirmPasswordType('text')
    } else {
      setIconConfirmPassword(<EyeOff />)
      setConfirmPasswordType('password')
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-secondary">
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
        <Card className="p-10 shadow-xl">
          <CardContent>
            <CardTitle className="text-xl md:text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-sm text-center">Start your healthy lifestyle with us</CardDescription>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-5 mt-7">
              <Input
                name="name"
                type="text"
                className="md:w-96 mt-2 md:h-12"
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <Input
                name="email"
                type="email"
                className="md:w-96 md:h-12 mt-2"
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <div className="flex relative">
                <Input
                  name="password"
                  type={passwordType}
                  className="md:w-96 md:h-12 mt-2"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
                <span className="absolute top-3.5 md:top-5 right-3 cursor-pointer scale-90 md:scale-100" onClick={toggleIconPassword}>{iconPassword}</span>
              </div>
              <div className="flex relative">
                <Input
                  name="confirmPassword"
                  type={confirmPasswordType}
                  className="md:w-96 md:h-12 mt-2"
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                />
                <span className="absolute top-3.5 md:top-5 right-3 cursor-pointer scale-90 md:scale-100" onClick={toggleIconConfirmPassword}>{iconConfirmPassword}</span>
              </div>
              <Button
                variant="default"
                className="w-full h-12 mt-7"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
            <CardDescription className="text-center mt-3">Already have an account? <a href="/auth/signin" className="text-primary">Sign In</a></CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 