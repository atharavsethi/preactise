import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Stepper } from '@/components/ui/Stepper';
import { SplitText, BlurText, ScrollReveal } from '@/components/animations';
import { VerifiedBadge } from '@/components/icons/VerifiedBadge';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.landingPage}>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <div className="container text-center">
          <h1 className={styles.heroTitle}>
            <SplitText text="Real Answers. Verified Doctors. Your Health." />
          </h1>
          <p className={styles.heroSubtitle}>
            <BlurText text="A trusted community where medical professionals answer your health questions." delay={0.8} />
          </p>
          
          <ScrollReveal delay={1.2}>
            <div className={styles.heroActions}>
              <Link href="/ask">
                <Button variant="primary">Ask a Question</Button>
              </Link>
              <Link href="/register/doctor">
                <Button variant="outline">Join as a Doctor</Button>
              </Link>
            </div>
            
            <div className={styles.trustStats}>
              <span>2,400+ Verified Doctors</span>
              <span className={styles.divider}>|</span>
              <span>18,000+ Questions Answered</span>
              <span className={styles.divider}>|</span>
              <span>99% Moderated</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className={styles.section}>
        <div className="container text-center">
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>How MedTrust Works</h2>
            <p className={styles.sectionSubtitle}>Your journey to trusted health information in three simple steps.</p>
          </ScrollReveal>

          <div className={styles.stepsGrid} style={{ display: 'block' }}>
            <ScrollReveal delay={0.2}>
              <Stepper steps={[
                { title: 'Post Your Question', description: 'Ask confidentially about symptoms, nutrition, or general health concerns.', icon: '📝' },
                { title: 'Doctors Respond', description: 'Our verified medical professionals review and answer your questions accurately.', icon: '🩺' },
                { title: 'Get Trusted Answers', description: 'Receive reliable medical guidance and find care providers near you if needed.', icon: '✅' }
              ]} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. FEATURED QUESTIONS SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>Recent Verified Answers</h2>
          </ScrollReveal>

          <div className={styles.qaGrid}>
            {[1, 2].map((i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <SpotlightCard className={styles.qaCard}>
                  <div className={styles.tag}>Cardiology</div>
                  <h3 className={styles.qaTitle}>Is occasional heart palpitation normal after intense cardio?</h3>
                  <p className={styles.qaPreview}>
                    "While occasional palpitations during recovery can be harmless and related to adrenaline, persistent..."
                  </p>
                  <div className={styles.qaFooter}>
                    <div className={styles.author}>
                      <span className={styles.authorName}>Dr. Sarah Jenkins</span>
                      <VerifiedBadge type="doctor" />
                    </div>
                    <Link href="#" className={styles.readMore}>Read Full Answer</Link>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRUST & VERIFICATION SECTION */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.trustFlex}>
            <ScrollReveal className={styles.trustContent}>
              <h2 className={styles.sectionTitle} style={{ textAlign: 'left' }}>Why Trust Us?</h2>
              <ul className={styles.trustList}>
                <li>
                  <VerifiedBadge type="doctor" />
                  <div>
                    <h4>Rigorous Medical Verification</h4>
                    <p>Every professional must provide active credentials and medical licenses before answering.</p>
                  </div>
                </li>
                <li>
                  <VerifiedBadge type="doctor" />
                  <div>
                    <h4>Active Moderation</h4>
                    <p>Answers are continuously monitored by our admin panel to ensure zero health misinformation.</p>
                  </div>
                </li>
              </ul>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3} className={styles.trustImageWrapper}>
               <SpotlightCard className={styles.trustBadgeBig}>
                 <div className={styles.shieldIcon}>🛡️</div>
                 <h3>MedTrust Verified</h3>
                 <p>100% Medical Integrity</p>
               </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. NEARBY HOSPITALS MODULE PREVIEW */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container text-center">
          <ScrollReveal>
            <h2 className={styles.sectionTitle}>Find Care Near You</h2>
            <p className={styles.sectionSubtitle}>Turn answers into action with our localized trusted care provider directory.</p>
            <GlassCard className={styles.mapPlaceholder}>
              <span className={styles.mapIcon}>📍</span>
              <p>Location Array Loading... (Geolocation API Interactive Map Here)</p>
              <Button variant="primary" style={{ marginTop: '1rem' }}>Find Hospitals</Button>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.disclaimer}>
            <strong>Disclaimer:</strong> This platform is for guidance and informational purposes only. Always consult a licensed physician or visit an emergency room for critical conditions.
          </p>
          <div className={styles.footerLinks}>
            <span>&copy; {(new Date()).getFullYear()} MedTrust. All rights reserved.</span>
            <div className={styles.links}>
              <Link href="#">Terms</Link>
              <Link href="#">Privacy</Link>
              <Link href="#">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
