import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import dayImg from "../assets/day-of-sun.svg";
import nightImg from "../assets/moon-stars.svg";
import { motion, useScroll } from "motion/react";
const Navbar = () => {
  const menuCon = useRef(null);
  const menuIconIn = useRef(null);
  const menuIconOut = useRef(null);
  const menuList = useRef(null);
  // State to hold the current icon
  const [icon, setIcon] = useState(dayImg); // Default to day icon
  const navLinks = ["Home", "Reserve", "Menu", "Gallery", "Contact"];
  const logo = useRef(null);
  const menuComeAnimation = () => {
    // alert("animation call");
    const page = menuCon.current;
    gsap.set(page, {
      display: "flex",
      x: 500,
      opacity: 1,
    });

    gsap.to(page, {
      x: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };
  const menuOutAnimation = () => {
    // alert("animation call");
    const page = menuCon.current;

    // Animate menu out
    gsap.to(page, {
      x: 500,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        // Hide menu after animation
        gsap.set(page, {
          display: "none",
        });

        // gsap.set(".menuListAnimation", {
        //   display: "none",
        // });
      },
    });
  };

  useEffect(() => {
    const menuIn = menuIconIn.current;
    const menuOut = menuIconOut.current;
    const allMenuLinks = document.querySelector(".menuListAnimation");

    if (menuIn && menuOut && allMenuLinks) {
      menuIn.addEventListener("click", menuComeAnimation);
      menuOut.addEventListener("click", menuOutAnimation);
      allMenuLinks.addEventListener("click", menuOutAnimation);
    }

    return () => {
      if (menuIn && menuOut && allMenuLinks) {
        menuIn.removeEventListener("click", menuComeAnimation);
        menuOut.removeEventListener("click", menuOutAnimation);
        allMenuLinks.removeEventListener("click", menuOutAnimation);
      }
    };
  }, []);
  const toggleIcon = () => {
    setIcon((prevIcon) => (prevIcon === dayImg ? nightImg : dayImg));
    if (icon == dayImg) {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      // alert("day mode");
    } else {
      // alert("night mode");
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }
  };
  return (
    <>
      <div
        ref={menuCon}
        className="absolute bg-white z-50 hidden h-full w-full flex-col"
      >
        <span className="m-10 flex justify-end">
          <img
            ref={menuIconOut}
            className="h-10 md:hidden flex"
            src="https://www.svgrepo.com/show/371143/close.svg"
          />
        </span>
        <div className="flex w-full">
          <ul className="menuListAnimation flex gap-1  md:hidden flex-col justify-center items-center w-full drop-shadow-[0.5px_2px_2px_rgba(1,1,1,1)]">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="border-2  hover:border-black hover:text-black hover:bg-[#ffbd59] hover:shadow-md hover:shadow-slate-700 rounded-full w-full text-center p-3 text-[#000000]"
              >
                <Link
                  to={`${link.toLowerCase()}`}
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={700}
                  className="text-5xl font-bold md:text-base relative after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-[#ffbd59] after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="py-5 flex justify-between items-center px-5 md:justify-around">
        <img
          src="https://www.svgrepo.com/show/393360/restaurant.svg"
          ref={logo}
          className="h-16 drop-shadow-[0_5px_7px_rgba(0,0,0)]"
        />

        <span className="flex gap-5 md:hidden">
          <img
            ref={menuIconIn}
            className="h-10"
            src="https://www.svgrepo.com/show/474904/menu.svg"
          />
        </span>

        <ul ref={menuList} className="hidden gap-5 md:flex items-center">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={`${link.toLowerCase()}`}
                spy={true}
                smooth={true}
                offset={0}
                duration={700}
                className="text-2xl text-[#000000] drop-shadow-[0_1px_1px_rgba(1,1,1,1)] hover:text-[#f6ff50] font-bold gap-7 relative after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-[#ffbd59] after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
              >
                {link}
              </Link>
            </li>
          ))}
          <button onClick={toggleIcon} className="btn">
            <img className="h-8" src={icon} />
          </button>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
