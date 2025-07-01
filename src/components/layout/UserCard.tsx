'use client';
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Home, TicketCheck } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: string;
};

export default function UserCard() {
  const { push } = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user data");
      }
    }
  }, []);

  const handleLogout = () => {
    toast.loading("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.dismiss();
      toast.success("Successfully logged out!");
      push("/auth/signin");
    }, 1000);
  };

  return (
    <div>
      <Card className="min-w-80">
        <CardContent className="flex flex-col items-center gap-8 px-10 py-5">
          <Image src={user?.imageUrl || "/seacatering-logo/mainlogo.png"} alt="user" width={100} height={100} />
          <div className="flex flex-col items-center gap-2">
            <Image src="/dummyicon.png" alt="user" width={100} height={100} className="border-2 border-gray-500 rounded-full" />
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <div className="flex flex-col gap-7 w-full">
            <div className="flex gap-2 font-semibold">
              <Home />
              <a href={`${user?.role === 'admin' ? '/dashboard/admin' : '/dashboard'}`}>Home</a>
            </div>
            <div className="flex gap-2 font-semibold">
              <TicketCheck />
              <a href={`${user?.role === 'admin' ? '/dashboard/admin/usersubscriptions' : '/dashboard/mysubscription'}`}>{user?.role === 'admin' ? 'User Subscriptions' : 'My Subscription'}</a>
            </div>
          </div>
          <Button
            variant={"destructive"}
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}