import React from "react";

export function VerifiedBadge({ type }: { type: "doctor" | "student" }) {
  const isDoctor = type === "doctor";
  
  return (
    <span 
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontSize: "0.75rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        padding: "0.2rem 0.5rem",
        borderRadius: "4px",
        background: isDoctor ? "var(--color-green)" : "var(--color-saffron)",
        color: "white"
      }}
      title={isDoctor ? "Verified Doctor" : "Verified Medical Student"}
    >
      ✔ {isDoctor ? "Verified Doctor" : "Verified Student"}
    </span>
  );
}
