import React from "react";

const bubbles = [
  { left: "10%", size: 40, delay: 0, duration: 12, opacity: 0.3 },
  { left: "25%", size: 24, delay: 2, duration: 10, opacity: 0.2 },
  { left: "40%", size: 32, delay: 4, duration: 14, opacity: 0.25 },
  { left: "55%", size: 20, delay: 1, duration: 9, opacity: 0.18 },
  { left: "70%", size: 36, delay: 3, duration: 13, opacity: 0.22 },
  { left: "80%", size: 28, delay: 5, duration: 11, opacity: 0.2 },
  { left: "60%", size: 18, delay: 6, duration: 8, opacity: 0.15 },
  { left: "35%", size: 22, delay: 2.5, duration: 10, opacity: 0.17 },
];

const BubblesBackground = () => (
  <div className="absolute left-0 top-0 w-full h-96 md:h-[32rem] z-10 pointer-events-none overflow-hidden">
    <style>{`
      @keyframes bubbleUp {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-320px) scale(1.1);
          opacity: 0;
        }
      }
    `}</style>
    {bubbles.map((bubble, i) => (
      <div
        key={i}
        style={{
          left: bubble.left,
          width: bubble.size,
          height: bubble.size,
          opacity: bubble.opacity,
          animation: `bubbleUp ${bubble.duration}s linear ${bubble.delay}s infinite`,
        }}
        className="absolute bottom-0 rounded-full bg-gradient-to-tr from-aquarius-light/60 to-aquarius-dark/40 shadow-lg"
      />
    ))}
  </div>
);

export default BubblesBackground;
