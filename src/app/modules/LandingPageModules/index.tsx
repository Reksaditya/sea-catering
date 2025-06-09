'use client'
import Navbar from "@/app/components/layout/Navbar";
import { Button } from "@/app/components/ui/Button";
import { motion } from "framer-motion";

import Image from "next/image";


export default function LandingPageModules() {
  return (
    <div>
      <Navbar />
      <div className="bg-[#6bc371] h-[620px] px-32">
        <Image 
          src={'/backgroundpattern.png'} 
          alt="pattern" 
          width={600} 
          height={600}
          className="absolute z-0 top-6 right-0"
        />
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ 
              ease: "easeInOut",
              duration: 0.8 
            }}
          >
            <h1 className="text-5xl font-bold mt-16 text-black max-w-2xl">Your Personalized Healthy Meal Service!</h1>
            <h3 className="text-xl mt-4 text-black max-w-xl">Nutritious, customizable meals made just for you, delivered fresh across Indonesia!</h3>
            <div className="flex items-center mt-4 gap-5">
              <Button 
                variant={'default'}
                className="hover:scale-[1.05] transition duration-200 ease-in-out hidden lg:flex"
              >
                <span>Get My Meal Now</span>
              </Button>
              <p>Contact Info: <br/> +62 812-3456-7890 (Brian)</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ 
              ease: "easeOut",
              duration: 0.8 
            }}
            className="flex items-center justify-center mt-40 z-10"
          >
            <Image src={'/meal.png'} alt="meal" width={550} height={550} />
            
            
          </motion.div>
          <motion.div 
            initial={{ translateX: 0, opacity: 0}}
            animate={{ translateX: -20, opacity: 0.5 }}
            transition={{ 
              ease: "easeOut",
              duration: 0.8,
              delay: 0.5 
            }}
            className="bg-black opacity-50 w-[550px] h-[428px] absolute rounded-t-[100px] z-0 top-48 right-32"
          ></motion.div>
        </div>
      </div>
    </div>
  );
}