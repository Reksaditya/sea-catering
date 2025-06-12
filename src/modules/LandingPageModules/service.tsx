'use client'
import { Card, CardContent } from "@/components/ui/card";
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
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section className="bg-white h-[420px] w-full px-32 z-20 flex flex-col items-center">
      <motion.div className="flex justify-between items-center w-full h-full">
        {ServicesItems.map((item, index) => (
          <motion.div
            ref={ref}
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={ inView ? {  opacity: 1, y: 0 } : {}}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center gap-10 justify-center"
          >
            <div>
              <Card key={index}>
                <CardContent className="flex flex-col items-center max-w-72 min-h-60 gap-2">
                  <Image src={item.image} alt={item.title} width={100} height={100}/>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-center text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}