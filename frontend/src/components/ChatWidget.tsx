"use client";

import { useRef, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import LoadingDots from "./LoadingDots";
import ErrorBanner from "./ErrorBanner";
import { useChat } from "@/hooks/useChat";
import styles from "./ChatWidget.module.css";

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const { messages, isLoading, error, send, reset, dismissError, bottomRef } =
    useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <>
      {/* ── Floating trigger button ── */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabHidden : ""}`}
        onClick={onToggle}
        aria-label="Open chat"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <span className={styles.fabPulse} />
      </button>

      {/* ── Side panel ── */}
      <aside className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.alienAvatar}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
                <path d="M8 11c0-1 .5-2.5 2-2.5S12 10 12 11M12 11c0-1 .5-2.5 2-2.5s2 1.5 2 2.5" />
                <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />
                <path d="M9 16c1 1 5 1 6 0" />
              </svg>
            </div>
            <div>
              <p className={styles.headerTitle}>NovaMind AI</p>
              <p className={styles.headerStatus}>
                {isLoading ? "Thinking..." : "Online"}
              </p>
            </div>
          </div>
          <div className={styles.headerActions}>
            {messages.length > 0 && (
              <button className={styles.actionBtn} onClick={reset} aria-label="Clear chat" title="Clear chat">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </button>
            )}
            <button className={styles.actionBtn} onClick={onToggle} aria-label="Close chat" title="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.length === 0 && !isLoading ? (
            <div className={styles.empty}>
              <div className={styles.emptyGlow} />
              <div className={styles.emptyAlien}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
                  <path d="M8 11c0-1 .5-2.5 2-2.5S12 10 12 11M12 11c0-1 .5-2.5 2-2.5s2 1.5 2 2.5" />
                  <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />
                  <path d="M9 16c1 1 5 1 6 0" />
                </svg>
              </div>
              <p className={styles.emptyTitle}>Hey, I'm Nova</p>
              <p className={styles.emptyText}>
                Your AI assistant. Ask me to write code, explain concepts, or brainstorm ideas.
              </p>
              <div className={styles.emptyChips}>
                {[
                  "Explain React hooks",
                  "Write a Python script",
                  "Compare REST vs GraphQL",
                ].map((text) => (
                  <button key={text} className={styles.chip} onClick={() => send(text)}>
                    {text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isLoading && <LoadingDots />}
            </>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Error */}
        {error && <ErrorBanner message={error} onDismiss={dismissError} />}

        {/* Input with mascot */}
        <div className={styles.inputArea}>
          {isLoading && (
            <div className={styles.mascot}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
                <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />
                <path d="M9 16c1 1 5 1 6 0" />
              </svg>
            </div>
          )}
          <ChatInput onSend={send} disabled={isLoading} />
        </div>
      </aside>
    </>
  );
}