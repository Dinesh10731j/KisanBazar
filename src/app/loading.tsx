"use client"
import React, { useEffect, useState } from "react";

const Loader = () => {
  const [dots, setDots] = useState(".");
  const [leafs, setLeafs] = useState<{ id: number; left: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeafs((prev) => [
        ...prev.slice(-4),
        { id: Math.random(), left: Math.random() * 100 },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-green-100 overflow-hidden">
      <div className="relative w-20 h-20 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      <span className="mt-4 text-lg font-bold text-green-700">
        Growing fresh produce{dots}
      </span>
      {leafs.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute text-green-600 text-xl"
          style={{
            top: "10%",
            left: `${leaf.left}%`,
            animation: "fall 3s linear forwards",
          }}
        >
          🍃
        </div>
      ))}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
