"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const BubbleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const actions = session ? [
    { label: "Logout", icon: "🚪", action: () => signOut() },
    { label: "Ask Question", icon: "➕", path: "/ask" }
  ] : [
    { label: "Login", icon: "👤", path: "/login" },
    { label: "Register", icon: "📝", path: "/register" },
  ];

  return (
    <div style={{ position: "fixed", bottom: "7rem", right: "2rem", zIndex: 100, display: "flex", flexDirection: "column-reverse", alignItems: "flex-end", gap: "1rem" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px", height: "60px", borderRadius: "50%", background: "var(--color-green)",
          border: "none", color: "white", fontSize: "1.8rem", cursor: "pointer",
          boxShadow: "0 4px 25px rgba(19, 136, 8, 0.4)", transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
          display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1
        }}
      >
        +
      </button>

      {isOpen && actions.map((act, idx) => {
        const content = (
          <div style={{
            display: "flex", alignItems: "center", gap: "1rem",
            animation: `fade-in-up 0.3s ease forwards`,
            animationDelay: `${idx * 0.05}s`, opacity: 0,
            transform: "translateY(15px)"
          }}>
            <span style={{ 
              background: "var(--color-green-dark)", padding: "0.5rem 1rem", borderRadius: "20px", 
              fontSize: "0.9rem", color: "white", border: "1px solid rgba(255,153,51,0.2)",
              backdropFilter: "blur(8px)", fontWeight: 600, boxShadow: "var(--shadow-md)"
            }}>
              {act.label}
            </span>
            <button 
              onClick={act.action ? act.action : undefined}
              style={{
                width: "50px", height: "50px", borderRadius: "50%", background: "var(--color-green-dark)",
                border: "1px solid var(--color-saffron)", color: "white", fontSize: "1.2rem", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)", boxShadow: "var(--shadow-md)"
            }}>
              {act.icon}
            </button>
          </div>
        );

        return act.path ? (
          <Link key={act.label} href={act.path}>{content}</Link>
        ) : (
          <div key={act.label}>{content}</div>
        );
      })}
    </div>
  );
};
