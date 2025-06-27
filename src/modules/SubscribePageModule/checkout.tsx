'use client'
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

interface PaymentProps {
  id: string
  icon: string
}

const PaymentItem: PaymentProps[] = [
  {
    id: "gpn",
    icon: "/subscription-form/payment/gpn.png",
  },
  {
    id: "qris",
    icon: "/subscription-form/payment/qris.png",
  },
  {
    id: "visa",
    icon: "/subscription-form/payment/visa.png",
  },
]

export default function CheckoutModule() {
  const [subscriptionData, setSubscriptionData] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('subscriptionData');

    if (data) {
      setSubscriptionData(JSON.parse(data));
    }
  }, [])

  if (!subscriptionData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  const handleCheckout = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...subscriptionData,
          planId: subscriptionData.plan.id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save subscription");
      }

      const result = await res.json();
      console.log("Subscription saved:", result);

      toast.success("Subscription saved successfully");

      setTimeout(() => {
        push("/subscription/success");
      }, 1000);
    } catch (err: any) {
      console.error(err);
      toast.error('failed to save subscription');
    }
  };

  const calculateTotalPrice = () => {
    const planPrice = subscriptionData.plan.price;
    const mealTypesCount = subscriptionData.mealTypes.length;
    const deliveryDaysCount = subscriptionData.deliveryDays.length;

    return planPrice * mealTypesCount * deliveryDaysCount * 4.3;
  };

  return (
    <div className="font-monda">
      <nav className="w-full bg-white shadow-md px-5 md:px-20 lg:px-32 py-3 flex items-center jsutify-center md:justify-between">
        <Image src={"/seacatering-logo/mainlogo.png"} alt="logo" width={150} height={150} />
        <p className="text-primary text-3xl font-semibold hidden md:flex">Checkout</p>
      </nav>
      <div className="flex flex-col justify-center items-center px-5 md:px-20 lg:px-32 py-10 gap-10">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Subscription Checkout</h2>
          <p className="text-gray-700 mt-3 text-sm md:text-baseline">Review your details and get ready for great food, delivered to you.</p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <Card className="w-full md:px-10">
            <CardContent className="flex flex-col gap-5">
              <h4 className="text-lg font-bold text-center">Personal Information</h4>
              <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                <div>
                  <p>{subscriptionData.fullName}</p>
                  <p>{subscriptionData.phoneNumber}</p>
                </div>
                <p className="max-w-80">{subscriptionData.domicile}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full  md:px-10">
            <CardContent>
              <h4 className="text-lg font-bold text-center">Order Detail</h4>
              <div className="flex flex-col gap-2">
                <h5 className="font-bold">Plan:</h5>
                <div className="flex justify-between">
                  <p>{subscriptionData.plan.name}</p>
                  <p>Rp{subscriptionData.plan.price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}</p>
                </div>
                <h5 className="font-bold">Meal Type: </h5>
                <div className="flex justify-between items-center">
                  <p className="max-w-32 md:max-w-none">{subscriptionData.mealTypes.join(", ")}</p>
                </div>
                <h5 className="font-bold">Delivery Days:</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="max-w-32 md:max-w-none">{subscriptionData.deliveryDays.join(", ")}</p>
                  </div>
                </div>
                <h5 className="font-bold">Allergies:</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p>{subscriptionData.allergies}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <h5 className="font-bold">Total:</h5>

                  <p className="font-bold">Rp{calculateTotalPrice().toLocaleString('id-ID', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:px-10">
            <CardContent>
              <h4 className="text-lg font-bold">Payment Method</h4>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                {PaymentItem.map((item, index) => (
                  <label htmlFor="payment" key={index} className="relative flex justify-center items-center bg-white border border-gray-200 rounded-lg cursor-pointer p-5 min-h-40">
                    <Image src={item.icon} alt="logo" width={150} height={150} />
                    <input
                      className="absolute w-5 h-5 top-2 left-2"
                      name="payment"
                      type="radio"
                      onChange={() => setPaymentMethod(item.icon)}
                    />
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button
            variant={"default"}
            className="w-full h-12"
            onClick={handleCheckout}
          >
            {loading ? (
              <>
                <span className="loader border-white border-2 border-t-transparent w-5 h-5 rounded-full mr-2 animate-spin"></span>
                Processing...
              </>
            ) : (
              "Checkout"
            )}
          </Button>

          <Button
            variant={"outline"}
            className="w-full h-12"
            onClick={() => {
              localStorage.setItem("subscriptionData", JSON.stringify(subscriptionData))
              push("/subscription")
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}