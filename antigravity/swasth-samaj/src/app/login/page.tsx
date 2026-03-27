"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <h2 style={{ fontSize: "2.5rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>Welcome Back</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Sign in to continue to your Swasth Samaj dashboard.</p>
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className="input-group">
              <label className="input-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className={`input-field ${styles.customInput}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={`input-field ${styles.customInput}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? "Authenticating..." : "Sign In & Enter Ecosystem"}
            </button>
          </form>

          <div className={styles.authFooter}>
            <p>
              New to Swasth Samaj? <Link href="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
