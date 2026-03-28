"use client";
import React, { useState } from "react";
import styles from "./hospitals.module.css";
import { MOCK_HOSPITALS } from "@/lib/mockData";
import Link from "next/link";

export default function HospitalHub() {
  const [search, setSearch] = useState("");

  const filteredHospitals = MOCK_HOSPITALS.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <header className={styles.header}>
        <h1 className={styles.title}>Hospital & <span className="logo-accent">Trauma Hub</span></h1>
        <p className={styles.subtitle}>Instantly locate verified healthcare facilities and emergency services around your Samaj.</p>
        
        <div className={styles.searchBox}>
          <span className={styles.searchIcon}>🏥</span>
          <input 
            type="text" 
            placeholder="Enter location or hospital name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className={styles.hospitalGrid}>
        {filteredHospitals.map(h => (
          <div key={h.id} className={styles.hospitalCard}>
            <div className={styles.hCardHeader}>
              <div className={styles.hIcon}>🏨</div>
              <div className={styles.hMain}>
                <h3 className={styles.hName}>{h.name}</h3>
                <p className={styles.hLoc}>📍 {h.location}</p>
              </div>
              <div className={styles.hRating}>⭐ {h.rating}</div>
            </div>

            <div className={styles.hTags}>
              {h.tags.map(t => <span key={t} className={styles.pill}>{t}</span>)}
            </div>

            <div className={styles.hStats}>
              <div className={styles.hStat}>
                <span className={styles.hStatVal}>{h.beds}</span>
                <span className={styles.hStatLbl}>Total Beds</span>
              </div>
              <div className={styles.hStat}>
                {h.emergency ? (
                  <span className={styles.emergencyOn}>✅ 24/7 ER</span>
                ) : (
                  <span className={styles.emergencyOff}>❌ No ER</span>
                )}
              </div>
            </div>

            <div className={styles.hActions}>
              <button className={styles.dirBtn}>Get Directions</button>
              <button className={styles.contactBtn}>Contact Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
