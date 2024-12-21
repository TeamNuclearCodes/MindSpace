import React from "react";
import { useState } from "react";

function HoverText({ text, children }) {
  const [showText, setShowText] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  return (
    <div
      className=" group w-full h-full flex justify-center items-center z-[10000]"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      <div
        className={`absolute text-black text-sm font-bold rounded-xl py-0 shadow-blue-glow ${
          showText ? "opacity-100" : "opacity-0"
        } transition-opacity bg-white p-2 duration-100 absolute`}
        style={{
          left: `${position.x - 0}px`,
          top: `${position.y + 20}px`,
          pointerEvents: "none",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default HoverText;
