'use client'
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";


export default function LandingPageModules() {
  return (
    <section id="home">
      <Navbar />
      <div className="bg-secondary lg:h-[620px] px-5 py-10 md:py-16 md:px-20 lg:py-0 lg:px-32">
        <Image 
          src={'/backgroundpattern.png'} 
          alt="pattern" 
          width={690} 
          height={690}
          className="absolute top-0 right-0 hidden lg:flex Z-0"
        />
        <motion.div
            initial={{ translateX: 100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ 
              ease: "easeInOut",
              duration: 0.8 
            }}
            className="flex items-center justify-center z-10 mb-10 lg:hidden"
          >
            <Image src={'/meal.png'} alt="meal" width={550} height={550} />
            
            
          </motion.div>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
          <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            transition={{ 
              ease: "easeInOut",
              duration: 0.8 
            }}
          >
            <h1 className="text-3xl font-bold text-primary-foreground max-w-2xl md:text-4xl lg:text-5xl lg:mt-16">Your Personalized Healthy Meal Service!</h1>
            <h3 className="text-lg mt-4 text-primary-foreground max-w-xl lg:text-xl">Nutritious, customizable meals made just for you, delivered fresh across Indonesia!</h3>
            <div className="flex items-center mt-4 gap-2 md:gap-5">
              <Button 
                variant={'black'}
                className="h-12 md:h-16 md:px-10 transition duration-200 ease-in-out"
              >
                Get My Meal Now
              </Button>
              <p className="text-primary-foreground text-sm md:text-lg">Contact Info: <br/> +62 812-3456-7890 (Brian)</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ translateY: 100, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ 
              ease: "easeOut",
              duration: 0.8 
            }}
            className="items-center justify-center hidden mt-40 z-10 lg:flex "
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
            className="bg-black opacity-50 w-[550px] h-[426px] absolute rounded-t-[100px] z-0 top-64 right-32 hidden lg:flex"
          ></motion.div>
        </div>
      </div>
    </section>
  );
}