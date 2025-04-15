// components/Loader.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Howl } from "howler";
import logo from "../assets/Annapurna_logo.png"; // make sure you have a logo image or SVG
import Particles from "../ReactBits/Particles/Particles";
const Loader = ({ onFinish }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const handleUserInteraction = () => {
      const welcomeSound = new Howl({
        src: ["/assets/backgroundAudio.mp3"],
        volume: 0.8,
      });
      welcomeSound.play();
      window.removeEventListener("click", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction);

    // ...your loading counter and GSAP logic

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    // Count animation
    let interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 99) {
          clearInterval(interval);
          setTimeout(() => {
            onFinish();
          }, 1000);
        }
        return prev + 1;
      });
    }, 20);

    // GSAP welcome text
    gsap.fromTo(
      ".welcome-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.5 }
    );

    return () => clearInterval(interval);
  }, []);

  // Particle animation JSX
  const renderParticles = () => {
    return Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white opacity-20 animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${3 + Math.random() * 5}s`,
          animationDelay: `${Math.random()}s`,
        }}
      />
    ));
  };

  return (
    <div className="h-full w-full relative">
      <motion.div
        key="loader"
        className="fixed inset-0 z-50 flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#000] to-[#21333e] text-white"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Logo"
          className="w-30 h-40 mb-4 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "backOut" }}
        />
        {/* Welcome Text */}
        <motion.div
          className="text-3xl md:text-4xl md:w-1/2  text-center font-bold welcome-text z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          "Welcome to Annapurna Restaurant – Serving Pure Veg Indian
          Delights..." Get ready to taste tradition with a modern twist!
        </motion.div>
        {/* Loading Counter */}
        <motion.div
          className="mt-6 text-2xl font-bold md:text-3xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {count}%
        </motion.div>
        {/* Spinner */}
        <motion.div
          className="mt-10 w-20 h-20 border-[5px] border-white border-dotted rounded-full animate-spin z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => handleUserInteraction}
          transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
        >
          <img src="https://www.svgrepo.com/show/146567/audio-disc-with-white-details.svg" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loader;
