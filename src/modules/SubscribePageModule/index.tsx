'use client'
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divide } from "lucide-react";


interface FormData {
  fullName: string;
  phoneNumber: string;
  domicile: string;
  planId: number;
  mealTypes: string[];
  deliveryDays: string[];
  allergies: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
}

interface PlanIconProps {
  icon: string;
  iconWhite: string;
}

const PlanIconItem: PlanIconProps[] = [
  {
    icon: "/subscription-form/svglogo/meat-steak.svg",
    iconWhite: "/subscription-form/svglogo/meat-steak-white.svg"
  },
  {
    icon: "/subscription-form/svglogo/carrot.svg",
    iconWhite: "/subscription-form/svglogo/carrot-white.svg"
  },
  {
    icon: "/subscription-form/svglogo/egg.svg",
    iconWhite: "/subscription-form/svglogo/egg-white.svg"
  },
  {
    icon: "/subscription-form/svglogo/rice-bowl.svg",
    iconWhite: "/subscription-form/svglogo/rice-bowl-white.svg"
  },
  {
    icon: "/subscription-form/svglogo/wheat.svg",
    iconWhite: "/subscription-form/svglogo/wheat-white.svg"
  },
]

export default function SubscribePage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phoneNumber: "",
    domicile: "",
    planId: 0,
    mealTypes: [],
    deliveryDays: [],
    allergies: "",
  });
  const [plans, setPlans] = useState<Plan[]>([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const { push } = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/mealplan`)
      .then(res => res.json())
      .then(setPlans)
  }, [])

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: String(e.target.value)
    })
  }

  const handleMultiSelect = (name: "mealTypes" | "deliveryDays", value: string) => {
    setFormData((prev) => {
      const current = new Set(prev[name]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }

      return {
        ...prev,
        [name]: Array.from(current),
      };
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (plans.length === 0) {
      alert("Plans is not available yet, please try again later.");
      return;
    }

    const selectedPlan = plans.find((p) => p.id === formData.planId);

    const subscriptionData = {
      ...formData,
      plan: selectedPlan,
    };

    localStorage.setItem("subscriptionData", JSON.stringify(subscriptionData));

    push("/subscription/checkout");
  };

  return (
    <div className="w-full flex flex-col gap-12 items-center px-5 my-10 md:gap-16 lg:px-32">
      <h1 className="text-2xl font-bold lg:text-4xl">Make Your Subscription Order</h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="w-full text-sm flex flex-col gap-3 mt-5">
          <ol className="list-none text-xl font-bold flex flex-col w-full items-center justify-center lg:flex-row lg:justify-between md:list-decimal md:text-2xl lg:items-baseline gap-10">
            <li className="max-w-xl">
              <h3 className="text-xl font-bold md:text-2xl">Personal Information</h3>
              <p className="text-sm font-normal text-gray-700 mt-2">Fill out the form below to make it easier for us to recognize you and get the food to your hands.</p>
              <div className="flex flex-col gap-3 mt-5 text-lg">
                <label htmlFor="fullName" >Full Name <span className="text-destructive">*</span></label>
                <Input name="fullName" className="h-12 font-normal" type="text" onChange={handleChange} required />
                <label htmlFor="phoneNumber">Phone Number <span className="text-destructive">*</span></label>
                <Input name="phoneNumber" className="h-12 font-normal" type="text" onChange={handleChange} required />
                <label htmlFor="domicile">Domicile <span className="text-destructive">*</span></label>
                <textarea name="domicile" className="h-40 font-normal flex rounded-md px-3 py-3 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive" onChange={handleChange} required />
              </div>
            </li>
            <li className="max-w-xl">
              <h3 className="text-2xl font-bold">Customize Your Plan</h3>
              <p className="text-sm font-normal text-gray-700 mt-2">Customize your plan to suit your needs — from portion sizes and meal frequency to dietary preferences and delivery schedule, you're in full control of how your healthy journey begins.</p>
              <div className="flex flex-col gap-3 mt-5 text-lg">
                <h5>Plan Selection <span className="text-destructive">*</span></h5>
                <div className="grid grid-cols-3 gap-5">
                  {plans.map((plan: any, index: number) => (
                    <label
                      key={plan.id}
                      className={`border border-gray-200 rounded-lg cursor-pointer py-5 flex flex-col items-center gap-2 text-center transition-all text-xs md:text-sm ${formData.planId === Number(plan.id) ? "checked-box bg-primary text-white" : "bg-white"}`}
                    >
                      <Image
                        src={
                          formData.planId === Number(plan.id)
                            ? PlanIconItem[index % PlanIconItem.length].iconWhite
                            : PlanIconItem[index % PlanIconItem.length].icon
                        }
                        alt="icon"
                        width={60}
                        height={60}
                        className="scale-90 md:scale-100"
                      />

                      <input
                        type="radio"
                        name="planId"
                        value={plan.id}
                        checked={formData.planId === Number(plan.id)}
                        onChange={(e) =>
                          setFormData({ ...formData, planId: Number(e.target.value) })
                        }
                        className="hidden"
                        required
                      />
                      {plan.name}
                    </label>
                  ))}
                </div>
                <div>
                  <label>Meal Type <span className="text-destructive">*</span></label>
                  <p className="text-sm font-normal text-gray-700">At least one meal type must be selected.</p>
                </div>
                <div className="font-normal flex flex-col gap-3">
                  {["Breakfast", "Lunch", "Dinner", "Snack"].map((type) => (
                    <label key={type} className="cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        name="mealType"
                        value={type}
                        onChange={() => handleMultiSelect("mealTypes", type)}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
                <h5>Delivery Days <span className="text-destructive">*</span></h5>
                <div className="grid grid-cols-4 gap-3 md:grid-cols-7">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <label
                      key={day}
                      className={`flex items-center justify-center border border-gray-300 rounded-md px-2 py-5 shadow-xs cursor-pointer transition-all text-xs md:text-sm ${formData.deliveryDays.includes(day) ? "checked-box bg-primary text-white" : "bg-white"}`}
                    >
                      <input
                        type="checkbox"
                        name="deliveryDays"
                        value={day}
                        checked={formData.deliveryDays.includes(day)}
                        onChange={() => handleMultiSelect("deliveryDays", day)}
                        className="appearance-none"
                      />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>

                <label htmlFor="allergies">Allergies (Optional)</label>
                <Input name="allergies" className="h-12 font-normal" type="inputbox" onChange={(e) => setFormData({ ...formData, allergies: e.target.value })} />
              </div>
              <Button
                type="submit"
                variant={"default"}
                className="mt-10 h-12 w-full"
              >
                {plans.length === 0 ? "Loading Plans..." : "Next"}
              </Button>
            </li>
          </ol>
        </form>
      </div>
    </div >
  )
}