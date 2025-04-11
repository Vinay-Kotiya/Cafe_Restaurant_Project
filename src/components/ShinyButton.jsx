import React from "react";
const ShinyText = ({ text, disabled = false, speed = 5, className = "" }) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#2f2f2fa4] bg-clip-text inline-block text-4xl${
        disabled ? "" : "animate-shine"
      } ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

//   return (
//     <>
//       {/* Mobile Menu */}
//       <div
//         ref={menuCon}
//         className="absolute bg-black z-50 hidden h-screen w-full flex-col"
//       >
//         <span className="m-10 flex justify-end">
//           <img
//             ref={menuIconOut}
//             className="h-10 md:hidden flex cursor-pointer"
//             src="https://www.svgrepo.com/show/371143/close.svg"
//             alt="Close Menu"
//           />
//         </span>
//         <div className="flex w-full">
//           <ul className="menuListAnimation flex flex-col gap-4 justify-center items-center w-full">
//             {navLinks.map((link, index) => (
//               <li
//                 key={index}
//                 className="border-2 border-[#ffbd59] hover:border-black hover:text-black hover:bg-[#ffbd59] hover:shadow-md rounded-full w-3/4 text-center p-3 text-[#ffbd59]"
//               >
//                 <Link
//                   to={`${link.toLowerCase()}`}
//                   spy={true}
//                   smooth={true}
//                   offset={0}
//                   duration={700}
//                   className="text-2xl font-bold relative after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-[#ffbd59] after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
//                 >
//                   {link}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Navbar */}
//       <div className="py-5 flex justify-between items-center px-5 md:justify-around">
//         <img
//           src="https://www.svgrepo.com/show/393360/restaurant.svg"
//           className="h-16 drop-shadow-[0_5px_7px_rgba(0,0,0)]"
//           alt="Logo"
//         />

//         <span className="flex gap-5 md:hidden">
//           <img
//             ref={menuIconIn}
//             className="h-10 cursor-pointer"
//             src="https://www.svgrepo.com/show/474904/menu.svg"
//             alt="Open Menu"
//           />
//         </span>

//         <ul className="hidden gap-5 md:flex">
//           {navLinks.map((link, index) => (
//             <li key={index}>
//               <Link
//                 to={`${link.toLowerCase()}`}
//                 spy={true}
//                 smooth={true}
//                 offset={0}
//                 duration={700}
//                 className="text-lg text-[#fec166] hover:text-[#d5993e] font-bold relative after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-[#ffbd59] after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
//               >
//                 {link}
//               </Link>
//             </li>
//           ))}
//           <button onClick={toggleIcon} className="btn">
//             <img className="h-8" src={icon} alt="Toggle Theme" />
//           </button>
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Navbar;
