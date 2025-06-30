'use client'
import UserCard from "@/components/layout/UserCard";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { id as localeId } from 'date-fns/locale';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Subscription {
  id: number;
  createdAt: string;
  fullName: string;
  phoneNumber: string;
  domicile: string;
  plan: {
    name: string;
    price: number;
  };
  mealTypes: string[];
  deliveryDays: string[];
  totalPrice: number;
  allergies?: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired';
  startDate: string;
  endDate: string;
  pauseFrom?: string | null;
  pauseUntil?: string | null;
}

const navTabs = [
  'All Subscription',
  'Active Subscription',
  'Paused Subscription',
  'Cancelled Subscription',
  'Expired Subscription',
];

const allMealTypes = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snack'
]

const allDeliveryDays = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
]

const PlanIconMap: Record<string, string> = {
  "High Protein": "/subscription-form/svglogo/meat-steak.svg",
  "Vegetarian": "/subscription-form/svglogo/carrot.svg",
  "Low Carb": "/subscription-form/svglogo/egg.svg",
  "Asian Inspired": "/subscription-form/svglogo/rice-bowl.svg",
  "Gluten Free": "/subscription-form/svglogo/wheat.svg",
};

export default function MySubscriptionModule() {
  const [activeTab, setActiveTab] = useState('All Subscription');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [showPauseDialogId, setShowPauseDialogId] = useState<number | null>(null);
  const [showResumeDialogId, setShowResumeDialogId] = useState<number | null>(null);
  const [showCancelDialogId, setShowCancelDialogId] = useState<number | null>(null);
  const [showDeleteDialogId, setShowDeleteDialogId] = useState<number | null>(null);
  const [showEditDialogId, setShowEditDialogId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Subscription>>({});
  const [from, setFrom] = useState('');
  const [until, setUntil] = useState('');
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

  const handlePause = async (id: number, from: string, until: string) => {
    if (!from || !until) return toast.error("Please set both pause dates");
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/pause/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pauseFrom: from, pauseUntil: until }),
    });
    toast.success("Subscription paused");
    setShowPauseDialogId(null);
    window.location.reload();
  };

  const handleResume = async (id: number) => {
    const token = localStorage.getItem('token');

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/resume/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    window.location.reload();
  }

  const handleCancel = async (id: number) => {
    console.log(id);
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/cancel/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Subscription cancelled");
    setShowCancelDialogId(null);
    window.location.reload();
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Subscription deleted");
    window.location.reload();
  }

  const handleEdit = async (id: number, updatedData: Partial<Subscription>) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    if (res.ok) {
      toast.success("Subscription updated");
      window.location.reload();
    } else {
      toast.error("Failed to update subscription");
    }
  };


  const filteredSubscriptions = subscriptions.filter((sub) => {
    if (activeTab === 'All Subscription') return true;
    if (activeTab === 'Active Subscription') return sub.status === 'active';
    if (activeTab === 'Paused Subscription') return sub.status === 'paused';
    if (activeTab === 'Cancelled Subscription') return sub.status === 'cancelled';
    if (activeTab === 'Expired Subscription') return sub.status === 'expired';
    return true;
  });

  const calculateTotal = (sub: Subscription): number => {
    const planPrice = sub.plan.price;
    const mealTypesCount = sub.mealTypes.length;
    const deliveryDaysCount = sub.deliveryDays.length;

    return planPrice * mealTypesCount * deliveryDaysCount * 4.3;
  }

  return (
    <div className="flex flex-col lg:flex-row py-10 px-5 md:px-20 lg:px-32 gap-5">
      <div>
        <UserCard />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <h1 className="font-bold text-2xl md:text-4xl">Manage Subscription</h1>
        <div className="flex flex-col gap-5">
          <Card>
            <CardContent>
              <nav className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {navTabs.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(title)}
                    className={`hover:underline transition-all ${activeTab === title ? 'underline text-primary font-semibold' : 'text-black'
                      }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
          <div className='w-full flex flex-col gap-3'>
            {filteredSubscriptions.length === 0 && (
              <div className='flex flex-col gap-3'>
                <p className="text-center text-lg">No subscriptions found for "{activeTab}".</p>
                <Button
                  variant="outline"
                  onClick={() => push('/subscription')}
                  className={`${activeTab === 'Active Subscription' ? 'flex' : 'hidden'}`}
                >
                  Make a new subscription
                </Button>
              </div>
            )}
            {filteredSubscriptions.map((sub) => (
              <Card key={sub.id} className="border p-5">
                <CardContent className="flex flex-col gap-3">
                  <div className='flex gap-3 items-center'>
                    <Image
                      src={PlanIconMap[sub.plan.name]}
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
                  <div className='grid grid-cols-3 gap-3 lg:grid-cols-7 text-center'>
                    {sub.deliveryDays.map((day, index) => (
                      <Card key={index} className='bg-primary text-white flex justify-center items-center'>
                        <CardContent>
                          <p>{day}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p>Total Price: Rp{calculateTotal(sub).toLocaleString('id-ID')}</p>
                  {sub.pauseFrom && sub.pauseUntil && (
                    <p className="text-sm text-yellow-600">Paused from {format(new Date(sub.pauseFrom), 'dd MMM yyyy')} to {format(new Date(sub.pauseUntil), 'dd MMM yyyy')}</p>
                  )}
                  <div>
                    <p className={`text-sm font-semibold ${sub.status === 'active' ? 'text-green-600' : sub.status === 'paused' ? 'text-yellow-600' : sub.status === 'cancelled' || 'expired' ? 'text-red-600' : 'text-gray-600'}`}>{sub.status}</p>
                    <p className="text-sm text-gray-500">
                      Created at {format(new Date(sub.createdAt), "dd MMMM yyyy", { locale: localeId })}
                    </p>
                    <p className="text-sm text-gray-500">Active until {format(new Date(sub.endDate), "dd MMMM yyyy", { locale: localeId })}</p>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex gap-2 mt-3">
                      <Dialog
                        open={showEditDialogId === sub.id}
                        onOpenChange={(open) => setShowEditDialogId(open ? sub.id : null)}
                      >
                        <DialogTrigger
                          asChild
                          className={`${sub.status === 'active' ? 'flex' : 'hidden'}`}
                        >
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowEditDialogId(sub.id)
                              setEditData({
                                fullName: sub.fullName,
                                phoneNumber: sub.phoneNumber,
                                domicile: sub.domicile,
                                mealTypes: sub.mealTypes,
                                deliveryDays: sub.deliveryDays,
                                allergies: sub.allergies || '',
                              });
                            }}
                          ><Pen />Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="min-w-lg md:min-w-2xl lg:min-w-4xl flex flex-col gap-3">
                          <DialogHeader>
                            <DialogTitle>Edit Subscription</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            Select data to edit:
                          </DialogDescription>
                          <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex flex-col gap-5 lg:w-1/2">
                              <div className="flex flex-col gap-2">
                                <label htmlFor="fullName">Full Name</label>
                                <Input name="fullName" type="text" placeholder="Full Name" value={editData.fullName} onChange={(e: any) => setEditData({ ...editData, fullName: e.target.value })} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <Input name="phoneNumber" type="text" placeholder="Phone Number" value={editData.phoneNumber} onChange={(e: any) => setEditData({ ...editData, phoneNumber: e.target.value })} />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label htmlFor="domicile">Domicile</label>
                                <textarea 
                                  name="domicile" 
                                  placeholder="Domicile" 
                                  value={editData.domicile} 
                                  onChange={(e: any) => setEditData({ ...editData, domicile: e.target.value })}
                                  className="lg:h-40 font-normal flex rounded-md px-3 py-3 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 border bg-transparent text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label>Meal Plan</label>
                                <Card>
                                  <CardContent className="flex items-center gap-2">
                                    <Image
                                      src={PlanIconMap[sub.plan.name]}
                                      alt="Plan Icon"
                                      width={30}
                                      height={30}
                                    />
                                    <p>{sub.plan.name}</p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            <div className="flex flex-col gap-5 lg:w-1/2">
                              <div className="flex flex-col gap-2">
                                <label>Meal Types</label>
                                <div className="grid grid-cols-4 lg:grid-cols-2 gap-2">
                                  {allMealTypes.map((type, index) => {
                                    const isSelected = editData.mealTypes?.includes(type);
                                    return (
                                      <Card
                                        key={index}
                                        className={isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-black'}
                                        onClick={() => {
                                          const updatedMealTypes = isSelected
                                            ? editData.mealTypes?.filter((m) => m !== type)
                                            : [...(editData.mealTypes || []), type];
                                          setEditData({ ...editData, mealTypes: updatedMealTypes });
                                        }}
                                      >
                                        <CardContent className="flex items-center justify-center cursor-pointer">
                                          <p>{type}</p>
                                        </CardContent>
                                      </Card>
                                    );
                                  })}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <label>Delivery Days</label>
                                <div className="grid grid-cols-7 lg:grid-cols-4 gap-2">
                                  {allDeliveryDays.map((day, index) => {
                                    const isSelected = editData.deliveryDays?.includes(day);
                                    return (
                                      <Card
                                        key={index}
                                        className={isSelected ? 'bg-primary text-white' : 'bg-gray-200 text-black'}
                                        onClick={() => {
                                          const updatedDeliveryDays = isSelected
                                            ? editData.deliveryDays?.filter((d) => d !== day)
                                            : [...(editData.deliveryDays || []), day];
                                          setEditData({ ...editData, deliveryDays: updatedDeliveryDays });
                                        }}
                                      >
                                        <CardContent className="flex items-center justify-center cursor-pointer">
                                          <p>{day}</p>
                                        </CardContent>
                                      </Card>
                                    )
                                  })}
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <label htmlFor="allergies">Allergies</label>
                                <Input name="allergies" type="text" placeholder="Allergies" value={editData.allergies} onChange={(e: any) => setEditData({ ...editData, allergies: e.target.value })} />
                              </div>
                            </div>
                          </div>
                          <DialogDescription>
                            You will get a refund according to the number of remaining subscription days if you reduce the number of days and meal types you choose. But you need to pay again if you want to add days and meal types.
                          </DialogDescription>
                          <div className="flex justify-end gap-3 pt-2">
                            <Button variant="destructive" onClick={() => setShowEditDialogId(null)}>Cancel</Button>
                            <Button onClick={() => handleEdit(sub.id, editData)}>Confirm</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={showResumeDialogId === sub.id} onOpenChange={(open) => setShowResumeDialogId(open ? sub.id : null)}>
                        <DialogTrigger asChild className={`${sub.status === 'paused' ? 'flex' : 'hidden'}`}>
                          <Button variant="outline" onClick={() => setShowResumeDialogId(sub.id)}>Resume</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Resume Subscription</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel this subscription?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-3 pt-2">
                            <Button variant="ghost" onClick={() => setShowResumeDialogId(null)}>Cancel</Button>
                            <Button onClick={() => handleResume(sub.id)}>Confirm</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={showPauseDialogId === sub.id} onOpenChange={(open) => setShowPauseDialogId(open ? sub.id : null)}>
                        <DialogTrigger asChild className={`${sub.status === 'paused' ? 'hidden' : 'flex'}`}>
                          <Button variant="outline" onClick={() => setShowPauseDialogId(sub.id)}>Pause</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Pause Subscription</DialogTitle>
                            <DialogDescription>
                              Please select the period for pause:
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex flex-col gap-3">
                            <label className="text-sm">Pause From</label>
                            <input
                              type="datetime-local"
                              value={from}
                              onChange={(e) => setFrom(e.target.value)}
                              className="border px-3 py-2 rounded"
                            />
                            <label className="text-sm">Pause Until</label>
                            <input
                              type="datetime-local"
                              value={until}
                              onChange={(e) => setUntil(e.target.value)}
                              className="border px-3 py-2 rounded"
                            />
                            <div className="flex justify-end gap-3 pt-2">
                              <Button variant="ghost" onClick={() => setShowPauseDialogId(null)}>Cancel</Button>
                              <Button onClick={() => handlePause(sub.id, from, until)}>Confirm</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={showCancelDialogId === sub.id} onOpenChange={(open) => setShowCancelDialogId(open ? sub.id : null)}>
                        <DialogTrigger asChild>
                          <Button variant="destructive" onClick={() => setShowCancelDialogId(sub.id)} className={`${sub.status === 'cancelled' ? 'hidden' : 'flex'}`}>Cancel</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Cancel Subscription</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to cancel your subscription? <br /> Money will be refunded according to the remaining subscription time.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setShowCancelDialogId(null)}>No, Keep it</Button>
                            <Button variant="destructive" onClick={() => handleCancel(sub.id)}>Yes, Cancel</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={showDeleteDialogId === sub.id} onOpenChange={(open) => setShowDeleteDialogId(open ? sub.id : null)}>
                        <DialogTrigger asChild>
                          <Button variant="destructive" onClick={() => setShowDeleteDialogId(sub.id)} className={`${sub.status === 'cancelled' ? 'flex' : 'hidden'}`}>Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Subscription</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this subscription?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex justify-end gap-3 pt-4">
                            <Button variant="ghost" onClick={() => setShowDeleteDialogId(null)}>No, Keep it</Button>
                            <Button variant="destructive" onClick={() => handleDelete(sub.id)}>Yes, Delete</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}