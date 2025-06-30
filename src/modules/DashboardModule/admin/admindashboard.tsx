'use client'
import { useState, useEffect } from 'react';
import { formatISO } from 'date-fns';
import { DateRange } from 'react-day-picker';

export default function AdminDashboardModule() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    if (!range?.from || !range?.to) return;

    const start = formatISO(range.from, { representation: 'date' });
    const end = formatISO(range.to, { representation: 'date' });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/metrics?start=${start}&end=${end}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, [range]);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-5">
        <p>Select Date Range:</p>
        {/* Date Picker di sini */}
      </div>

      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          <Card title="New Subscriptions" value={metrics.newSubscriptions} />
          <Card title="MRR" value={`Rp${metrics.mrr.toLocaleString('id-ID')}`} />
          <Card title="Reactivations" value={metrics.reactivations} />
          <Card title="Active Subscriptions" value={metrics.activeSubscriptions} />
        </div>
      )}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-md font-semibold">{title}</h2>
      <p className="text-xl">{value}</p>
    </div>
  );
}