"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MOCK_DOCTORS, MOCK_QUERIES } from "@/lib/mockData";
import SwasthChatbox from "@/components/ui/SwasthChatbox";

export default function Home() {
  const featuredDoctors = MOCK_DOCTORS.slice(0, 4);
  const recentQueries = MOCK_QUERIES;

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
                <strong>1,200+</strong>
                <span>Verified Doctors</span>
              </div>
              <div className={styles.statItem}>
                <strong>45k+</strong>
                <span>Patients Helped</span>
              </div>
              <div className={styles.statItem}>
                <strong>98%</strong>
                <span>Satisfaction</span>
              </div>
              <div className={styles.statItem}>
                <strong>200+</strong>
                <span>Hospitals</span>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.liveCard} ${styles.cardTop}`}>
              <div className={styles.cardHeader}>
                <span className={styles.pulseDot}></span>
                <span className={styles.timeText}>Just Now</span>
              </div>
              <p><strong>Dr. Priya Ramesh</strong> just answered a cardiac query in under 8 mins. ✅</p>
            </div>
            <div className={`${styles.liveCard} ${styles.cardMiddle}`}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{ fontSize: "2.5rem", background: "rgba(19, 136, 8, 0.1)", borderRadius: "50%", padding: "0.5rem" }}>🏆</div>
                <div>
                  <strong style={{ display: "block", color: "var(--color-green-dark)", fontSize: "1.1rem" }}>Top Community Award</strong>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Trust Score: 99.4%</span>
                </div>
              </div>
            </div>
            <div className={`${styles.liveCard} ${styles.cardBottom}`}>
              <div className={styles.cardHeader}>
                <span className={styles.pulseDot} style={{ background: "#dc2626" }}></span>
                <span className={styles.timeText} style={{ color: "#dc2626" }}>Live SOS</span>
              </div>
              <p>🩸 <strong>O+ Blood Required</strong> at Apollo Hospital. 2 donors nearby.</p>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURED DOCTORS */}
      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2>Featured Specialists</h2>
          <Link href="/doctors" className={styles.viewMore}>View the Chroma Grid →</Link>
        </div>
        <div className={styles.doctorsGrid}>
          {featuredDoctors.map(doc => (
            <div key={doc.id} className={styles.doctorCard}>
              <div className={styles.docHeader}>
                <div className={styles.avatarMini}>{doc.name[0]}</div>
                <div>
                  <h4 className={styles.docName}>{doc.name} {doc.verified ? "✅" : ""}</h4>
                  <p className={styles.docSpec}>{doc.specialization}</p>
                </div>
              </div>
              <div className={styles.docMeta}>
                <span>⭐ {doc.rating}</span>
                <span>{doc.experience}y Exp.</span>
              </div>
              <Link href="/doctors" className={styles.profileBtn}>View Profile</Link>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT QUERIES */}
      <section className={styles.lightSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Recent Health Queries</h2>
            <Link href="/questions" className={styles.viewMore}>Browse Forum →</Link>
          </div>
          <div className={styles.queriesGrid}>
            {recentQueries.map(query => (
              <div key={query.id} className={styles.queryCard}>
                <span className={styles.queryTag}>{query.tags[0]}</span>
                <h4 className={styles.queryTitle}>{query.title}</h4>
                <p className={styles.queryContent}>{query.content.slice(0, 100)}...</p>
                <div className={styles.queryFooter}>
                  <span>By {query.user}</span>
                  {query.answeredBy && <span className={styles.answeredBadge}>Answered by {query.answeredBy} ✅</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOOD SOS CTA */}
      <section className={`container ${styles.sosBanner}`}>
        <div className={styles.sosContent}>
          <div className={styles.sosIcon}>🩸</div>
          <div>
            <h3>Urgent Blood Requirement?</h3>
            <p>Post an SOS request or find donors in your local Samaj area instantly.</p>
          </div>
        </div>
        <Link href="/sos" className="btn btn-primary" style={{ background: "#dc2626" }}>
          Go to Blood Hub
        </Link>
      </section>

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

      <footer className={styles.footer}>
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Swasth Samaj. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Buttons */}
      <button className={styles.fabHelp}>💬 Help</button>
      <SwasthChatbox />
    </div>
  );
}
