import React, { useEffect, useState } from "react";
import menuData from "../data/menu.json";
import CircularGallery from "../ReactBits/CircularGallery/CircularGallery";
import TextPressure from "../ReactBits/TextPressure/TextPressure";
import ScrollVelocity from "../ReactBits/ScrollVelocity/ScrollVelocity";
import Magnet from "../ReactBits/Magnet/Magnet";
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
      className=" w-full md:h-screen h-screen overflow-hidden bg-gray-300 flex justify-center items-center flex-col"
    >
      <Magnet padding={100} disabled={false} magnetStrength={5}>
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
      </Magnet>
      <Magnet padding={100} disabled={false} magnetStrength={5}>
        <p className="text-gray-500">Explore our offerings</p>
      </Magnet>

      <div className="h-full w-full relative">
        <CircularGallery
          items={itemsDetails}
          bend={0.5}
          textColor="#000"
          borderRadius={0.05}
        />
      </div>
      <ScrollVelocity
        texts={["* ANNAPURNA", "* INDIAN CUISINE"]}
        velocity={100}
        className="custom-scroll-text font-mono"
      />
    </div>
  );
}
