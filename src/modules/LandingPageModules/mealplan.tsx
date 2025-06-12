'use client'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface mealPlanProps {
  image: string;
  title: string;
  description: string;
  price: string;
}

const mealPlanItem: mealPlanProps[] = [
  {
    image: '/plan1.jpg',
    title: 'High-Protein',
    description: 'Supports muscle maintenance, heart health, and sustained energy.',
    price: 'Rp40.000,00'
  },
  {
    image: '/plan2.jpg',
    title: 'Vegetarian',
    description: 'Promotes gut health, helps with digestion, and lowers cholesterol.',
    price: 'Rp20.000,00'
  },
  {
    image: '/plan3.jpg',
    title: 'Low-Carb',
    description: 'Helps regulate blood sugar, manage weight, and support cardiovascular function.',
    price: 'Rp30.000,00'
  },
  {
    image: '/plan4.jpg',
    title: 'Asian-Inspired',
    description: 'Reduces inflammation, supports immunity, and improves digestion.',
    price: 'Rp20.000,00'
  },
  {
    image: '/plan5.jpg',
    title: 'Balanced',
    description: 'Easy-to-make meals that provide balance and nutrition without much cooking.',
    price: 'Rp40.000,00'
  },
  {
    image: '/plan6.jpg',
    title: 'Gluten-Free',
    description: 'Supports people with gluten sensitivity and boosts energy naturally.',
    price: 'Rp30.000,00'
  },
]

export default function MealPlanModule() {
  return (
    <section className="w-full px-32 py-16 flex flex-col items-center text-center gap-9 bg-[var(--secondary)]">
      <div>
        <h1 className="uppercase text-4xl font-bold text-white leading-12">
          Good
          <span className="text-[var(--primary)]"> Plan </span>
          Good
          <span className="text-[var(--primary)]"> Diet </span>
          <br />
          <span className="text-[var(--primary)]"> Select </span>
          Your
          <span className="text-[var(--primary)]"> Plan </span>
          Now!
        </h1>
      </div>
      <Carousel>
        <CarouselContent className="ml-0 lg:max-w-[1185px]">
          {mealPlanItem.map((item, index) => {
            return (
              <CarouselItem key={index} className="flex items-center justify-center basis-auto">
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
                  <div className="bg-black/50 inset-0 rounded-2xl flex h-full transition-all duration-500">
                    <Card className="bg-transparent border-none shadow-none text-left">                   
                      <CardContent className="flex flex-col justify-between h-full">
                        <div>
                          <h2 className="text-4xl font-bold text-white mb-2">{item.title}</h2>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                        <div>
                          <p className="text-lg text-white font-sans pb-2">{item.price}/meal</p>
                          <Button
                            variant={"default"}
                          >
                            See More Details <ArrowRight className="inline "/> 
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="text-primary border-2 border-primary w-10 h-10" />
        <CarouselNext className="text-primary border-2 border-primary w-10 h-10" />
      </Carousel>
    </section>
  )
}