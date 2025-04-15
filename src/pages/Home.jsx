import React, { useRef } from "react";

import Navbar from "../components/Navbar";
import HeroImage from "../assets/HeroImage2.png";
import gsap from "gsap";
import { useEffect } from "react";
import Magnet from "../ReactBits/Magnet/Magnet";
import BlurText from "../ReactBits/BlurText/BlurText";
import TiltedCard from "../ReactBits/TiltedCard/TiltedCard";
import TextPressure from "../ReactBits/TextPressure/TextPressure";
import ClickSpark from "../ReactBits/ClickSpark/ClickSpark";
import { Link } from "react-scroll";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const loaderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power1.inOut" },
    });
    tl.set(".loadAnimation1", {
      opacity: 0,
      y: -20,
    });
    tl.to(".loadAnimation1", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.set(".loadAnimation2", {
      opacity: 0,
      y: -20,
    });
    tl.to(".loadAnimation2", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.set(".loadAnimation3", {
      opacity: 0,
      y: -20,
    });
    tl.to(".loadAnimation3", {
      opacity: 1,
      y: 0,
      duration: 0.5,

      ease: "power1.inOut",
    });
    gsap.set(".loadImageAnimation", {
      opacity: 0,
      y: -20,
    });
    gsap.to(".loadImageAnimation", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);
  return (
    <div id="home" className="h-screen relative w-full overflow-hidden">
      <ClickSpark
        sparkColor="#000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <Navbar />

        <div className="flex justify-center items-center h-full flex-col md:flex-row  bg-gray-300">
          <div className="md:w-[45%] w-full p-5 ">
            <BlurText
              text=" “Authentic Flavors of India, Served with Love”"
              delay={100}
              animateBy="words"
              direction="top"
              className="loadAnimation1 headding md:text-6xl text-4xl"
            />
            <div
              ref={containerRef}
              style={{ position: "relative" }}
              className="md:text-xl text-3xl"
            >
              <BlurText
                text="Experience authentic vegetarian Indian cuisine crafted with love,tradition, and fresh ingredients. From classic curries to sizzling tandoori dishes, we bring you the flavors of India—straight from our kitchen to your table.."
                delay={100}
                animateBy="words"
                direction="top"
                className="loadAnimation2 text-gray-700  text-2xl"
              />
            </div>

            <div className="flex justify-between items-center mt-5 md:w-[70%]">
              <Link
                to={"virtual tour"}
                spy={true}
                smooth={true}
                offset={0}
                duration={700}
              >
                <Magnet padding={100} disabled={false} magnetStrength={5}>
                  <button className="loadAnimation3 cta flex justify-center items-center">
                    <span>Explore&nbsp;Now</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Magnet>
              </Link>

              <Link
                to={"customize"}
                spy={true}
                smooth={true}
                offset={0}
                duration={700}
                className="flex justify-end items-center"
              >
                <Magnet padding={100} disabled={false} magnetStrength={5}>
                  <button className="loadAnimation3 cta flex justify-center items-center">
                    <span>Customize</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Magnet>
              </Link>
            </div>
          </div>
          <div className="loadImageAnimation md:w-[45%] md:flex hidden justify-center items-center">
            <TiltedCard
              imageSrc={HeroImage}
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="INDIAN FLAVORS"
              containerHeight="500px"
              containerWidth="500px"
              imageHeight="400px"
              imageWidth="400px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
            />
          </div>
        </div>
        {/* </div> */}
      </ClickSpark>
    </div>
  );
};

export default Home;
