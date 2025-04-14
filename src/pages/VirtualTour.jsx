import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import diningImg from "../assets/dining2.png";
import kitchenImg from "../assets/kitchen.avif";
import barImg from "../assets/bar.avif";
import MagnetLines from "../ReactBits/MagnetLines/MagnetLines";
import TextPressure from "../ReactBits/TextPressure/TextPressure";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Dining Area",
    text: "Experience cozy ambiance and warm hospitality.",
    image: diningImg,
  },
  {
    title: "Kitchen",
    text: "Clean, open kitchen where flavors come alive.",
    image: kitchenImg,
  },
];

const VirtualTour = () => {
  const containerRef = useRef();

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".tour-section");

    elements.forEach((el, index) => {
      const image = el.querySelector(".bg");
      const text = el.querySelector(".text");

      gsap.fromTo(
        image,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} id="virtual tour" className="w-full">
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="tour-section h-screen w-full relative absolute overflow-hidden flex justify-center items-center"
        >
          <img
            src={section.image}
            className="bg absolute w-full h-full object-cover"
            alt={section.title}
          />
          <MagnetLines
            rows={9}
            columns={9}
            containerSize="60vmin"
            lineColor="black"
            lineWidth="0.8vmin"
            lineHeight="5vmin"
            baseAngle={0}
            style={{ margin: "2rem auto" }}
            className="z-10"
          />
          <div className="text z-10 text-white absolute text-center px-6">
            {/* <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {section.title}
            </h2> */}
            <div
              // style={{ position: "relative", height: "300px" }}
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
            >
              <TextPressure
                text={section.title}
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
            <p className="text-lg md:text-xl font-light drop-shadow-lg">
              {section.text}
            </p>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
        </div>
      ))}

      {/* ✅ Optional 360° Virtual Tour */}
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          360° Virtual Tour
        </h2>
        <div className="w-full max-w-5xl aspect-video px-4">
          {/* <iframe
            src="https://www.klapty.com/tour-link-or-similar" // 🔄 Replace with your 360° embed link
            frameBorder="0"
            className="w-full h-full rounded-xl"
            allowFullScreen
            title="360 Virtual Tour"
          /> */}
          <iframe
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "430px",
            }}
            src="https://www.klapty.com/tour/tunnel/h880pXBt4O"
            frameBorder="0"
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allowvr="true"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; vr"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
