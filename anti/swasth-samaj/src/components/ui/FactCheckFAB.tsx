"use client";

import { useState } from "react";

export default function FactCheckFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert(`Fact check requested for: ${url}\nA verified doctor will review this link shortly.`);
      setLoading(false);
      setIsOpen(false);
      setUrl("");
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn btn-primary"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          borderRadius: "50px",
          padding: "1rem 1.5rem",
          boxShadow: "0 10px 25px rgba(255,153,51,0.4)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 999
        }}
      >
        <span>🔍</span> Request Fact-Check
      </button>

      {isOpen && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", position: "relative" }}>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ position: "absolute", right: "1rem", top: "1rem", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
            >
              &times;
            </button>
            <h3 style={{ color: "var(--color-green-dark)", marginBottom: "0.5rem" }}>Request a Fact Check</h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
              Found a suspicious health claim on WhatsApp or YouTube? Paste the link below, and our verified doctors will analyze it.
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input 
                type="url"
                className="input-field"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://wa.me/... or youtube.com/..."
                required
              />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit for Review"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
