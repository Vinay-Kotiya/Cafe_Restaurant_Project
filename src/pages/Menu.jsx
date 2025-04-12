import React from "react";
import menuData from "../data/menu.json";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  return (
    <div>
      <h1 className="text-4xl m-2 ">Menu</h1>
      <p className="text-gray-500">Explore our offerings</p>
      <div className="h-full bg-white flex justify-center items-center flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {menuData.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
