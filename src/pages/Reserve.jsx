import React from "react";
import ReservationForm from "../components/ReservationForm";
import ImageTrail from "../ReactBits/ImageTrail/ImageTrail";
import menuData from "../data/menu.json";
import ScrollFloat from "../ReactBits/ScrollFloat/ScrollFloat";

const Reserve = () => {
  const ImageObject = menuData.map((item) => {
    return item.image;
  });
  return (
    <div
      id="reserve"
      className="relative h-screen w-full bg-gray-300 flex items-center"
    >
      {/* ImageTrail rendered as full-screen fixed background */}

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col md:flex-row w-full h-full">
        <div className="md:h-full w-full md:w-[50%] flex flex-col justify-center  items-center px-4">
          <div className="flex top-0 left-0 w-full h-full absolute overflow-hidden z-0">
            <ImageTrail
              key="reservation-trail"
              className="z-[9999] h-2"
              items={ImageObject}
              variant={4}
            />
          </div>
          <h2 className="text-6xl font-bold  text-center">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Reserve Your Table
            </ScrollFloat>
          </h2>
          {/* <h2 className="text-6xl font-bold text-center">Reserve Your Table</h2> */}
          <p className="text-gray-600 text-xl text-center mt-2">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Planning a visit? Reserve your spot in just a few clicks. We’ll
              make sure your table is ready!
            </ScrollFloat>
          </p>
          <img
            className="max-w-[80%] mt-4 hidden md:flex"
            src={
              "https://cdni.iconscout.com/illustration/premium/thumb/family-eating-indian-food-together-on-table-illustration-download-in-svg-png-gif-file-formats--dine-dinner-pack-drink-illustrations-7694557.png?f=webp"
            }
          />
        </div>

        <div className="h-full  md:w-[50%] flex items-center justify-center px-4">
          <ReservationForm className=" z-50" />
        </div>
      </div>
    </div>
  );
};

export default Reserve;
