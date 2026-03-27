'use client';
import React, { useState } from 'react';

export default function UpvoteButton({ answerId, initialUpvotes }: { answerId: string, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [voted, setVoted] = useState(false);

  const handleUpvote = async () => {
    if (voted) return;
    const res = await fetch(`/api/answers/${answerId}/upvote`, { method: 'POST' });
    if (res.ok) {
       setUpvotes(prev => prev + 1);
       setVoted(true);
    }
  };

  return (
    <button 
      onClick={handleUpvote}
      disabled={voted}
      style={{ 
        background: voted ? 'rgba(0,255,204,0.15)' : 'rgba(0,255,204,0.05)', 
        border: '1px solid var(--accent-teal)', 
        color: 'var(--accent-teal)', 
        padding: '0.5rem 1rem', 
        borderRadius: '20px', 
        cursor: voted ? 'default' : 'pointer', 
        fontWeight: 600, 
        transition: 'all 0.2s' 
      }}
    >
      ⬆ {upvotes} {voted ? 'Upvoted' : 'Helpful'}
    </button>
  );
}
