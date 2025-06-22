'use client'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
 

interface PlanProps {
  icon: string;
  name: string;
}

const PlanItem: PlanProps[] = [
  {
    icon: "/subscription-form/svglogo/meat-steak.svg",
    name: "High Protein"
  },
  {
    icon: "/subscription-form/svglogo/carrot.svg",
    name: "Veggie"
  },
  {
    icon: "/subscription-form/svglogo/egg.svg",
    name: "Low Carb"
  },
  {
    icon: "/subscription-form/svglogo/rice-bowl.svg",
    name: "Asian Inspired"
  },
  {
    icon: "/subscription-form/svglogo/wheat.svg",
    name: "Gluten Free"
  },
]

interface DaysProp {
  name: string;
}

const DaysItem: DaysProp[] = [
  {
    name: "Sun",
  },
  {
    name: "Mon",
  },
  {
    name: "Tue",
  },
  {
    name: "Wed",
  },
  {
    name: "Thu",
  },
  {
    name: "Fri",
  },
  {
    name: "Sat",
  },
]

export default function SubscribePage() {
  const { push } = useRouter();

  return (
    <div className="w-full flex flex-col gap-16 items-center px-5 my-10 lg:px-32">
      <h1 className="text-2xl font-bold lg:text-4xl">Make Your Subscription Order</h1>
      <div className="w-full">
        <ol className="list-none text-xl font-bold flex flex-col w-full md:flex-row md:justify-between md:list-decimal lg:text-2xl">
          <li className="max-w-xl">
            <form action=""></form>
            <h3 className="text-xl font-bold md:text-2xl">Personal Information</h3>
            <p className="text-sm font-normal text-gray-700 mt-2">Fill out the form below to make it easier for us to recognize you and get the food to your hands.</p>
            <div className="w-full text-sm flex flex-col gap-3 mt-5">
              <label htmlFor="fullname" >Full Name <span className="text-destructive">*</span></label>
              <Input name="fullname" className="h-12 font-normal" type="text" />
              <label htmlFor="phonenumber">Phone Number <span className="text-destructive">*</span></label>
              <Input name="phonenumber" className="h-12 font-normal" type="number" />
              <label htmlFor="domicile">Domicile <span className="text-destructive">*</span></label>
              <textarea name="domicile" className="h-40 font-normal flex rounded-md px-3 py-3 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" />
            </div> 
          </li>
          <li className="max-w-xl">
            <h3 className="text-2xl font-bold">Customize Your Plan</h3>
            <p className="text-sm font-normal text-gray-700 mt-2">Customize your plan to suit your needs — from portion sizes and meal frequency to dietary preferences and delivery schedule, you're in full control of how your healthy journey begins.</p>
            <div className="w-full text-sm flex flex-col gap-3 mt-5">
              <h5>Plan Selection <span className="text-destructive">*</span></h5>
              <div className="grid grid-cols-3 gap-5">
                {PlanItem.map((item, index) => {
                  return (
                    <Card
                      key={index}
                      className="hover:bg-black/5 shadow-xs cursor-pointer transition duration-200"
                    >
                      <CardContent className="flex flex-col items-center justify-center cursor-pointer gap-2 relative">
                        <CheckCircle className="absolute -top-3 right-2 hidden" />
                        <Image src={item.icon} alt={item.name} width={50} height={50} />
                        <h6>{item.name}</h6>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <div>
                <h5>Meal Type <span className="text-destructive">*</span></h5>
                <p className="text-sm font-normal text-gray-700">At least one meal type must be selected.</p>
              </div>
              <div className="font-normal flex flex-col gap-3">
                <div className="flex gap-2">
                  <Input type="checkbox" className="h-5 w-fit cursor-pointer" value={"Breakfast"} />
                  <label htmlFor="Breakfast">Breakfast</label>
                </div>
                <div className="flex gap-2">
                  <Input type="checkbox" className="h-5 w-fit cursor-pointer" value={"Lunch"} />
                  <label htmlFor="Lunch">Lunch</label>
                </div>
                <div className="flex gap-2">
                  <Input type="checkbox" className="h-5 w-fit cursor-pointer" value={"Dinner"} />
                  <label htmlFor="Dinner">Dinner</label>
                </div>  
                <div className="flex gap-2">
                  <Input type="checkbox" className="h-5 w-fit cursor-pointer" value={"Snack"} />
                  <label htmlFor="Snack">Snack</label>
                </div>
              </div>
              <h5>Delivery Days <span className="text-destructive">*</span></h5>
              <div className="grid grid-cols-7 gap-3">
                {DaysItem.map((item, index) => {
                  return (
                    <Card key={index} className="cursor-pointer">
                      <CardContent className="flex flex-col items-center justify-center cursor-pointer gap-2">
                        <h6>{item.name}</h6>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
              <label>Allergies (Optional)</label>
              <Input className="h-12 font-normal" type="inputbox" />
              <Button 
                onClick={() => {
                  push("/subscription/checkout")
                }}
                className="mt-10 h-12"
              >
                Next
              </Button>
            </div>
          </li>
        </ol>
      </div>
    </div>

  )
}