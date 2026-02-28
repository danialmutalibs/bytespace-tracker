"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard");
      const json = await res.json();
      setData(json);
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Manager Dashboard</h1>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">
          Active Employees: {data.totalActive}
        </h2>

        {data.activeEmployees.map((a: any) => (
          <div key={a.id} className="mt-2">
            🟢 {a.employee.name}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Activity Logs</h2>

        {data.logs.map((log: any) => (
          <div key={log.id} className="mt-2 border p-2">
            {log.employee.name} – {new Date(log.checkIn).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}