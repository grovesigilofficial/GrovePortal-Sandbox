"use client";

import { useState, useEffect } from "react";

export default function UbermanTimer() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h2>Uberman Clock</h2>
      <p>{time}</p>
    </div>
  );
}
