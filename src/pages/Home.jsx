import React, { useRef } from "react";
import ShinyText from "../components/ShinyButton";
import Navbar from "../components/Navbar";
import VariableProximity from "../components/HoveronText";
const Home = () => {
  const containerRef = useRef(null);
  return (
    <div className="h-full w-full">
      {/* <div   className="h-screen flex-col items-center w-full"> */}
      <Navbar />
      <div className="flex justify-center items-center h-screen   bg-gray-300">
        <div className="md:w-[45%] w-full ">
          <h1 className="text-6xl">Savor the Essence of Indian Cuisine</h1>
          <p className="md:text-xl text-3xl">
            Welcome to our vibrant Indian-themed café and restaurant, where
            every dish tells a story. Join us to indulge in the rich flavors and
            aromas of authentic Indian cuisine, crafted with love and tradition.
          </p>
          <div
            ref={containerRef}
            style={{ position: "relative" }}
            className="md:text-xl text-3xl"
          >
            <VariableProximity
              label={
                "Welcome to our vibrant Indian-themed café and restaurant, where every dish tells a story. Join us to indulge in the rich flavors and aromas of authentic Indian cuisine, crafted with love and tradition."
              }
              className={"variable-proximity-demo"}
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef}
              radius={100}
              falloff="gaussian"
            />
          </div>

          {/* <ShinyText
            text="Just some shiny text!"
            disabled={false}
            speed={9}
            className="custom-class"
          /> */}

          <button class="cta">
            <span>Hover me</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>

          {/* <button className="bg-blue-500 text-white rounded mt-4 hover:bg-blue-700 transition duration-300">
            <p className="m-5">Explore Now</p>
          </button> */}
        </div>
        <div className="w-[45%] md:flex hidden">
          <img
            className="h-full"
            src="https://t4.ftcdn.net/jpg/02/84/46/89/360_F_284468940_1bg6BwgOfjCnE3W0wkMVMVqddJgtMynE.jpg"
          />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
