import React, { useRef, useEffect } from "react";

const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#999",
  squareSize = 40,
  hoverFillColor = "#222",
}) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const numSquaresX = useRef(0);
  const numSquaresY = useRef(0);
  const gridOffset = useRef({ x: 0, y: 0 });
  const hoveredSquareRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      numSquaresX.current = Math.ceil(canvas.width / squareSize) + 1;
      numSquaresY.current = Math.ceil(canvas.height / squareSize) + 1;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const drawGrid = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.current.x % squareSize);
          const squareY = y - (gridOffset.current.y % squareSize);

          if (
            hoveredSquareRef.current &&
            Math.floor((x - startX) / squareSize) ===
              hoveredSquareRef.current.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquareRef.current.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, "#060606");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case "right":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case "left":
          gridOffset.current.x =
            (gridOffset.current.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case "up":
          gridOffset.current.y =
            (gridOffset.current.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case "down":
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case "diagonal":
          gridOffset.current.x =
            (gridOffset.current.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.current.y =
            (gridOffset.current.y - effectiveSpeed + squareSize) % squareSize;
          break;
        default:
          break;
      }

      drawGrid();
      requestRef.current = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.current.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.current.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + gridOffset.current.x - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + gridOffset.current.y - startY) / squareSize
      );

      if (
        !hoveredSquareRef.current ||
        hoveredSquareRef.current.x !== hoveredSquareX ||
        hoveredSquareRef.current.y !== hoveredSquareY
      ) {
        hoveredSquareRef.current = { x: hoveredSquareX, y: hoveredSquareY };
      }
    };

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    requestRef.current = requestAnimationFrame(updateAnimation);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full z-0 border-none absolute top-0 left-0  pointer-events-none "
    ></canvas>
  );
};

export default Squares;
// // components/Squares.jsx
// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";

// const Squares = ({
//   speed = 1,
//   squareSize = 40,
//   direction = "diagonal",
//   borderColor = "#000",
//   hoverFillColor = "#222",
//   className = "",
//   children,
// }) => {
//   const gridRef = useRef(null);

//   const directions = {
//     up: { x: 0, y: -1 },
//     down: { x: 0, y: 1 },
//     left: { x: -1, y: 0 },
//     right: { x: 1, y: 0 },
//     diagonal: { x: 1, y: 1 },
//   };

//   useEffect(() => {
//     const grid = gridRef.current;
//     const { clientWidth: width, clientHeight: height } = grid;

//     const cols = Math.ceil(width / squareSize);
//     const rows = Math.ceil(height / squareSize);
//     const dir = directions[direction] || directions.diagonal;

//     const squares = [];

//     for (let y = 0; y < rows; y++) {
//       for (let x = 0; x < cols; x++) {
//         const square = document.createElement("div");
//         square.className = "transition duration-300";
//         square.style.width = `${squareSize}px`;
//         square.style.height = `${squareSize}px`;
//         square.style.border = `1px solid ${borderColor}`;
//         square.style.position = "absolute";
//         square.style.left = `${x * squareSize}px`;
//         square.style.top = `${y * squareSize}px`;
//         square.style.boxSizing = "border-box";

//         // Hover animation
//         square.addEventListener("mouseenter", () => {
//           square.style.backgroundColor = hoverFillColor;
//         });
//         square.addEventListener("mouseleave", () => {
//           square.style.backgroundColor = "transparent";
//         });

//         grid.appendChild(square);
//         squares.push(square);
//       }
//     }

//     // Animate movement with GSAP
//     squares.forEach((sq, i) => {
//       gsap.to(sq, {
//         x: `+=${dir.x * 10}`,
//         y: `+=${dir.y * 10}`,
//         duration: speed + Math.random(),
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });
//     });

//     return () => {
//       squares.forEach((sq) => grid.removeChild(sq));
//     };
//   }, [speed, squareSize, direction, borderColor, hoverFillColor]);

//   return (
//     <div ref={gridRef} className={`relative overflow-hidden ${className}`}>
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default Squares;
