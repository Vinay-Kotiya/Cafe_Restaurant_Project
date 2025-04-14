import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import OptionSelector from "./OptionSelector";
import QuantitySelector from "./QuantitySelector";
import PreviewSummary from "./PreviewSummary";
import React from "react";

export default function CustomizeModal({ item, isOpen, onClose, onAddToCart }) {
  if (!item) return null;

  const [options, setOptions] = useState({
    spice: "Medium",
    toppings: [],
    sides: [],
    quantity: 1,
  });

  const basePrice = item.price;
  const extraPrice = calculateExtraPrice(options);
  const totalPrice = (basePrice + extraPrice) * options.quantity;

  function handleOptionChange(type, value) {
    setOptions((prev) => ({ ...prev, [type]: value }));
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-20">
      <Dialog.Panel as={motion.div} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-xl space-y-5">
        <h2 className="text-xl font-bold">Customize Your {item.name}</h2>

        <OptionSelector
          label="Spice Level"
          type="radio"
          name="spice"
          options={["Mild", "Medium", "Hot"]}
          selected={options.spice}
          onChange={(val) => handleOptionChange("spice", val)}
        />

        <OptionSelector
          label="Toppings"
          type="checkbox"
          name="toppings"
          options={["Olives", "Mushrooms", "Extra Cheese"]}
          selected={options.toppings}
          onChange={(val) => handleOptionChange("toppings", val)}
        />

        <OptionSelector
          label="Sides"
          type="checkbox"
          name="sides"
          options={["Fries", "Garlic Bread", "Soda"]}
          selected={options.sides}
          onChange={(val) => handleOptionChange("sides", val)}
        />

        <QuantitySelector
          value={options.quantity}
          onChange={(val) => handleOptionChange("quantity", val)}
        />

        <PreviewSummary options={options} price={totalPrice} />

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="text-gray-500">Cancel</button>
          <button
            onClick={() => onAddToCart({ ...item, customization: options, price: totalPrice })}
            className="bg-red-500 text-white px-4 py-2 rounded-xl"
          >
            Add to Cart • ₹{totalPrice.toFixed(2)}
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

function calculateExtraPrice(options) {
  const toppingPrice = 0.5;
  const sidePrice = 1.5;
  return options.toppings.length * toppingPrice + options.sides.length * sidePrice;
}
