"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { Stepper, Step } from "@/components/ui/Stepper";

export default function BloodSOSPage() {
  const [requestMode, setRequestMode] = useState(false);
  const [bloodType, setBloodType] = useState("O+");
  const [urgency, setUrgency] = useState("High");
  const [loading, setLoading] = useState(false);

  const activeRequests = [
    { id: 1, type: "O-", location: "Apollo Hospital, 2km away", urgency: "Critical", time: "10 mins ago" },
    { id: 2, type: "A+", location: "City Care Clinic, 4.5km away", urgency: "High", time: "1 hr ago" },
    { id: 3, type: "B+", location: "Fortis Escorts, 6km away", urgency: "Medium", time: "3 hrs ago" },
  ];

  const sosSteps: Step[] = [
    { title: "Broadcast", description: "Select blood type and urgency to ping your 10km radius.", icon: "📣" },
    { title: "Match", description: "Verified donors receive instant push notifications.", icon: "🤝" },
    { title: "Connect", description: "Donors accept your ping and connect privately.", icon: "🏥" }
  ];

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Emergency Broadcast Sent!\nNearby registered donors with ${bloodType} blood type have been notified via SMS and Push Notification.`);
      setLoading(false);
      setRequestMode(false);
    }, 1500);
  };

  return (
    <div className={`container ${styles.sosContainer}`}>
      <div className={styles.header}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🩸</div>
        <h1 className={styles.title}>Blood & Emergency SOS</h1>
        <p className={styles.subtitle}>Connect instantly with willing blood donors in your immediate vicinity.</p>
      </div>

      <div style={{ marginBottom: "4rem" }}>
        <Stepper steps={sosSteps} />
      </div>

      <div className={styles.actionGrid}>
        <div className={`card ${styles.broadcastCard}`}>
          <h3>Need Blood Urgently?</h3>
          <p>Broadcast your need to verified donors within a 10km radius.</p>
          {!requestMode ? (
            <button 
              onClick={() => setRequestMode(true)}
              className={`btn btn-primary ${styles.urgentBtn}`}
            >
              🚨 Broadcast Emergency
            </button>
          ) : (
            <form onSubmit={handleBroadcast} className={styles.requestForm}>
              <div className="input-group">
                <label className="input-label">Required Blood Type</label>
                <select className="input-field" value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Urgency Level</label>
                <select className="input-field" value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                  <option value="Critical">Critical (Within 2 Hours)</option>
                  <option value="High">High (Within 12 Hours)</option>
                  <option value="Medium">Medium (Within 24 Hours)</option>
                </select>
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={() => setRequestMode(false)} className="btn btn-outline" disabled={loading}>Cancel</button>
                <button type="submit" className={`btn btn-primary ${styles.urgentBtn}`} disabled={loading}>
                  {loading ? "Broadcasting..." : "Send SOS Now"}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className={`card ${styles.mapCard}`}>
          <h3>Active Requests Near You</h3>
          <div className={styles.requestsList}>
            {activeRequests.map(req => (
              <div key={req.id} className={styles.requestItem}>
                <div className={styles.bloodTypeBadge}>{req.type}</div>
                <div className={styles.requestInfo}>
                  <strong>{req.location}</strong>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                    <span style={{ color: req.urgency === "Critical" ? "#dc2626" : "var(--color-saffron-dark)" }}>{req.urgency} Urgency</span>
                    <span>{req.time}</span>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", borderColor: "var(--color-green)", color: "var(--color-green-dark)" }}>
                  Donate
                </button>
              </div>
            ))}
          </div>
          <div className={styles.mapPlaceholder}>
            <div style={{ padding: "2rem", background: "rgba(19, 136, 8, 0.05)", borderRadius: "var(--radius-md)", textAlign: "center", border: "1px dashed var(--color-green)" }}>
              🗺️ <em>Interactive Google Maps Integration would display live donor pins here.</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
