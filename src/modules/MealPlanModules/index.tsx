'use client'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation";

interface mealPlanProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

const mealPlanItem: mealPlanProps[] = [
  {
    image: './meal-plan-section/meal-plan-image/plan1.jpg',
    title: 'High-Protein',
    description: 'Supports muscle maintenance, heart health, and sustained energy.',
    link: '/protein'
  },
  {
    image: './meal-plan-section/meal-plan-image/plan2.jpg',
    title: 'Vegetarian',
    description: 'Promotes gut health, helps with digestion, and lowers cholesterol.',
    link: '/vegetarian'
  },
  {
    image: './meal-plan-section/meal-plan-image/plan3.jpg',
    title: 'Low-Carb',
    description: 'Helps regulate blood sugar, manage weight, and support cardiovascular function.',
    link: '/lowcarb'
  },
  {
    image: './meal-plan-section/meal-plan-image/plan4.jpg',
    title: 'Asian-Inspired',
    description: 'Reduces inflammation, supports immunity, and improves digestion.',
    link: '/asian'
  },
  {
    image: './meal-plan-section/meal-plan-image/plan5.jpg',
    title: 'Gluten-Free',
    description: 'Supports people with gluten sensitivity and boosts energy naturally.',
    link: '/glutenfree'
  },
]

export default function MealPlanSection() {
  const { push } = useRouter();

  return (
    <section className="bg-secondary w-full flex flex-col items-center text-center px-5 py-5 md:px-20 md:py-16 lg:px-32 gap-10">
      <div className="text-white">
        <h1 className="font-bold text-3xl md:text-4xl uppercase mt-10">Choose a plan <br /> <span className="text-primary">that fits</span> your <span className="text-primary">lifestyle</span></h1>
        <h2 className="text-sm md:text-lg mt-3">Smart planning made simple — crafted by experts, designed for real life</h2>
      </div>
      <div className="grid grid-cols-3 items-center text-center gap-14">
        {mealPlanItem.map((item, index) => {
          return (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 25,
                duration: 0.8, 
                delay: index * 0.2 
              }}
              key={index}
              className="hover:scale-105 transition-all duration-500 cursor-pointer"
            >
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  width: '345px',
                  borderRadius: '16px',
                  imageResolution: '300dpi',
                }}
              >
                <div 
                  className="bg-black/50 inset-0 rounded-2xl flex h-full transition-all duration-200 hover:bg-primary"
                  onClick={() => push(item.link)}
                >
                  <Card className="bg-transparent border-none shadow-none text-left">
                    <CardContent className="flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-4xl font-bold text-white mb-2">{item.title}</h2>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}