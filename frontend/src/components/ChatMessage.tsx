"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Message } from "@/utils/api";
import { formatTime } from "@/utils/helpers";
import styles from "./ChatMessage.module.css";

interface ChatMessageProps {
  message: Message;
}

/* ── Alien icon for Nova ── */
function AlienIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Z" />
      <circle cx="9" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="11" r="1.5" fill="currentColor" stroke="none" />
      <path d="M9 16c1 1 5 1 6 0" />
    </svg>
  );
}

/* ── User icon ── */
function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <article
      className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}
      aria-label={`${isUser ? "You" : "Nova"} said`}
    >
      <div className={styles.avatar}>
        {isUser ? <UserIcon /> : <AlienIcon />}
      </div>
      <div className={styles.body}>
        <div className={styles.bubble}>
          {isUser ? (
            <p className={styles.plain}>{message.content}</p>
          ) : (
            <ReactMarkdown
              className={styles.markdown}
              components={{
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const codeString = String(children).replace(/\n$/, "");

                  if (!match) {
                    return (
                      <code className={styles.inlineCode} {...props}>
                        {children}
                      </code>
                    );
                  }

                  return (
                    <SyntaxHighlighter
                      style={oneDark as Record<string, React.CSSProperties>}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: "0.5rem 0",
                        borderRadius: "0.5rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      {codeString}
                    </SyntaxHighlighter>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        <time className={styles.time} dateTime={new Date(message.timestamp).toISOString()}>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </article>
  );
}