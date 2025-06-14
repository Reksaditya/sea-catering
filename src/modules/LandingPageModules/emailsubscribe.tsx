import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";


export default function EmailSubscribeModule() {
  return (
    <section className="w-full flex flex-col items-center text-center px-5 py-10 md:px-20 md:py-16 lg:px-32 ">
      <div>
        <h1 className="uppercase font-bold text-3xl md:text-4xl">Not <span className="text-primary">Hungry</span> Yet?</h1>
        <p className="text-gray-700 pt-3">Get special offers, meals, and news when you subscribe to our newsletter.</p>
      </div>
      <div className="w-full flex justify-center items-center mt-10">
        <Input className="w-1/2 lg:w-1/4 h-12" />
        <Button className="ml-2 h-12">Sign Up</Button>
      </div>
    </section>
  )
  
}