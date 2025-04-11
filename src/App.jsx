import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="bg-white w-full px-10 flex justify-center items-center h-screen flex-col">
        <Home />
      </div>
    </>
  );
}

export default App;
