"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [totalActive, setTotalActive] = useState<number | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status !== "idle") {
      const timer = setTimeout(() => {
        setStatus("idle");
        setMessage("");
        setEmployeeName("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const checkOut = async () => {
    if (!employeeId) return;

    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/activity/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Check-Out Failed");
      } else {
        setStatus("success");
        setMessage(data.message);
        setEmployeeName(data.employeeName);
        setTotalActive(data.totalActive);
      }
    } catch {
      setStatus("error");
      setMessage("System Error");
    }

    setLoading(false);
    setEmployeeId("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-wide">
          BYTE SPACE CHECK-OUT TERMINAL
        </h1>
        <p className="text-gray-600 mt-2">{time}</p>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md text-center">

        <input
          className="border-2 border-gray-300 rounded-lg p-4 w-full text-lg text-center focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />

        <button
          onClick={checkOut}
          disabled={loading}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Tap to Check Out"}
        </button>

        {status !== "idle" && (
          <div
            className={`mt-6 p-6 rounded-lg text-xl font-bold ${
              status === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <div>{message}</div>

            {status === "success" && (
              <div className="mt-2 text-base font-medium">
                Goodbye, {employeeName}
              </div>
            )}
          </div>
        )}
      </div>

      {totalActive !== null && (
        <div className="mt-8 text-lg font-semibold text-gray-700">
          Total Active Staff: {totalActive}
        </div>
      )}

      <p className="mt-6 text-gray-500 text-sm">
        Secure Workforce Monitoring System
      </p>
    </div>
  );
}