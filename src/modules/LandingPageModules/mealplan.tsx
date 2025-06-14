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
import { useState } from "react"

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
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  }

  return (
    <section className="w-full flex flex-col items-center text-center gap-14 bg-secondary px-5 py-5 md:px-20 md:py-16 lg:px-32">
      <div className="flex flex-col gap-2">
        <h1 className="uppercase text-2xl leading-10 md:text-4xl font-bold text-white lg:leading-12">
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
        <p className="text-white text-sm md:text-base">Smart nutrition made simple—crafted by experts, designed for real life.</p>
      </div>
      <Carousel>
        <CarouselContent className="ml-0 max-w-80 md:max-w-2xl lg:max-w-[1185px]">
          {mealPlanItem.map((item, index) => {
            return (
              <CarouselItem key={index} className="flex items-center justify-center md:basis-auto">
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
                            onClick={
                              handleOpenModal
                            }
                          >
                            See More Details <ArrowRight className="inline "/> 
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div>
                  { showModal ? (
                      <div className="absolute top-0 left-1/2 translate-y-1/2 flex flex-col items-center justify-center w-32 h-52 bg-white rounded-2xl">
                        <h1>{item.title}</h1>
                        <Button variant={"destructive"} onClick={() => setShowModal(false)}> Close </Button>
                      </div>
                  ) : null }
                </div>  
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="text-primary border-2 border-primary w-10 h-10 hidden lg:flex" />
        <CarouselNext className="text-primary border-2 border-primary w-10 h-10 hidden lg:flex" />
      </Carousel>
      
    </section>
  )
}