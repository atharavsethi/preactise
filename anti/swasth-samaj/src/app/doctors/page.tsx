"use client";
import React, { useState } from "react";
import styles from "./doctors.module.css";
import { MOCK_DOCTORS } from "@/lib/mockData";
import Link from "next/link";

export default function DoctorDiscovery() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filteredDoctors = MOCK_DOCTORS
    .filter(doc => (
      doc.name.toLowerCase().includes(filter.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(filter.toLowerCase())
    ))
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <header className={styles.header}>
        <h1 className={styles.title}>Find Your <span className="logo-accent">Specialist</span></h1>
        <p className={styles.subtitle}>Verified medical professionals from the Swasth Samaj community.</p>
        
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Search by name or specialization..." 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <select className={styles.sortSelect} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="rating">Highest Rated</option>
            <option value="experience">Most Experienced</option>
          </select>
        </div>
      </header>

      <div className={styles.chromaGrid}>
        {filteredDoctors.map(doc => (
          <div key={doc.id} className={styles.doctorCard}>
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatarLarge}>{doc.name[0]}</div>
                <div className={`${styles.statusDot} ${doc.status === 'Online' ? styles.online : styles.offline}`} />
              </div>
              <div className={styles.mainInfo}>
                <h3 className={styles.docName}>
                  {doc.name} {doc.verified && <span className={styles.verifiedBadge} title="Verified Doctor">✅</span>}
                  {doc.isPending && <span className={styles.pendingBadge} title="Verification Pending">⏳</span>}
                </h3>
                <p className={styles.specializationBadge}>{doc.specialization}</p>
                <p className={styles.hospitalName}>🏥 {doc.hospital}</p>
              </div>
            </div>

            <div className={styles.ratingRow}>
              <span className={styles.stars}>⭐ {doc.rating}</span>
              <span className={styles.reviewCount}>({doc.reviews} reviews)</span>
            </div>

            <div className={styles.badgesGrid}>
              <div className={styles.badge} title="Patients Consulted">
                <span className={styles.badgeIcon}>👥</span> {doc.patients}
              </div>
              <div className={styles.badge} title="Cases Solved">
                <span className={styles.badgeIcon}>📁</span> {doc.cases}
              </div>
              <div className={styles.badge} title="Avg. Response Time">
                <span className={styles.badgeIcon}>⏱</span> {doc.responseTime}m
              </div>
              <div className={styles.badge} title="Popularity Score">
                <span className={styles.badgeIcon}>🔥</span> {doc.popularity}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <Link href={`/doctors/${doc.id}`} className={styles.viewBtn}>
                View Full Profile
              </Link>
            </div>

            {/* Hover Bio Popover (Simple version for demo) */}
            <div className={styles.bioPopover}>
              <p>{doc.bio}</p>
              <div className={styles.tagList}>
                {doc.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
