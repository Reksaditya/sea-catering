'use client'
import { Button } from "../ui/Button";
import { usePathname, useRouter } from "next/navigation"; 
import { scroller } from 'react-scroll' 

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
    <div className="flex items-center justify-between bg-white shadow-md py-2 px-32 w-full fixed z-50">
      <div>
        <img src={'/mainlogo.png'} alt="logo" width={125}/>
      </div>
      <ul className="flex items-center gap-14">
        {NavbarItem.map((item, index) => (
          <li 
            key={index}
            onClick={() => {
              if(pathname === item.path) {
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
          className="transition duration-200 ease-in-out hidden lg:flex"
        >
          <span>Login</span>
        </Button>
      </div>
    </div>
  )
}