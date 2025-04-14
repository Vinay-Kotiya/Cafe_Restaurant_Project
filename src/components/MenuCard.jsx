import React from "react";
import { motion } from "framer-motion";

const MenuCard = ({ item, index }) => {
  return (
    <motion.div
      custom={index}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />

        {/* Description overlay triggered on group hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0, y: 20 }}
          whileHover="show"
          variants={{
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: "easeOut" },
            },
          }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <p className="text-lg px-4 text-center">{item.description}</p>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{item.name}</h2>
          <span className="text-green-600 font-bold">₹{item.price}</span>
        </div>

        {/* Category Badge */}
        <span className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
};

export default MenuCard;
