"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const CardNav = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "🩸 Blood SOS", path: "/sos" },
    { name: "Forum", path: "/questions" }
  ];

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem",
      position: "sticky", top: 0, zIndex: 50, 
      background: "linear-gradient(to bottom, rgba(250, 250, 249, 0.95), transparent)", 
    }}>
      {/* Brand Logo & Name */}
      <Link href="/">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
          <img src="/logo.png" alt="Swasth Samaj Logo" style={{ height: "45px", width: "auto", borderRadius: "8px", objectFit: "contain" }} />
          <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-heading)", letterSpacing: "0.5px" }}>
            Swasth<span style={{ color: "var(--color-saffron)" }}>Samaj</span>
          </span>
        </div>
      </Link>

      {/* Nav Items */}
      <div style={{
        display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.8)",
        padding: "0.5rem", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.08)",
        backdropFilter: "blur(12px)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        flexWrap: "wrap", justifyContent: "center"
      }}>
        {navItems.map(item => {
          const isActive = item.path === "/" ? pathname === "/" : pathname.startsWith(item.path);
          return (
            <Link key={item.name} href={item.path}>
              <div style={{
                padding: "0.5rem 1rem", borderRadius: "18px", fontWeight: 600, fontSize: "0.85rem",
                background: isActive ? "var(--color-green)" : "transparent",
                color: isActive ? "white" : "var(--color-heading)",
                transition: "all 0.3s ease", cursor: "pointer",
                boxShadow: isActive ? "var(--shadow-md)" : "none"
              }}>
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      <Link href="/ask" className="btn btn-primary" style={{ borderRadius: "24px", padding: "0.6rem 1.5rem" }}>
        Ask a Question
      </Link>
    </nav>
  );
};
