'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";


export const HowItWorksItems = ({
  image,
  title,
  description,
  index,
  width,
  height,
}: {
  image: string;
  title?: string;
  description?: string;
  index: number;
  width: number;
  height: number;
}) => {
  const { ref, inView } = useInView({ 
    triggerOnce: true,
    threshold: 0.1 
  });

  return (
    <motion.div
      ref={ref} 
      initial={{ opacity: 0, x: -250 }}
      animate={ inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.5,
        delay:  0.2 * index
      }}
      className={`flex flex-col items-center max-w-72 gap-3 ${!title ? 'hidden lg:flex' : ''}`}
    >
      <Image src={image} alt={title ?? ''} width={width} height={height} className="pl-8" />
      <h2 className="text-xl font-bold text-center">{title}</h2>
      <p className="text-center text-sm">{description}</p>
    </motion.div>
  )
}
  
export default function HowItWorksModule() {
  return (
    <section className="w-full flex flex-col items-center text-center gap-12 px-5 my-10 md:px-20 md:my-16 lg:px-32">
      <h1 className="text-3xl font-bold text-primary md:text-4xl ">One, Two, Three <br /> <span className="text-black">Let's Eat!</span></h1>
      <div 
        className="flex flex-col items-center w-full gap-10 lg:flex-row lg:justify-between"
      >
        <HowItWorksItems 
          image={'/step1.png'}
          width={150}
          height={150}
          title={'Choose your meal plan'}
          description={'Choose a meal plan that suits your needs and dietary preferences.'}
          index={0}
        />
        
        <HowItWorksItems
          image={'/arrow.png'}
          width={150}
          height={150}
          index={1}
        />

        <HowItWorksItems 
          image={'/step2.png'}
          width={160}
          height={160}
          title={'Order your meals'}
          description={'Order your meals online and have them delivered to your doorstep.'}
          index={2}
        />

        <HowItWorksItems
          image={'/arrow.png'}
          width={150}
          height={150}
          index={3}
        />
        
        <HowItWorksItems 
          image={'/step3.png'}
          width={180}
          height={180}
          title={'Checkout and track delivery'}
          description={'Checkout and track your order as it makes its way to your doorstep.'}
          index={4}
        />
      </div>
    </section>
  )
}