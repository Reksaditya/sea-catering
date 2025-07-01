'use client'
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import UserCard from '@/components/layout/UserCard';

interface mealPlan {
  id: number;
  name: string;
  price: number;
  Subscription: { id: number }[];
}


function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border p-4 rounded shadow w-full">
      <h2 className="text-md font-semibold">{title}</h2>
      <p className="text-xl">{value}</p>
    </div>
  );
}

export default function AdminDashboardModule() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [mealPlans, setMealPlans] = useState<mealPlan[]>([]);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (!range?.from || !range?.to) return;

    const start = new Date(selectedYear, selectedMonth, 1);
    const end = new Date(selectedYear, selectedMonth + 1, 0);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/metrics?start=${start}&end=${end}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setMetrics(data));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/mealplan`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setMealPlans(data));
  }, [range]);

  return (
    <div className="p-10 flex gap-5 py-10 px-5 md:px-20 lg:px-32">
      <div>
        <UserCard />
      </div>
      <div className='flex flex-col w-full'>
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex flex-col gap-5 ">
          <div className="mt-5">
            <p>Select Month:</p>
            <div className='flex gap-2'>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {[
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ].map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {[2024, 2025, 2026].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {metrics && (
            <div className="flex flex-col gap-5">
              <Card title="Month Recurring Revenue" value={`Rp${(metrics.mrr ?? 0).toLocaleString('id-ID')}`} />
              <div className='flex flex-col md:flex-row gap-2 w-full'>
                <Card title="New Subscriptions" value={metrics.newSubscriptions} />
                <Card title="Reactivations" value={metrics.reactivations} />
              </div>
              <Card title="Active Subscriptions" value={metrics.activeSubscriptions} />
              <div className='w-full flex flex-col gap-2'>
                <label>Meal Plan Avaliable: </label>
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">Meal Plan</th>
                      <th className="p-2 text-left">Price</th>
                      <th className="p-2 text-left">Subscriptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mealPlans.map((mealPlan) => (
                      <tr key={mealPlan.id}>
                        <td className='p-2'>{mealPlan.name}</td>
                        <td className='p-2'>Rp{mealPlan.price.toLocaleString('id-ID')}</td>
                        <td className='p-2'>{mealPlan.Subscription.length ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}