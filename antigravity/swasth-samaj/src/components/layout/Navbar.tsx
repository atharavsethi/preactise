import Link from "next/link";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container flex-between navbar-inner">
        <Link href="/" className="logo">
          Swasth<span className="logo-accent">Samaj</span>
        </Link>
        <div className="nav-links">
          <Link href="/sos" className="nav-link" style={{ color: "#dc2626", fontWeight: 700 }}>🩸 Blood SOS</Link>
          <Link href="/locker" className="nav-link">🔒 Locker</Link>
          <Link href="/medications" className="nav-link">💊 Meds</Link>
          <Link href="/cme" className="nav-link" style={{ color: "var(--color-green-dark)" }}>🏆 CME</Link>
          <Link href="/mythbusters" className="nav-link" style={{ color: "var(--color-saffron-dark)" }}>⚡ Mythbusters</Link>
          <Link href="/questions" className="nav-link">Forum</Link>
          <Link href="/ask" className="btn btn-outline">Ask a Question</Link>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.2rem" }}>🌐</span>
            <select 
              className="input-field" 
              style={{ padding: "0.4rem", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--color-cream)", width: "auto" }}
              aria-label="Language selection"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
            </select>
          </div>

          <Link href="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </nav>
  );
}
