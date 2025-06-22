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
        <Button
          variant={'black'}
          className="transition duration-200 ease-in-out hidden lg:flex w-20 h-10"
          onClick={() => {
            push('/auth/signin')
          }}
        >
          Login
        </Button>
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
          </div>
        </PopoverContent>
      </Popover>

    </nav>
  )
}