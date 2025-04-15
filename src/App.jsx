import React from "react";

import "./App.css";
import Home from "./pages/Home";

import Menu from "./pages/Menu";
import Reserve from "./pages/Reserve";
import useSmoothScroll from "./components/SmoothScroll";
import VirtualTour from "./pages/VirtualTour";
import Customize from "./pages/Customize";

import CircularText from "./ReactBits/CircularText/CircularText";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  useSmoothScroll();
  return (
    <>
      <div className="h-10 absolute hidden md:flex  z-50 right-15 md:right-30 bottom-0 ">
        <CircularText
          text="AUTHENTIC*INDIAN*FLAVORS*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class text-black  "
        />
      </div>

      <div className="bg-white w-full md:px-0 flex justify-center items-center  flex-col">
        <Home />
        <Menu />
        <Reserve />
        <Customize />
        <VirtualTour />
        <About />
        <Footer />
      </div>
    </>
  );
}

export default App;
