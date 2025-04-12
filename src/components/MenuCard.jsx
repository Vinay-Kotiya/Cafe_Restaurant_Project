import React from "react";

const MenuCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <span className="text-green-600 font-bold">₹{item.price}</span>
        </div>
        <p className="text-gray-600 text-sm">{item.description}</p>
        <span className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
    </div>
  );
};

export default MenuCard;
