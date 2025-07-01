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

interface modalPlanProps {
  name: string;
  modalImage: string;
  goodFor: string[];
  whatIncludes: string[];
}

const modalPlanItem: modalPlanProps[] = [
  {
    name: 'High Protein',
    modalImage: './meal-plan-section/modal-popup/protein.jpg',
    goodFor: [
      'Active individuals',
      'People looking to reduce inflammation',
      'Those who enjoy a Mediterranean diet.',
    ],
    whatIncludes: [
      'Breakfast: Greek yogurt',
      'Lunch: Grilled chicken salad',
      'Snack: Handful of almonds + green apple',
      'Dinner: Baked salmon, roasted sweet potatoes, and steamed broccoli',
    ],
  },
  {
    name: 'Vegetarian',
    modalImage: './meal-plan-section/modal-popup/vegetarian.png',
    goodFor: [
      'Vegetarians',
      'People with high cholesterol',
      'Anyone wanting more plant-based meals',
    ],
    whatIncludes: [
      'Breakfast: Oatmeal topped',
      'Lunch: Chickpea and spinach curry',
      'Snack: Carrot sticks',
      'Dinner: Lentil soup with whole-grain toast and a side salad'
    ],
  },
  {
    name: 'Low Carb',
    modalImage: './meal-plan-section/modal-popup/lowcarb.jpeg',
    goodFor: [
      'People with insulin resistance',
      'Type 2 diabetes',
      'Those on a low-carb diet'
    ],
    whatIncludes: [
      'Breakfast: Scrambled eggs',
      'Lunch: Grilled turkey lettuce wraps',
      'Snack: Greek yogurt with walnuts',
      'Dinner: Zucchini noodles with pesto and grilled shrimp'
    ],
  },
  {
    name: 'Asian Inspired',
    modalImage: './meal-plan-section/modal-popup/asianinspired.jpg',
    goodFor: [
      'People with joint pain',
      'Autoimmune concerns',
      'Skin issues',
    ],
    whatIncludes: [
      'Breakfast: Fruit smoothie with spinach and almond milk',
      'Lunch: Miso soup with tofu, seaweed, and brown rice on the side',
      'Snack: Edamame sprinkled with sea salt',
      'Dinner: Stir-fried vegetables',
    ],
  },
  {
    name: 'Gluten Free',
    modalImage: './meal-plan-section/modal-popup/glutenfree.jpg',
    goodFor: [
      'Those with celiac disease',
      'Gluten intolerance',
      'Low energy levels'
    ],
    whatIncludes: [
      'Breakfast: Chia pudding made with coconut milk and berries',
      'Lunch: Quinoa bowl with black beans, corn, avocado, and lime dressing',
      'Snack: Rice cakes with almond butter',
      'Dinner: Grilled steak with roasted Brussels sprouts and mashed cauliflower'
    ],
  },
]

export default function MealPlanModule() {
  const { push } = useRouter();
  const [mealPlan, setMealPlan] = useState<mealPlanProps[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<mealPlanProps | null>(null);

  useEffect(() => {
    getMealPlans().then(setMealPlan).catch(console.error);
  })

  const currency = (price: number) => {
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
      <div>
        {showModal && selectedItem && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-2xl overflow-y-auto max-h-[90vh] w-[90%] md:w-[700px] p-6 relative">
              <Cross onClick={() => setShowModal(false)} className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:opacity-85" />
              <div>
                <h1 className="font-bold text-2xl mb-2">{selectedItem.name} Plan</h1>
                <p className="text-sm mb-4">{selectedItem.description}</p>
              </div>
              {showModal && selectedItem && (() => {
                const modalData = modalPlanItem.find(item => item.name === selectedItem.name);
                if (!modalData) return null;
                return (
                  <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
                    <div className="bg-white rounded-2xl overflow-y-auto max-h-[90vh] w-[90%] md:w-[700px] p-6 relative text-left">
                      <Cross onClick={() => setShowModal(false)} className="absolute top-4 right-4 cursor-pointer rotate-45 text-gray-400 hover:opacity-85" />
                      <div>
                        <h1 className="font-bold text-2xl mb-2">{selectedItem.name} Plan</h1>
                        <p className="text-sm mb-4">{selectedItem.description}</p>
                      </div>
                      <img src={modalData.modalImage} alt={selectedItem.name} className="rounded w-full h-64 object-cover mb-4" />
                      <h2 className="font-semibold text-lg mb-2">Good For:</h2>
                      <ul className="list-disc pl-5 mb-4 text-sm">
                        {modalData.goodFor.map((text, i) => <li key={i}>{text}</li>)}
                      </ul>
                      <h2 className="font-semibold text-lg mb-2">What's Included:</h2>
                      <ul className="list-disc pl-5 mb-4 text-sm">
                        {modalData.whatIncludes.map((text, i) => <li key={i}>{text}</li>)}
                      </ul>
                      <p className="font-bold text-center text-xl mb-4">{currency(selectedItem.price)}/meal</p>
                      <div className="flex justify-center gap-3">
                        <Button variant="default" onClick={() => push("/subscription")}>Plan Now</Button>
                        <Button variant="destructive" onClick={() => setShowModal(false)}>Close</Button>
                      </div>
                    </div>
                  </div>
                )})()}
              <p className="font-bold text-center text-xl mb-4">{currency(selectedItem.price)}/meal</p>
              <div className="flex justify-center gap-3">
                <Button variant="default" onClick={() => push("/subscription")}>Plan Now</Button>
                <Button variant="destructive" onClick={() => setShowModal(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}