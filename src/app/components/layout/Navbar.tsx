'use client'
import { Button } from "../ui/Button";
import { useState } from "react";
import { motion } from "framer-motion";


export const NavbarItem = ({
  name,
  onClick,
  index
}: {
  name: string;
  onClick: () => void;
  index: number;
})  => {
  const [underlineVisible, setUnderlineVisible] = useState(false)

  return (
    <li
      className="hover:after:hover:scale-[1.05] transition duration-200 ease-in-out list-none cursor-pointer"
      onClick={onClick}
      key={index}
    >
      <span>{name}</span>
      {underlineVisible && (
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
          className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"
        />
      )}
    </li>
  )
}
export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-white shadow-md py-2 px-32 w-full fixed z-50">
      <div>
        <img src={'/mainlogo.png'} alt="logo" width={125}/>
      </div>
      <div className="flex items-center gap-14">
        <NavbarItem name={'Home'} onClick={() => {}} index={0} />
        <NavbarItem name={'Meal Plans'} onClick={() => {}} index={1} />
        <NavbarItem name={'Subscription'} onClick={() => {}} index={2} />
        <NavbarItem name={'Contact Us'} onClick={() => {}} index={3} />
      </div>
      <div>
        <Button 
          variant={'default'}
          className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
        >
          <span>Login</span>
        </Button>
      </div>
    </div>
  )
}