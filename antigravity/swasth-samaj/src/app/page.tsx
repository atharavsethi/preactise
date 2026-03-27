import Link from "next/link";
import styles from "./page.module.css";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>Your Health, <br/>Our <span className="logo-accent">Samaj</span></h1>
            <p className={styles.heroSubtitle}>Join thousands of users getting verified answers from trusted medical professionals, instantly.</p>
            <div className={styles.heroActions}>
              <Link href="/ask" className="btn btn-primary" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
                Ask a Doctor Now
              </Link>
              <Link href="/questions" className="btn btn-outline" style={{ padding: "1rem 2rem", fontSize: "1.1rem" }}>
                Browse Forum
              </Link>
            </div>
            
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <strong>500+</strong>
                <span>Verified Doctors</span>
              </div>
              <div className={styles.statItem}>
                <strong>12k+</strong>
                <span>Questions Answered</span>
              </div>
              <div className={styles.statItem}>
                <strong>24/7</strong>
                <span>Free Access</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.liveCard} ${styles.cardTop}`}>
              <div className={styles.cardHeader}>
                <span className={styles.pulseDot}></span>
                <span className={styles.timeText}>Just Now</span>
              </div>
              <p><strong>Dr. Ananya Sharma</strong> just answered a pediatric query in under 5 mins. ✅</p>
            </div>
            
            <div className={`${styles.liveCard} ${styles.cardMiddle}`}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ fontSize: "2.5rem", background: "rgba(19, 136, 8, 0.1)", borderRadius: "50%", padding: "0.5rem" }}>🏆</div>
                <div>
                  <strong style={{ display: "block", color: "var(--color-green-dark)", fontSize: "1.1rem" }}>Top Contributor</strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Trust Score: 98%</span>
                </div>
              </div>
            </div>

            <div className={`${styles.liveCard} ${styles.cardBottom}`}>
              <div className={styles.cardHeader}>
                <span className={styles.pulseDot} style={{ background: "#dc2626" }}></span>
                <span className={styles.timeText} style={{ color: "#dc2626" }}>Live Emergency</span>
              </div>
              <p>🩸 <strong>3 Active Blood SOS</strong> beacons resolving near your 10km radius.</p>
            </div>
          </div>
        </div>
      </header>

      <section className={`container ${styles.featuresSection}`}>
        <h2 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2rem", color: "var(--color-heading)" }}>Why Swasth Samaj?</h2>
        <div className={styles.featuresGrid}>
          
          <SpotlightCard>
            <div className={styles.featureIcon}>✅</div>
            <h3 className={styles.featureTitle}>100% Verified Answers</h3>
            <p className={styles.featureDesc}>Every medical response is strictly verified. Only registered doctors and medical students can reply to queries.</p>
          </SpotlightCard>

          <SpotlightCard>
            <div className={styles.featureIcon}>🔒</div>
            <h3 className={styles.featureTitle}>Completely Anonymous</h3>
            <p className={styles.featureDesc}>Ask sensitive health questions without revealing your identity. Your privacy is our top priority.</p>
          </SpotlightCard>

          <SpotlightCard>
            <div className={styles.featureIcon}>🏥</div>
            <h3 className={styles.featureTitle}>Find Care Nearby</h3>
            <p className={styles.featureDesc}>Instantly locate top-rated hospitals and verified clinics within your immediate vicinity.</p>
          </SpotlightCard>

        </div>
      </section>

      {/* Footer minimal */}
      <footer className={styles.footer}>
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Swasth Samaj. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
