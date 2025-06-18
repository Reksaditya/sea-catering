'use client'
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface PaymentProps {
  icon: string
}

const PaymentItem: PaymentProps[] = [
  {
    icon: "/subscription-form/payment/gpn.png",
  },
  {
    icon: "/subscription-form/payment/qris.png",
  },
  {
    icon: "/subscription-form/payment/visa.png",
  },
]

export default function CheckoutModule() {
  const { push } = useRouter();

  return (
    <div className="font-monda">
      <nav className="w-full bg-white shadow-md px-32 py-3 flex items-center justify-between">
        <Image src={"/seacatering-logo/mainlogo.png"} alt="logo" width={150} height={150} />
        <p className="text-primary text-3xl font-semibold"> Checkout</p>
      </nav>
      <div className="flex flex-col justify-center items-center px-32 py-10 gap-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Product Checkout</h2>
          <p className="text-gray-700 mt-3">Review your details and get ready for great food, delivered to you.</p>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <Card className="w-full px-10">
            <CardContent className="flex flex-col gap-5">
              <h4 className="text-lg font-bold text-center">Personal Information</h4>
              <div className="flex justify-between">
                <div>
                  <p>Dewa Gede Reksa Parama Aditya</p>
                  <p>+62 8123456789</p>
                </div>
                <p>Jl. Truck-kun No.1, Isekai, Dunia Anime</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full px-10">
            <CardContent>
              <h4 className="text-lg font-bold text-center">Order Detail</h4>
              <div className="flex flex-col gap-2">
                <h5 className="font-bold">Plan:</h5>
                <div className="flex justify-between">
                  <p>High Protein</p>
                  <p>Rp40.000,00</p>
                </div>
                <h5 className="font-bold">Meal Type: </h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Breakfast</p>
                    <p>Lunch</p>
                  </div>
                  <p>2 Types</p>
                </div>
                <h5 className="font-bold">Delivery Days:</h5>
                <div className="flex justify-between items-center">
                  <div>
                    <p>Monday</p>
                    <p>Tuesday</p>
                    <p>Wednesday</p>
                    <p>Thursday</p>
                  </div>
                  <p>4 Days</p>
                </div>
                <div className="flex justify-between">
                  <h5 className="font-bold">Total:</h5>
                  <p className="font-bold">Rp1.376.000,00</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full px-10">
            <CardContent>
              <h4 className="text-lg font-bold">Payment Method</h4>
              <div className="flex gap-5 mt-5">
                {PaymentItem.map((item, index) => (
                  <Card key={index} className="flex justify-center items-center">
                    <CardContent>
                      <Image src={item.icon} alt="logo" width={150} height={150} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button 
            variant={"default"} 
            className="w-full h-12"
          >
            Checkout
          </Button>

          <Button 
            variant={"outline"} 
            className="w-full h-12" 
            onClick={() => push("/subscription")}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}