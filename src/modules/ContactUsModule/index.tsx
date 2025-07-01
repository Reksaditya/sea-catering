import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ContactUsModule() {
  return (
    <div className="flex flex-col py-10 px-5 md:px-20 lg:px-32">
      <Card>
        <CardContent className="flex flex-col gap-5 ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Get <span className="text-primary">in</span> Touch
            </CardTitle>
            <CardDescription className="text-sm">
              We would love to hear from you
            </CardDescription>
          </CardHeader>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="md:w-1/2 flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <Input className="h-12" />
              </div>
              <div className="md:w-1/2 flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <Input className="h-12" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input className="h-12" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message">Message</label>
              <Input className="h-40" />
            </div>
            <Button className="h-12">Submit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}