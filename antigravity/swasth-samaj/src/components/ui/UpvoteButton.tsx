"use client";

import { useState } from "react";

export default function UpvoteButton({ answerId, initialUpvotes }: { answerId: string, initialUpvotes: number }) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [loading, setLoading] = useState(false);

  const handleUpvote = async () => {
    setLoading(true);
    const res = await fetch(`/api/answers/${answerId}/upvote`, { method: "POST" });
    setLoading(false);
    if (res.ok) {
      setUpvotes(prev => prev + 1);
    }
  };

  return (
    <button 
      onClick={handleUpvote} 
      disabled={loading}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "rgba(255, 153, 51, 0.1)",
        border: "1px solid var(--color-saffron-light)",
        color: "var(--color-saffron-dark)",
        padding: "0.4rem 0.8rem",
        borderRadius: "20px",
        cursor: "pointer",
        fontWeight: 600,
        transition: "var(--transition)"
      }}
      onMouseOver={e => e.currentTarget.style.background = "var(--color-saffron-light)"}
      onMouseOut={e => e.currentTarget.style.background = "rgba(255, 153, 51, 0.1)"}
    >
      ▲ {upvotes} Upvotes
    </button>
  );
}
