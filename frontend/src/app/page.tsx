"use client";

import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import styles from "./page.module.css";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1h-4v-1A4 4 0 0 1 12 2Z" />
        <path d="M10 10.5v1.5h4v-1.5" />
        <path d="M10 14h4" />
        <path d="M9 17l1 5h4l1-5" />
        <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Context-Aware AI",
    desc: "Remembers your full conversation for smarter, more relevant responses.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Lightning Fast",
    desc: "Sub-second responses powered by cutting-edge GPT infrastructure.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Enterprise Secure",
    desc: "End-to-end encryption. Your data never leaves your environment.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="19" cy="18" r="3" />
        <path d="M19 16.5v3l1.5-1.5" />
      </svg>
    ),
    title: "API First",
    desc: "RESTful APIs with SDKs for Python, Node.js, and more.",
  },
];

const STATS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50ms", label: "Avg. Latency" },
  { value: "10M+", label: "API Calls / Day" },
  { value: "500+", label: "Enterprise Clients" },
];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={`${styles.layout} ${chatOpen ? styles.shifted : ""}`}>
      {/* ── Video background ── */}
      <div className={styles.videoBg}>
        <video autoPlay muted loop playsInline className={styles.video}>
          {/* Replace with your own video or use a free one */}
          <source src="/fluid.mp4" type="video/mp4" />
        </video>
        <div className={styles.videoOverlay} />
      </div>

      {/* ── Particles ── */}
      <div className={styles.particles}>
        {[...Array(6)].map((_, i) => (
          <span key={i} className={styles.particle} />
        ))}
      </div>

      {/* ── Left: Landing page ── */}
      <main className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.logoWrap}>
            <span className={styles.star} style={{ top: "-8px", right: "-12px" }}>✦</span>
            <span className={styles.star} style={{ bottom: "-6px", left: "-14px", animationDelay: "1s" }}>✦</span>
            <span className={styles.star} style={{ top: "50%", right: "-22px", animationDelay: "2s", fontSize: "0.5rem" }}>✦</span>
            <div className={styles.logo}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" stroke="url(#grad)" strokeWidth="2" fill="rgba(45,106,79,0.15)" />
                <path d="M16 8L22 11.5V18.5L16 22L10 18.5V11.5L16 8Z" fill="url(#grad)" />
                <defs>
                  <linearGradient id="grad" x1="4" y1="2" x2="28" y2="30">
                    <stop offset="0%" stopColor="#52b788" />
                    <stop offset="100%" stopColor="#d4b483" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          <h1 className={styles.companyName}>NovaMind</h1>
          <p className={styles.tagline}>
            Intelligence that feels natural.
            <br />
            <span className={styles.taglineAccent}>Built for the next generation of builders.</span>
          </p>


          <button className={styles.cta} onClick={() => setChatOpen(true)}>
            Try NovaMind AI
          </button>
        </section>

        {/* Stats */}
        <section className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </section>

        {/* Features */}
        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>Why teams choose NovaMind</h2>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© 2026 NovaMind Inc. All rights reserved.</p>
        </footer>
      </main>

      {/* ── Chat widget ── */}
      <ChatWidget isOpen={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}