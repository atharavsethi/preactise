import React from 'react';

export const VerifiedBadge = ({ type = 'doctor', className = '' }: { type?: 'doctor' | 'student', className?: string }) => {
  return (
    <span 
      className={`verified-badge ${className}`} 
      title={`Verified ${type === 'doctor' ? 'Doctor' : 'Medical Student'}`}
    >
      ✔
    </span>
  );
};
