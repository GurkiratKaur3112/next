"use client";
import React, { useEffect, useState } from "react";

export const Meteors = ({ number }: { number?: number }) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([]);

  useEffect(() => {
    const generateMeteors = () => {
      const styles = [...Array(number || 20)].map(() => ({
        top: 0,
        left: Math.floor(Math.random() * 100) + "%",
        animationDelay: Math.random() + "s",
        animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
      }));
      setMeteorStyles(styles);
    };

    generateMeteors();
    const interval = setInterval(generateMeteors, 5000); // Regenerate every 5 seconds

    return () => clearInterval(interval);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className="absolute h-1 w-1 rounded-full bg-white shadow-[0_0_6px_2px_#3b82f6] animate-meteor-fall"
          style={{
            top: 0,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 w-[100px] h-[1px] bg-gradient-to-b from-blue-400/0 via-blue-400/40 to-blue-400/0"></div>
        </span>
      ))}
    </div>
  );
};
