'use client'
import { Menu } from "lucide-react";
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
    path: '/contact',
    pathname: 'contact',
  }
]

export default function Navbar() {
  const { push } = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      try {
        setIsLoggedIn(true)
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Invalid user user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUser(null)
    push('/signin')
  }

  return (
    <nav className="flex items-center justify-between bg-white shadow-md px-5 py-2 md:px-20 lg:px-32 w-full relative z-10">
      <div>
        <img src={'/seacatering-logo/mainlogo.png'} alt="logo" width={125} className="scale-75 md:scale-100" />
      </div>
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
        {isLoggedIn ? (
          <div>
            {user && (
              <Popover>
                <PopoverTrigger asChild>
                  <Image src={user.avatarUrl || '/dummyicon.png'} alt="logo" width={50} height={50} className="border-2 border-gray-500 rounded-full" />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2">
                    <p>Hi, {user.name}</p>
                    <span>
                      <a href="/dashboard">Dashboard</a>
                    </span>
                    <Button variant={'destructive'} onClick={handleLogout}>Logout</Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        ) : (
          <Button
            variant={'black'}
            className="transition duration-200 ease-in-out w-20 h-10"
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
        <PopoverContent className="max-w-60 md:max-w-none">
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
            <div>
              {isLoggedIn ? (
                <div>
                  <Image src={'/dummyicon.png'} alt="logo" width={125} className="border-2 border-gray-500 rounded-full" />
                  {user && (
                    <p>Hi, {user.name}</p>
                  )}
                </div>
              ) : (
                <Button
                  variant={'black'}
                  className="transition duration-200 ease-in-out w-20 h-10"
                  onClick={() => {
                    push('/auth/signin')
                  }}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

    </nav>
  )
}