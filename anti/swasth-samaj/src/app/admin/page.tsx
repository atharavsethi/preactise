"use client";
import React, { useState } from "react";
import styles from "./admin.module.css";
import { MOCK_DOCTORS } from "@/lib/mockData";
import { useToast } from "@/components/ui/ToastProvider";

export default function AdminPanel() {
  const { showToast } = useToast();
  const [pendingDocs, setPendingDocs] = useState(MOCK_DOCTORS.filter(d => !d.verified || d.isPending));

  const handleApprove = (id: string, name: string) => {
    setPendingDocs(prev => prev.filter(d => d.id !== id));
    showToast(`Verification for ${name} has been APPROVED ✅`, 'success');
  };

  const handleReject = (id: string, name: string) => {
    setPendingDocs(prev => prev.filter(d => d.id !== id));
    showToast(`Verification for ${name} has been REJECTED ❌`, 'error');
  };

  return (
    <div className="container" style={{ padding: "4rem 0" }}>
      <header className={styles.header}>
        <h1 className={styles.title}>Admin <span className="logo-accent">Control Panel</span></h1>
        <p className={styles.subtitle}>Review and verify medical credentials for the Swasth Samaj community.</p>
      </header>

      <div className={styles.adminGrid}>
        <div className={styles.statsCard}>
          <div className={styles.stat}>
            <span className={styles.val}>{pendingDocs.length}</span>
            <span className={styles.lbl}>Pending verifications</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.val}>{MOCK_DOCTORS.length - pendingDocs.length}</span>
            <span className={styles.lbl}>Total Verified Doctors</span>
          </div>
        </div>

        <div className={styles.approvalsList}>
          <h3>Pending Doctor Credentials</h3>
          {pendingDocs.length > 0 ? (
            pendingDocs.map(doc => (
              <div key={doc.id} className={styles.approvalItem}>
                <div className={styles.docInfo}>
                  <div className={styles.avatar}>{doc.name[0]}</div>
                  <div>
                    <h4 className={styles.name}>{doc.name}</h4>
                    <p className={styles.meta}>{doc.specialization} | {doc.hospital}</p>
                    <p className={styles.license}>License No: SS-2026-{doc.id.toUpperCase()}</p>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button className={styles.approveBtn} onClick={() => handleApprove(doc.id, doc.name)}>Approve ✅</button>
                  <button className={styles.rejectBtn} onClick={() => handleReject(doc.id, doc.name)}>Reject ❌</button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>No pending verification requests at this time.</div>
          )}
        </div>
      </div>
    </div>
  );
}
