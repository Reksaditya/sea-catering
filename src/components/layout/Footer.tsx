import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Footer() {
  return (
    <footer className="bg-secondary w-full px-5 py-10 md:px-20 md:py-16 lg:px-32 lg:h-80">
      <div className="justify-between h-full text-white hidden md:flex md:flex-col lg:flex-row gap-10">
        <div className="h-full lg:gap-20 md:justify-between md:flex">
          <div>
            <h3 className="font-bold">SEA Catering</h3>
            <div className="flex flex-col gap-2 mt-4 text-sm cursor-pointer">
              <p>Home</p>
              <p>Meal Plans</p>
              <p>Subscription</p>
              <p>Contact Us</p>
              <p>Blog</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Help Center</h3>
            <p className="text-sm mt-4">Help Center and FAQ</p>
          </div>
          <div>
            <h3 className="font-bold">Work With Us</h3>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <p>Partner</p>
              <p>Influencer</p>
              <p>Affiliate</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold">Legal</h3>
            <div className="flex flex-col gap-2 mt-4 text-sm">
              <p>Terms and Conditions</p>
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="gap-5 flex">
          <Instagram />
          <Facebook />
          <Linkedin />
          <Mail />
        </div>
      </div>
      <h3 className="text-sm text-white text-center hidden md:flex mt-5">© 2025 SEA Catering. All Right Reserved.</h3>

      <Accordion
        type="single"
        collapsible
        className="w-full md:hidden text-white"
      >
        <div className="flex gap-5">
          <Instagram />
          <Facebook />
          <Linkedin />
          <Mail />
        </div>
        <AccordionItem value="item-1">
          <AccordionTrigger>SEA Catering</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Home</p>
            <p>Meal Plans</p>
            <p>Subscription</p>
            <p>Contact Us</p>
            <p>Blog</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Help Center</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Help Center and FAQ</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Work With Us</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Partner</p>
            <p>Influencer</p>
            <p>Affiliate</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Legal</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
          </AccordionContent>
        </AccordionItem>
        <h3 className="text-sm mt-10 text-white text-center">© 2025 SEA Catering. All Right Reserved.</h3>
      </Accordion>
    </footer >
  )
}