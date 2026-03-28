'use client';
import React from 'react';
import styles from './Skeleton.module.css';

export const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.shimmer} />
    <div className={styles.header}>
      <div className={styles.circle} />
      <div className={styles.lines}>
        <div className={styles.line} style={{ width: '60%' }} />
        <div className={styles.line} style={{ width: '40%' }} />
      </div>
    </div>
    <div className={styles.body}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} style={{ width: '80%' }} />
    </div>
    <div className={styles.footer}>
      <div className={styles.btn} />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
