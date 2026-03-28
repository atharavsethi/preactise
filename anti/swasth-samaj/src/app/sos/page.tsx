"use client";
import React, { useState } from "react";
import styles from "./sos.module.css";
import { useToast } from "@/components/ui/ToastProvider";

const MOCK_DONORS = [
  { id: 1, name: "Amit Sharma", group: "O+", location: "T. Nagar, Chennai", lastDonated: "4 months ago" },
  { id: 2, name: "Suresh Kumar", group: "A-", location: "Adyar, Chennai", lastDonated: "6 months ago" },
  { id: 3, name: "Meena Rao", group: "B+", location: "Velachery, Chennai", lastDonated: "2 months ago" },
  { id: 4, name: "Vikram Singh", group: "O-", location: "Anna Nagar, Chennai", lastDonated: "Over a year ago" },
  { id: 5, name: "Priya Das", group: "AB+", location: "Mylapore, Chennai", lastDonated: "3 months ago" },
];

export default function BloodSOSPage() {
  const { showToast } = useToast();
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [isRequesting, setIsRequesting] = useState(false);

  const bloodGroups = ["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const filteredDonors = selectedGroup === "ALL" 
    ? MOCK_DONORS 
    : MOCK_DONORS.filter(d => d.group === selectedGroup);

  const handleRequest = (name: string) => {
    showToast(`Request sent to ${name}. They will be notified immediately.`, 'success');
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <header className={styles.header}>
        <h1 className={styles.title}>Blood <span style={{ color: "#dc2626" }}>SOS</span> Hub</h1>
        <p className={styles.subtitle}>A community-driven emergency response system for the Swasth Samaj.</p>
      </header>

      <div className={styles.sosCard}>
        <h3>Need Blood Urgently?</h3>
        <p>Post an emergency alert to all donors in your local area.</p>
        <button className={styles.postBtn} onClick={() => showToast("Emergency SOS broadcasted to nearby donors!", "error")}>
          🚨 Post Emergency SOS
        </button>
      </div>

      <div className={styles.filterSection}>
        <h4>Find Donors by Blood Group</h4>
        <div className={styles.groupGrid}>
          {bloodGroups.map(g => (
            <button 
              key={g} 
              className={`${styles.groupBtn} ${selectedGroup === g ? styles.groupActive : ""}`}
              onClick={() => setSelectedGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.donorGrid}>
        {filteredDonors.length > 0 ? (
          filteredDonors.map(donor => (
            <div key={donor.id} className={styles.donorCard}>
              <div className={styles.donorAvatar}>{donor.name[0]}</div>
              <div className={styles.donorInfo}>
                <div className={styles.donorNameRow}>
                  <h4 className={styles.donorName}>{donor.name}</h4>
                  <span className={styles.groupBadge}>{donor.group}</span>
                </div>
                <p className={styles.donorLoc}>📍 {donor.location}</p>
                <p className={styles.lastDonated}>Last Donated: {donor.lastDonated}</p>
              </div>
              <button className={styles.reqBtn} onClick={() => handleRequest(donor.name)}>
                Request Donation
              </button>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>No donors found for group {selectedGroup} in your area.</div>
        )}
      </div>
    </div>
  );
}
