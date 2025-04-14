import { Import } from "lucide-react";

import React from "react";
export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold">Quantity</span>
      <button onClick={() => onChange(Math.max(1, value - 1))} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
      <span>{value}</span>
      <button onClick={() => onChange(value + 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
    </div>
  );
}
