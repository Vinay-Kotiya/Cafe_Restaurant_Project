import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Menu from "./pages/Menu";
import Reserve from "./pages/Reserve";

function App() {
  return (
    <>
      <div className="bg-white w-full px-10 flex justify-center items-center  flex-col">
        <Home />
        <Menu />
        <Reserve />
      </div>
    </>
  );
}

export default App;
