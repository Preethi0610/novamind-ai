"use client";

import { useState, useEffect } from "react";
import styles from "./LoadingDots.module.css";

const PHASES = [
  { text: "Hmm, let me think...", face: "thinking" },
  { text: "Cooking something up", face: "cooking" },
  { text: "Almost got it!", face: "excited" },
  { text: "Putting words together", face: "writing" },
  { text: "Brain go brrr...", face: "spinning" },
  { text: "One sec, genius at work", face: "cool" },
];

function AlienFace({ variant }: { variant: string }) {
  // Different expressions for the alien
  const faces: Record<string, React.ReactNode> = {
    thinking: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <path d="M15 10.5" strokeWidth="0" />
        {/* Raised eyebrow */}
        <path d="M13.5 8c.5-.7 1.5-1 2.5-.5" strokeWidth="1.5" />
        {/* Wavy mouth */}
        <path d="M8.5 15.5c1-.5 2 .5 3 0s2 .5 3 0" />
      </svg>
    ),
    cooking: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        {/* Closed happy eyes */}
        <path d="M7.5 11c.8-.8 2.2-.8 3 0" />
        <path d="M13.5 11c.8-.8 2.2-.8 3 0" />
        {/* Open mouth */}
        <ellipse cx="12" cy="16" rx="2" ry="1.5" fill="currentColor" stroke="none" />
        {/* Steam lines */}
        <path d="M8 4.5c.5-.8 1-.3 1-1" strokeWidth="1" opacity="0.5" />
        <path d="M12 3c.5-.8 1-.3 1-1" strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    excited: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        {/* Star eyes */}
        <path d="M9 10l.5-1.5.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5L7.5 10.5z" fill="currentColor" stroke="none" />
        <path d="M15 10l.5-1.5.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5z" fill="currentColor" stroke="none" />
        {/* Big smile */}
        <path d="M8 15c1.5 2.5 6.5 2.5 8 0" />
      </svg>
    ),
    writing: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="9" cy="10.5" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="10.5" r="1" fill="currentColor" stroke="none" />
        {/* Tongue out */}
        <path d="M10 15h4" />
        <path d="M12 15v2c0 .5.5 1 1 .5" fill="currentColor" />
      </svg>
    ),
    spinning: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        {/* Spiral eyes */}
        <path d="M9 10.5a1 1 0 1 1 0 .01" />
        <path d="M15 10.5a1 1 0 1 1 0 .01" />
        {/* Dizzy mouth */}
        <path d="M9 16c1 .5 2-.5 3 0s2 .5 3 0" />
      </svg>
    ),
    cool: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        {/* Sunglasses */}
        <rect x="6" y="9" width="4.5" height="3" rx="1" fill="currentColor" stroke="none" />
        <rect x="13.5" y="9" width="4.5" height="3" rx="1" fill="currentColor" stroke="none" />
        <line x1="10.5" y1="10.5" x2="13.5" y2="10.5" />
        {/* Smirk */}
        <path d="M10 16c2 1.5 4 0 5-1" />
      </svg>
    ),
  };

  return <div className={styles.face}>{faces[variant] || faces.thinking}</div>;
}

export default function LoadingDots() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % PHASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = PHASES[phase];

  return (
    <div className={styles.container}>
      {/* Floating particles around the alien */}
      <div className={styles.sparkles}>
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
        <span className={styles.sparkle} />
      </div>

      {/* Alien mascot */}
      <div className={styles.mascotWrap}>
        <div className={styles.mascotBounce}>
          <AlienFace variant={current.face} />
        </div>
        <div className={styles.shadow} />
      </div>

      {/* Speech bubble */}
      <div className={styles.speechBubble}>
        <span className={styles.speechText} key={phase}>
          {current.text}
        </span>
        <div className={styles.dots}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progressTrack}>
        <div className={styles.progressBar} />
      </div>
    </div>
  );
}