'use client'
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import UserCard from '@/components/layout/UserCard';
import toast from 'react-hot-toast';
import { id as localeId } from 'date-fns/locale';
import Image from 'next/image';

interface Subscription {
  id: string;
  createdAt: string;
  plan: {
    name: string;
    price: number;
  };
  mealTypes: string[];
  deliveryDays: string[];
  totalPrice: number;
  status: 'active' | 'paused' | 'cancelled';
  pausedFrom?: string | null;
  pausedUntil?: string | null;
}

const PlanIconMap: Record<string, string> = {
  "High Protein": "/subscription-form/svglogo/meat-steak.svg",
  "Vegetarian": "/subscription-form/svglogo/carrot.svg",
  "Low Carb": "/subscription-form/svglogo/egg.svg",
  "Asian Inspired": "/subscription-form/svglogo/rice-bowl.svg",
  "Gluten Free": "/subscription-form/svglogo/wheat.svg",
};

export default function UserDashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return push('/auth/signin');

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSubscriptions(data);
        } else {
          console.error('Unexpected data format:', data);
          toast.error("Failed to load subscriptions");
          setSubscriptions([]);
        }
      })
      .catch(err => {
        console.error('Failed to load subscriptions', err);
        toast.error("Error to load subscriptions");
      });
  }, []);

  return (
    <div className="px-5 py-10 md:px-20 lg:px-32 flex flex-col lg:flex-row gap-6">
      <div>
        <UserCard />
      </div>
      <div className='w-full flex flex-col gap-5'>
        <h1 className="text-2xl md:text-4xl font-bold">My Active Subscriptions</h1>
        {subscriptions.length === 0 && (
          <div className='flex flex-col gap-3'>
            <p>No active subscriptions found.</p>
            <Button
              variant={'outline'}
              onClick={() => { push('/subscription') }}
            >
              Make a new subscription
            </Button>
          </div>
        )}
        {subscriptions.map((sub) => (
          <Card key={sub.id} className="border p-5">
            <CardContent className="flex flex-col gap-3">
              <div className='flex gap-3 items-center'>
                <Image
                  src={PlanIconMap[sub.plan.name] || '/default-icon.svg'}
                  alt="Plan Icon"
                  width={30}
                  height={30}
                />
                <h2 className="text-2xl font-semibold">{sub.plan.name}</h2>
              </div>
              <h3 className='font-semibold'>Meal Types: </h3>
              <div>
                {sub.mealTypes.map((mealType, index) => (
                  <Card key={index} className="bg-primary text-white">
                    <CardContent>
                      <p>{mealType}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <h3 className='font-semibold'>Delivery Days: </h3>
              <div className='grid grid-cols-3 lg:grid-cols-7 gap-2 text-center'>
                {sub.deliveryDays.map((day, index) => (
                  <Card key={index} className='bg-primary text-white'>
                    <CardContent>
                      <p>{day}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Created at {format(new Date(sub.createdAt), "dd MMMM yyyy", { locale: localeId })}
              </p>
              <div className="flex gap-2 mt-3">
                <Button variant="outline" onClick={() => push(`/dashboard/mysubscription`)}>See more</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
