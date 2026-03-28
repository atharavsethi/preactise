"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import { useMockStore, UserRole } from "@/lib/mockStore";

export default function Login() {
  const router = useRouter();
  const { login } = useMockStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("PATIENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulated mock login
    setTimeout(() => {
      let name = "John Doe";
      let isVerified = true;

      if (role === 'DOCTOR') name = "Dr. Ananya Sharma";
      if (role === 'STUDENT') {
        name = "Rahul Varma";
        isVerified = false;
      }
      if (role === 'ADMIN') name = "Admin User";

      login({ 
        name, 
        role, 
        isVerified,
        avatar: role === 'PATIENT' ? "https://api.dicebear.com/7.x/avataaars/svg?seed=John" : undefined 
      });

      router.push("/");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={styles.splitLayout}>
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
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2 style={{ fontSize: "2.5rem", color: "var(--color-heading)", marginBottom: "0.5rem" }}>Welcome Back</h2>
            <p style={{ color: "var(--color-text-muted)" }}>Sign in to continue to your Swasth Samaj dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.authForm}>
            <div className="input-group">
              <label className="input-label">Select Your Role</label>
              <div className={styles.roleGrid}>
                {(['PATIENT', 'DOCTOR', 'STUDENT', 'ADMIN'] as UserRole[]).map(r => (
                  <div 
                    key={r} 
                    className={`${styles.roleOption} ${role === r ? styles.roleActive : ''}`}
                    onClick={() => setRole(r)}
                  >
                    <span className={styles.roleIcon}>
                      {r === 'PATIENT' ? '👤' : r === 'DOCTOR' ? '👨‍⚕️' : r === 'STUDENT' ? '🎓' : '⚙️'}
                    </span>
                    <span className={styles.roleName}>{r}</span>
                  </div>
                ))}
              </div>
            </div>

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
              {loading ? "Authenticating..." : `Sign In as ${role}`}
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
