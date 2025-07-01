'use client';
import UserCard from "@/components/layout/UserCard";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { set } from "date-fns";
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Subscription {
  id: number;
  user: {
    name: string;
    email: string;
  };
  plan: {
    name: string;
    price: number;
  };
  status: string;
  endDate: string;
  createdAt: string;
}

export default function UserSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isAllSelected = subscriptions.length > 0 && selectedIds.length === subscriptions.length;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/subscriptions`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setSubscriptions(data))
  }, [])

  const handleCheckboxChange = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(subscriptions.map(sub => sub.id));
    }
  };

  const handleDelete = async () => {
    await Promise.all(
      selectedIds.map(id =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      )
    );
    setSubscriptions(subscriptions.filter(sub => !selectedIds.includes(sub.id)));
    setSelectedIds([]);
    window.location.reload();
  };

  return (
    <div className="p-10 flex gap-5 py-10 px-5 md:px-20 lg:px-32">
      <div>
        <UserCard />
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-4xl font-bold">Manage User Subscriptions</h1>
        <div className="flex flex-col gap-2">
          <div className="flex justify-end gap-2">
            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <DialogTrigger asChild>
                <Button
                  variant={"destructive"}
                  disabled={selectedIds.length === 0}
                >
                  <Trash className="mr-2" />
                  Delete Selected
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure you want to delete these subscriptions?</DialogTitle>
                </DialogHeader>
                <DialogDescription>This action will permanently delete the selected subscriptions</DialogDescription>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant={"outline"}
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"destructive"}
                    onClick={handleDelete}
                    disabled={selectedIds.length === 0}
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-2 text-left">User</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Plan</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Created</th>
                  <th className="p-2 text-left">End Date</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id} className="border-t">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(sub.id)}
                        onChange={() => handleCheckboxChange(sub.id)}
                      />
                    </td>
                    <td className="p-2">{sub.user.name}</td>
                    <td className="p-2">{sub.user.email}</td>
                    <td className="p-2">{sub.plan.name}</td>
                    <td className="p-2">Rp{sub.plan.price.toLocaleString('id-ID')}</td>
                    <td className="p-2">{sub.status}</td>
                    <td className="p-2">{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(sub.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}