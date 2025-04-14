import React from "react";
export default function PreviewSummary({ options, price }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-bold mb-2">Preview</h4>
      <p><strong>Spice:</strong> {options.spice}</p>
      <p><strong>Toppings:</strong> {options.toppings.join(", ") || "None"}</p>
      <p><strong>Sides:</strong> {options.sides.join(", ") || "None"}</p>
      <p><strong>Quantity:</strong> {options.quantity}</p>
      <p className="mt-2 font-semibold text-lg text-red-600">Total: ₹{price.toFixed(2)}</p>
    </div>
  );
}
