import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import Aurora from "../Aurora/Aurora";
const IMGS = [
  "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const gallerySections = [
  {
    title: "Welcome to Annapurna",
    text: `Welcome to Annapurna – where every meal is a celebration of tradition, taste, and togetherness.\nWe serve more than just food – we serve memories crafted with love and authenticity.`,
  },
  {
    title: "Our Story",
    text: `Born from a deep love for Indian culture and cuisine, Annapurna was inspired by the goddess of nourishment herself.\nOur journey began with a simple idea: to bring wholesome, vegetarian food to your table just like it’s made at home.`,
  },
  {
    title: "The Taste of Tradition",
    text: `At Annapurna, our dishes reflect the heart of India’s rich culinary heritage.\nWe use fresh, locally sourced ingredients and traditional techniques—clay ovens, tandoors, and secret family spices.`,
  },
  {
    title: "The Annapurna Experience",
    text: `Step into a cozy, family-friendly space where tradition meets modern elegance.\nFrom our interactive menu to virtual dining tours, everything is designed to make you feel right at home.`,
  },
  {
    title: "Our Values",
    text: `We are committed to purity, hygiene, and hospitality.\nSustainability is at our core—we use biodegradable packaging and support local farmers whenever we can.`,
  },
  {
    title: "Visit Us / Join the Family",
    text: `Come taste the tradition! Reserve your table now, explore our seasonal menu, or experience a virtual tour online.\nAnnapurna isn’t just a restaurant—it’s a feeling.`,
  },
];

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : IMGS;
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  // const cylinderWidth = isScreenSizeSm ? 1600 : 2800;

  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  // const radius = cylinderWidth / (2 * Math.PI);
  const radius = (cylinderWidth / (2 * Math.PI)) * 1.3; // or 1.5 for more spacing

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative gap-10 h-[550px] overflow-hidden">
      <div
        className="absolute top-0 left-0 h-full  z-10"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />
      <div
        className="absolute top-0 right-0 h-full  z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #060606 100%)",
        }}
      />

      <div className="flex h-full items-center justify-center [perspective:1000px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-full  cursor-grab items-center justify-center [transform-style:preserve-3d]"
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="group absolute h-full border-1 border-white  flex flex-col items-center justify-center  [backface-visibility:hidden] transition-all duration-300 hover:scale-105 hover:w-[400px] hover:h-[300px] rounded-xl overflow-hidden shadow-lg"
              style={{
                width: `${faceWidth * 0.9}px`,
                height: "250px",
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
                // backgroundImage: `url(${url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="bg-black bg-opacity-50 z-50 w-full h-full rounded-md absolute text-white text-center">
                <Aurora
                  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                  blend={0.5}
                  amplitude={1.0}
                  speed={0.5}
                  className="absolute  flex h-full w-full rounded"
                ></Aurora>
                <div className="absolute inset-0 flex items-center justify-center text-center p-4 flex-col">
                  <h3 className="text-lg font-bold mb-2 z-50">
                    {gallerySections[i]?.title}
                  </h3>
                  <p className="text-sm whitespace-pre-line z-50">
                    {gallerySections[i]?.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
