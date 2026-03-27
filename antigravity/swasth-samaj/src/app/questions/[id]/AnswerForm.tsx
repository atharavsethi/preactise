"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    const res = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId, content })
    });
    setLoading(false);
    
    if (res.ok) {
      setContent("");
      router.refresh();
      alert("Answer submitted for moderation.");
    } else {
      alert("Failed to post answer");
    }
  };

  return (
    <div className="card" style={{ marginTop: "2rem" }}>
      <h3 style={{ marginBottom: "1rem", color: "var(--color-green-dark)" }}>Post an Answer</h3>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <textarea 
          className="input-field"
          value={content} 
          onChange={e => setContent(e.target.value)} 
          style={{ minHeight: "120px", resize: "vertical" }}
          placeholder="Share your medical expertise..."
          required
        />
        <button type="submit" className="btn btn-primary" disabled={loading} style={{ alignSelf: "flex-start" }}>
          {loading ? "Submitting..." : "Submit Answer"}
        </button>
      </form>
    </div>
  );
}
