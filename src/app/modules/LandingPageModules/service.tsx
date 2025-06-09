'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

interface ServicesProps {
  image: string;
  title: string;
  description: string;
}

const ServicesItems: ServicesProps[] = [
  {
    image: '/mealplan.png',
    title: 'Meal Plan',
    description: 'Create a personalized meal plan based on your dietary preferences and nutritional needs.'
  },
  {
    image: '/delivery.png',
    title: 'Fresh Delivery',
    description: 'Enjoy fresh meals delivered directly to your doorstep, ensuring a healthy and satisfying meal experience.'
  },
  {
    image: '/subscription.png',
    title: 'Subscription',
    description: 'Subscribe to our meal plan and receive personalized meals every week, ensuring you never miss out on a nutritious meal.'
  },
  {
    image: '/nutrition.png',
    title: 'Nutrition Information',
    description: 'Access detailed nutritional information for each meal, helping you make informed choices about your meals.'
  }
] 

export default function ServicesModule() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  return (
    <div className="bg-white h-[420px] w-full px-32 z-20 flex flex-col items-center justify-between">
      <motion.div className="flex items-center w-full h-full justify-between">
        {ServicesItems.map((item, index) => (
          <motion.div
            ref={ref}
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={ inView ? {  opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-10 w-full"
          >
            <div className="flex flex-col items-center w-[300px] h-[350px] bg-white shadow-lg rounded-3xl p-10 gap-3 hover:-translate-y-2.5 transition duration-300 ease-in-out cursor-pointer">
              <Image src={item.image} alt={item.title} width={100} height={100}/>
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-center">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}