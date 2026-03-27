"use client";
import React, { useRef, useState } from "react";

export const SpotlightCard = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card ${className}`}
      style={{ position: "relative", overflow: "hidden", ...props.style }}
      {...props}
    >
      <div
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(255, 153, 51, 0.15), transparent 40%)`,
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          transition: "opacity 0.3s ease"
        }}
      />
      <div style={{ position: "relative", zIndex: 1, pointerEvents: "auto" }}>{children}</div>
    </div>
  );
};
