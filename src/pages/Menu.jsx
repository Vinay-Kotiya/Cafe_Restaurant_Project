import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import menuData from "../data/menu.json";
import CircularGallery from "../ReactBits/CircularGallery/CircularGallery";
import TextPressure from "../ReactBits/TextPressure/TextPressure";
import ScrollVelocity from "../ReactBits/ScrollVelocity/ScrollVelocity";
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [filteredMenu, setFilteredMenu] = useState([]);

  const categories = ["All", ...new Set(menuData.map((item) => item.category))];

  useEffect(() => {
    setFilteredMenu(
      category === "All"
        ? menuData
        : menuData.filter((item) => item.category === category)
    );
  }, [category]);
  const [visibleCount, setVisibleCount] = useState(6);

  const showMore = () => {
    setVisibleCount((prev) => prev + 6);
  };
  // console.log(menuData);
  const itemsDetails = menuData.map((item) => {
    return { image: item.image, text: item.name };
  });
  // console.log(itemsDetails);

  return (
    <div
      id="menu"
      className=" w-full h-screen overflow-hidden bg-gray-300 flex justify-center items-center flex-col"
    >
      <h1 className="text-4xl  m-2 ">
        <TextPressure
          text={"MENU"}
          flex={true}
          alpha={false}
          stroke={true}
          width={false}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#000"
          minFontSize={36}
        />
      </h1>

      <p className="text-gray-500">Explore our offerings</p>
      <div className="h-full w-full relative">
        <CircularGallery
          items={itemsDetails}
          bend={1}
          textColor="#000"
          borderRadius={0.05}
        />
      </div>
      <ScrollVelocity
        texts={["* ANNAPURNA", "* INDIAN CUISINE"]}
        velocity={100}
        className="custom-scroll-text"
      />

      {/* <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4 overflow-x-auto md:overflow-x-visible pb-2 mb-6 border-b">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full border transition-all duration-200 ${
              category === cat ? "bg-black text-white" : "bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

    
      <div className="grid grid-cols-1 bg-gray-200 p-4 rounded-2xl  sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredMenu.slice(0, visibleCount).map((item, index) => (
          <motion.div
            key={item.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            whileHover="hover" // triggers animation on entire card hover
            className="bg-white rounded-xl shadow-md overflow-hidden relative group transition-all duration-300 hover:shadow-xl"
          >
          
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />

             
              <motion.div
                variants={{
                  hover: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 },
                }}
                initial="hidden"
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 text-sm opacity-0 group-hover:opacity-100"
              >
                {item.description}
              </motion.div>
            </div>

            <div className="p-4">
              <div className="flex justify-between font-semibold text-lg">
                <h3>{item.name}</h3>
                <span>₹{item.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}
      {/* {visibleCount < filteredMenu.length && (
        <div className="text-center mt-8">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition duration-300"
          >
            Show More
          </button>
        </div>
      )} */}
    </div>
  );
}
