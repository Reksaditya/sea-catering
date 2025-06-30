'use client'
import { Menu, User } from "lucide-react";
import { Button } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation";
import { scroller } from 'react-scroll'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface NavbarItemProps {
  name: string;
  path: string;
  pathname: string;
}

const NavbarItem: NavbarItemProps[] = [
  {
    name: 'Home',
    path: '/',
    pathname: 'home',
  },
  {
    name: 'Meal Plans',
    path: '/mealplan',
    pathname: 'meal-plan',
  },
  {
    name: 'Subscription',
    path: '/subscription',
    pathname: 'subscription',
  },
  {
    name: 'Contact Us',
    path: '/contactus',
    pathname: 'contact',
  }
]

export default function Navbar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    setIsLoggedIn(!!token)

    if (!token) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }

    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)

        setIsLoggedIn(true)
        setUser(parsedUser)

        console.log('parsedUser:', parsedUser)
      } catch (error) {
        console.error('Invalid user user data');
      }
    }
  }, []);

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...')

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      toast.success('Logout successful!', { id: toastId })
      setIsLoggedIn(false)
      push('/')
    } catch (error) {
      toast.error('Logout failed!', { id: toastId })
    }
  }

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-5 py-2 md:px-20 lg:px-32 w-full relative z-10">
      <img src={'/seacatering-logo/mainlogo.png'} alt="logo" width={125} className="scale-75 md:scale-100" />
      <ul className="lg:flex items-center gap-14 hidden">
        {NavbarItem.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (pathname === item.path) {
                scroller.scrollTo(item.pathname, {
                  duration: 800,
                  smooth: true,
                  offset: -100,
                })
              } else {
                push(item.path)
              }
            }}
            className={`list-none cursor-pointer hover:order-b-2 border-[var(--primary)] transition duration-200 ease-in-out ${pathname === item.path ? 'text-[var(--primary)] font-semibold border-b-2 border-[var(--primary)]' : ''}`}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div>
        {isLoggedIn === true ? (
          <div>
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="hidden items-center gap-2 cursor-pointer lg:flex">
                    <Image src={user?.avatarUrl && user.avatarUrl !== '' ? user.avatarUrl : '/dummyicon.png'} alt="userProfile" width={40} height={40} className="border-2 border-gray-500 rounded-full" />
                    <span className="font-semibold">{user?.name?.split(' ')[0] || 'User'}</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-7 p-5">
                    <div className="flex gap-2">
                      <User />
                      <a href="/dashboard">Dashboard</a>
                    </div>
                    <Button variant={'destructive'} onClick={handleLogout}>Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : (
          <Button
            variant={'black'}
            className="transition duration-200 ease-in-out w-20 h-10 hidden lg:flex"
            onClick={() => {
              push('/auth/signin')
            }}
          >
            Login
          </Button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild className="lg:hidden flex">
          <Menu />
        </PopoverTrigger>
        <PopoverContent className="max-w-80 md:max-w-none">
          {isLoggedIn === true ? (
            <div className="flex flex-col gap-5 px-5 py-2">
              <div>
                {user && (
                  <div className="flex flex-col gap-5">
                    <div className="flex gap-3 items-center">
                      <Image src={user?.avatarUrl && user.avatarUrl !== '' ? user.avatarUrl : '/dummyicon.png'} alt="userProfile" width={50} height={50} className="border-2 border-gray-500 rounded-full" />
                      <span className="font-semibold max-w-20">{user?.name?.split(' ')[0] || 'User'}</span>
                    </div>
                    <span className="flex gap-2 cursor-pointer">
                      <User />
                      <a href="/dashboard">Dashboard</a>
                    </span>
                  </div>
                )}
              </div>
              <hr className="border-gray-700 border" />
              <ul className="flex flex-col gap-5">
                {NavbarItem.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (pathname === item.path) {
                        scroller.scrollTo(item.pathname, {
                          duration: 800,
                          smooth: true,
                          offset: -100,
                        })
                      } else {
                        push(item.path)
                      }
                    }}
                    className={`list-none cursor-pointer hover:order-b-2 border-[var(--primary)] transition duration-200 ease-in-out ${pathname === item.path ? 'text-[var(--primary)] font-semibold border-b-2 border-[var(--primary)] max-w-fit' : ''}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <div>
                <Button
                  variant={'destructive'}
                  className="transition duration-200 ease-in-out w-20 h-10"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5 px-5 py-2">
              <ul className="flex flex-col gap-5">
                {NavbarItem.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (pathname === item.path) {
                        scroller.scrollTo(item.pathname, {
                          duration: 800,
                          smooth: true,
                          offset: -100,
                        })
                      } else {
                        push(item.path)
                      }
                    }}
                    className={`list-none cursor-pointer hover:order-b-2 border-[var(--primary)] transition duration-200 ease-in-out ${pathname === item.path ? 'text-[var(--primary)] font-semibold border-b-2 border-[var(--primary)] max-w-fit' : ''}`}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
              <Button
                variant={'black'}
                className="transition duration-200 ease-in-out w-20 h-10"
                onClick={() => {
                  push('/auth/signin')
                }}
              >
                Login
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </nav >
  )
} 