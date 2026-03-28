'use client';
import React, { useState } from 'react';
import styles from './FloatingHelp.module.css';

export const FloatingHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {isOpen && (
        <div className={styles.drawer}>
          <div className={styles.header}>
            <h4>Swasth Samaj Help 🩺</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className={styles.content}>
            <div className={styles.faqItem}>
              <strong>How to get verified?</strong>
              <p>Doctors can upload their license in the Profile section for admin review.</p>
            </div>
            <div className={styles.faqItem}>
              <strong>Is my data private?</strong>
              <p>Yes, all health queries can be posted anonymously.</p>
            </div>
            <div className={styles.faqItem}>
              <strong>How to find blood?</strong>
              <p>Visit the SOS Hub and filter by your blood group.</p>
            </div>
          </div>
          <button className={styles.supportBtn}>Contact Support</button>
        </div>
      )}
      <button 
        className={styles.fab} 
        onClick={() => setIsOpen(!isOpen)}
        title="Help & FAQs"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};
