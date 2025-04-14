// import React, { useEffect } from "react"; // ✅ THIS IS IMPORTANT
// import Lenis from "@studio-freight/lenis";

// const useSmoothScroll = () => {
//   useEffect(() => {
//     const lenis = new Lenis();

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);
// };

// export default useSmoothScroll;
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);
const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return lenis.scrollTo(value);
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    return () => lenis.destroy();
  }, []);
};
export default useSmoothScroll;
