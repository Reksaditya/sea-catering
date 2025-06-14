import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TestimonialProps {
  profile: string,
  name: string,
  star: number,
  date: string,
  comment: string,
}

const testimonialItem: TestimonialProps[] = [
  {
    profile: '/dummyicon.png',
    name: 'Mulyono',
    star: 5,
    date: '10 Jun 2025',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.'
  },
  {
    profile: '/dummyicon.png',
    name: 'Sarijem',
    star: 4,
    date: '30 April 2025',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.'
  },
  {
    profile: '/dummyicon.png',
    name: 'Gibran072',
    star: 4,
    date: '20 May 2024',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.'
  },
  {
    profile: '/dummyicon.png',
    name: 'Bowo31',
    star: 5,
    date: '14 Feb 2024',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.'
  },
  {
    profile: '/dummyicon.png',
    name: 'Joko',
    star: 3,
    date: '1 Feb 2024',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.'
  },
  {
    profile: '/dummyicon.png',
    name: 'Dode',
    star: 5,
    date: '18 Okt 2023',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut purus volutpat, vehicula felis a, lobortis turpis. Maecenas non viverra purus. Duis id eros pharetra, placerat dolor sed, posuere felis. Nulla condimentum nec erat nec tempor. '
  },
]

export default function TestimonialModule() {
  return (
    <section className="flex flex-col gap-14 justify-center items-center px-5 py-10 md:px-20 md:py-16 lg:px-32 ">
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold uppercase text-center text-3xl md:text-4xl ">What Do <span className="text-primary ">People</span> Say <span className="text-primary">About Us</span></h1>
        <p className="text-gray-700 text-sm lg:text-base text-center">Real stories from people who’ve made the switch to effortless, nourishing meals—delivered right to their door.</p>
      </div>
      <Carousel className="h-full max-w-80 md:max-w-2xl lg:max-w-none">
        <CarouselContent>
          {testimonialItem.map((item, index) => {
            return (
              <CarouselItem key={index} className="max-w-80 md:basis-auto ">
                <Card className="min-h-36 max-h-56">
                  <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <Image src={item.profile} alt="profile" width={50} height={50} className="rounded-full" />
                      <div>
                        <h1 className="font-bold text-xl">{item.name}</h1>
                        <div  className="relative">
                          <div className="flex">
                            {Array.from({ length: 5 }, () => (
                              <Star fill="#111" strokeWidth={0} key={Math.random()} />
                            ))}
                          </div>
                          <div className="absolute top-0 flex">
                            {Array.from({ length: item.star }, () => (
                                <Star fill="yellow" strokeWidth={0} key={Math.random()} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="max-h-[75px] overflow-scroll">{item.comment}</p>
                    <div className="flex justify-between">
                      <p className="text-xs text-gray-400 hover:underline cursor-pointer">Show Original</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
      <Button variant="default" className="w-60 h-14">
        See More Testimonial
      </Button>
    </section>
  )
}