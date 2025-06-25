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
import { ArrowRight, Cross } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import { scroller } from 'react-scroll'
import { getMealPlans } from '@/lib/api';

interface mealPlanProps {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
}

// interface mealPlanProps {
//   modalImage: string;
//   goodFor: string[];
//   whatIncludes: string[];
// }

// const mealPlanItem: mealPlanProps[] = [
//   {
//     image: './meal-plan-section/meal-plan-image/plan1.jpg',
//     modalImage: './meal-plan-section/modal-popup/protein.jpg',
//     title: 'High-Protein',
//     description: 'Supports muscle maintenance, heart health, and sustained energy.',
//     goodFor: [
//       'Active individuals',
//       'People looking to reduce inflammation',
//       'Those who enjoy a Mediterranean diet.',
//     ],
//     whatIncludes: [
//       'Breakfast: Greek yogurt',
//       'Lunch: Grilled chicken salad',
//       'Snack: Handful of almonds + green apple',
//       'Dinner: Baked salmon, roasted sweet potatoes, and steamed broccoli',
//     ],
//     price: 'Rp40.000,00'
//   },
//   {
//     image: './meal-plan-section/meal-plan-image/plan2.jpg',
//     modalImage: './meal-plan-section/modal-popup/vegetarian.png',
//     title: 'Vegetarian',
//     description: 'Promotes gut health, helps with digestion, and lowers cholesterol.',
//     goodFor: [
//       'Vegetarians',
//       'People with high cholesterol',
//       'Anyone wanting more plant-based meals',
//     ],
//     whatIncludes: [
//       'Breakfast: Oatmeal topped',
//       'Lunch: Chickpea and spinach curry',
//       'Snack: Carrot sticks',
//       'Dinner: Lentil soup with whole-grain toast and a side salad'
//     ],
//     price: 'Rp20.000,00'
//   },
//   {
//     image: './meal-plan-section/meal-plan-image/plan3.jpg',
//     modalImage: './meal-plan-section/modal-popup/lowcarb.jpeg',
//     title: 'Low-Carb',
//     description: 'Helps regulate blood sugar, manage weight, and support cardiovascular function.',
//     goodFor: [
//       'People with insulin resistance',
//       'Type 2 diabetes',
//       'Those on a low-carb diet'
//     ],
//     whatIncludes: [
//       'Breakfast: Scrambled eggs',
//       'Lunch: Grilled turkey lettuce wraps',
//       'Snack: Greek yogurt with walnuts',
//       'Dinner: Zucchini noodles with pesto and grilled shrimp'
//     ],
//     price: 'Rp30.000,00'
//   },
//   {
//     modalImage: './meal-plan-section/modal-popup/asianinspired.jpg',
//     goodFor: [
//       'People with joint pain',
//       'Autoimmune concerns',
//       'Skin issues',
//     ],
//     whatIncludes: [
//       'Breakfast: Fruit smoothie with spinach and almond milk',
//       'Lunch: Miso soup with tofu, seaweed, and brown rice on the side',
//       'Snack: Edamame sprinkled with sea salt',
//       'Dinner: Stir-fried vegetables',
//     ],
//     price: 'Rp25.000,00'
//   },
//   {
//     modalImage: './meal-plan-section/modal-popup/glutenfree.jpg',
//     goodFor: [
//       'Those with celiac disease',
//       'Gluten intolerance',
//       'Low energy levels'
//     ],
//     whatIncludes: [
//       'Breakfast: Chia pudding made with coconut milk and berries',
//       'Lunch: Quinoa bowl with black beans, corn, avocado, and lime dressing',
//       'Snack: Rice cakes with almond butter',
//       'Dinner: Grilled steak with roasted Brussels sprouts and mashed cauliflower'
//     ],
//     price: 'Rp30.000,00'
//   },
// ]

export default function MealPlanModule() {
  const { push } = useRouter();
  const [mealPlan, setMealPlan] = useState<mealPlanProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<mealPlanProps | null>(null);

  useEffect(() => {
    getMealPlans().then(setMealPlan).catch(console.error);
  })

  const currency = (price:number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(price);
} 

  const handleOpenModal = (item: mealPlanProps) => {
    setSelectedItem(item);
    setShowModal(true);
  }

  return (
    <section id="mealplansection" className="w-full flex flex-col items-center text-center gap-14 bg-secondary px-5 py-5 md:px-20 md:py-16 lg:px-32 relative">
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
          {mealPlan.map(plan => {
            return (
              <CarouselItem key={plan.id} className="flex items-center justify-center md:basis-auto">
                {plan.imageUrl && (
                  <div
                    style={{
                      backgroundImage: `url(${plan.imageUrl})`,
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
                            <h2 className="text-4xl font-bold text-white mb-2">{plan.name}</h2>
                            <p className="text-gray-300">{plan.description}</p>
                          </div>
                          <div>
                            <p className="text-lg text-white font-sans pb-2">{currency(plan.price)}/meal</p>
                            <Button
                              variant={"default"}
                              onClick={() => {
                                scroller.scrollTo('mealplansection', {
                                  duration: 800,
                                  smooth: true,
                                })
                                handleOpenModal(plan)
                              }}
                            >
                              See More Details <ArrowRight className="inline" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious className="text-primary border-2 border-primary w-10 h-10 hidden lg:flex" />
        <CarouselNext className="text-primary border-2 border-primary w-10 h-10 hidden lg:flex" />
      </Carousel>
      {/* <div>
        {showModal && selectedItem && (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 flex flex-col bg-white rounded-2xl max-h-3/4 overflow-y-scroll gap-5 text-left min-w-80 px-5 py-16 md:min-w-xl md:px-10 lg:px-20 lg:min-w-none">
            <Cross onClick={() => setShowModal(false)} className="absolute top-5 right-5 rotate-45 cursor-pointer text-gray-400 font-extralight hover:opacity-85" />
            <div>
              <h1 className="font-bold text-xl md:text-2xl">{selectedItem.title} Plan</h1>
              <p className="max-w-[500px] pt-2 text-sm md:text-base">{selectedItem.description}</p>
            </div>
            <img src={selectedItem.modalImage} alt={selectedItem.title} width={500} height={500} className="self-center" />
            <div>
              <h2 className="font-bold text-lg md:text-xl">Good for:</h2>
              <ul className="list-disc ml-5 text-xs md:text-base md:leading-10">
                {selectedItem.goodFor.map((criteria, index) =>
                  <li key={index}>{criteria}</li>
                )}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-lg md:text-xl">What's included</h2>
              <ul className="list-disc ml-5 text-xs md:text-base md:leading-10">
                {selectedItem.whatIncludes.map((item, index) =>
                  <li key={index}>{item}</li>
                )}
              </ul>
            </div>
            <p className="font-bold text-center text-xl md:text-2xl">{selectedItem.price}/meal</p>
            <div className="flex flex-col justify-center gap-2">
              <Button variant={"default"} onClick={() => push("/subscription")} className="md:h-16"> Plan Now </Button>
              <Button variant={"destructive"} onClick={() => setShowModal(false)}> Close </Button>
            </div>
          </div>
        )}
      </div> */}

    </section>
  )
}