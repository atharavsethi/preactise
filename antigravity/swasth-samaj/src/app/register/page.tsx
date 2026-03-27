"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../login/page.module.css";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.splitLayout}>
      {/* BRANDING SIDE (Left) */}
      <div className={styles.brandSide}>
        <div className={styles.brandContent}>
          <img src="/logo.png" alt="Swasth Samaj Logo" className={styles.logoImage} />
          <h1 className={styles.brandTitle}>Your Health,<br/>Our <span style={{color: "var(--color-green-dark)"}}>Samaj</span></h1>
          <p className={styles.brandSubtitle}>
            Join thousands of users receiving perfectly verified medical guidance from trusted healthcare professionals, completely securely.
          </p>
          
          <div className={styles.trustBadges}>
            <div className={styles.badge}>✅ 100% Verified Doctors</div>
            <div className={styles.badge}>🔒 Completely Anonymous</div>
            <div className={styles.badge}>🏥 Community Supported</div>
          </div>
        </div>
        
        {/* Floating Decorative Blobs */}
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      {/* FORM SIDE (Right) */}
      <div className={styles.formSide}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2 style={{ fontSize: "2.5rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>Join the Samaj</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Create your Swasth Samaj account securely.</p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className="input-group">
              <label className="input-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className={`input-field ${styles.customInput}`}
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Dr. Jane Smith or Anonymous"
                style={{ padding: "0.8rem" }}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`input-field ${styles.customInput}`}
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                style={{ padding: "0.8rem" }}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`input-field ${styles.customInput}`}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                minLength={6}
                style={{ padding: "0.8rem" }}
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="role">Account Type</label>
              <select
                id="role"
                name="role"
                className={`input-field ${styles.customInput}`}
                value={formData.role}
                onChange={handleChange}
                required
                style={{ padding: "0.8rem" }}
              >
                <option value="USER">Patient / General Public</option>
                <option value="STUDENT">Medical Student</option>
                <option value="DOCTOR">Doctor / Medical Professional</option>
              </select>
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading} style={{ marginTop: "1rem" }}>
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <div className={styles.authFooter} style={{ marginTop: "1.5rem" }}>
            <p>
              Already have an account? <Link href="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
