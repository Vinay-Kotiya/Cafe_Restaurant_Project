import React, { useEffect } from "react";
import ReservationForm from "../components/ReservationForm";
import ImageTrail from "../ReactBits/ImageTrail/ImageTrail";
import menuData from "../data/menu.json";
import Magnet from "../ReactBits/Magnet/Magnet";
import TextPressure from "../ReactBits/TextPressure/TextPressure";

import ScrollFloat from "../ReactBits/ScrollFloat/ScrollFloat";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const Reserve = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);
  const ImageObject = menuData.map((item) => {
    return item.image;
  });
  return (
    <div
      id="reserve"
      className="relative md:h-screen p-3  w-full bg-gray-300 flex items-center"
    >
      {/* ImageTrail rendered as full-screen fixed background */}

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        <div className=" w-full md:w-[50%] flex flex-col justify-center  items-center px-4">
          <div className="flex top-0 left-0  w-full h-full absolute overflow-hidden ">
            <ImageTrail
              key="reservation-trail"
              className="z-10 h-2"
              items={ImageObject}
              variant={4}
            />
          </div>
          <Magnet padding={100} disabled={false} magnetStrength={5}>
            <div
              // style={{ position: "relative", height: "300px" }}
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              <TextPressure
                text={"Reserve Your Table Today!"}
                flex={false}
                alpha={false}
                stroke={true}
                width={true}
                weight={true}
                italic={true}
                textColor="#ffffff"
                strokeColor="#000"
                minFontSize={36}
              />
            </div>

            <p className="text-lg md:text-xl text-center font-light drop-shadow-lg">
              Planning a visit? Reserve your spot in just a few clicks. We’ll
              make sure your table is ready!
            </p>
          </Magnet>

          {/* <h2 className="text-6xl font-bold text-center z-10 relative">
            Reserve Your Table Today!
          </h2>

          <p className="text-gray-600 text-xl text-center mt-2 z-10 relative">
            Planning a visit? Reserve your spot in just a few clicks. We’ll make
            sure your table is ready!
          </p> */}

          <img
            className="max-w-[80%] mt-4 hidden md:flex"
            src={
              "https://cdni.iconscout.com/illustration/premium/thumb/family-eating-indian-food-together-on-table-illustration-download-in-svg-png-gif-file-formats--dine-dinner-pack-drink-illustrations-7694557.png?f=webp"
            }
          />
        </div>

        <div className="md:h-full h-screen md:w-[50%] flex items-center justify-center">
          <ReservationForm className=" z-50" />
        </div>
      </div>
    </div>
  );
};

export default Reserve;
