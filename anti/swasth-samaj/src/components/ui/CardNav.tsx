"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./CardNav.module.css";
import { useMockStore } from "@/lib/mockStore";

export const CardNav = () => {
  const pathname = usePathname();
  const { session, logout, notifications } = useMockStore();
  const [search, setSearch] = useState("");

  const navGroups = [
    { 
      name: "Doctors", 
      path: "/doctors",
      items: [
        { name: "Doctor List (Chroma Grid)", path: "/doctors" },
        { name: "Doctor Profiles", path: "/doctors" },
        { name: "Doctor Verification", path: "/doctors" },
        { name: "Specializations", path: "/doctors" },
      ]
    },
    { 
      name: "Hospitals", 
      path: "/hospitals",
      items: [
        { name: "Nearby Hospitals", path: "/hospitals" },
        { name: "Specialized Hospitals", path: "/hospitals" },
        { name: "Emergency Services", path: "/hospitals" },
      ]
    },
    { 
      name: "Messages", 
      path: "/messages",
      items: [
        { name: "Chat Inbox", path: "/messages" },
        { name: "Notifications", path: "/messages" },
      ]
    },
    { 
      name: "Help", 
      path: "/help",
      items: [
        { name: "FAQs", path: "/help" },
        { name: "Contact Support", path: "/help" },
      ]
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className={styles.nav}>
      {/* Brand Logo & Name */}
      <Link href="/">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
          <img src="/logo.png" alt="Swasth Samaj Logo" style={{ height: "45px", width: "auto", borderRadius: "8px", objectFit: "contain" }} />
          <span style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--color-heading)", letterSpacing: "0.5px" }}>
            Swasth<span style={{ color: "var(--color-saffron)" }}>Samaj</span>
          </span>
        </div>
      </Link>

      {/* Global Search */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search doctors, hospitals..." 
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Nav Items */}
      <div className={styles.itemsContainer}>
        <Link href="/">
          <div className={`${styles.navItem} ${pathname === "/" ? styles.active : ""}`}>
            Home
          </div>
        </Link>

        {navGroups.map(group => (
          <div key={group.name} className={styles.navItem}>
            {group.name} ▾
            <div className={styles.dropdown}>
              {group.items.map(item => (
                <Link key={item.name} href={item.path} className={styles.dropdownItem}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        
        <Link href="/sos">
          <div className={`${styles.navItem} ${pathname === "/sos" ? styles.active : ""}`}>
            🩸 Blood SOS
          </div>
        </Link>
      </div>

      <div className={styles.rightActions}>
        <div className={styles.bellWrapper}>
          🔔
          {unreadCount > 0 && <div className={styles.notificationBadge}>{unreadCount}</div>}
        </div>

        {session ? (
          <div className={styles.navItem}>
            <div className={styles.profileCircle}>
              {session.avatar ? <img src={session.avatar} alt="Profile" /> : session.name[0]}
            </div>
            <div className={styles.dropdown}>
              <div className={styles.dropdownItem} style={{ fontWeight: 800, color: "var(--color-saffron)" }}>
                {session.role} {session.isVerified ? "✅" : "⏳"}
              </div>
              <Link href="/profile" className={styles.dropdownItem}>View Profile</Link>
              <Link href="/profile" className={styles.dropdownItem}>Edit Profile</Link>
              <Link href="/profile" className={styles.dropdownItem}>Verification Status</Link>
              <div onClick={logout} className={styles.dropdownItem} style={{ color: "#dc2626" }}>Logout</div>
            </div>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary" style={{ borderRadius: "24px", padding: "0.6rem 1.5rem" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
