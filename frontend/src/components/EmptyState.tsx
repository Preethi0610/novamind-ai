import styles from "./EmptyState.module.css";

export default function EmptyState() {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>◆</span>
      <h2 className={styles.heading}>What can I help with?</h2>
      <p className={styles.sub}>
        Send a message to start a conversation with AI.
      </p>
      <div className={styles.suggestions}>
        {[
          "Explain React hooks in simple terms",
          "Write a Python function to reverse a linked list",
          "Compare REST vs GraphQL",
        ].map((s) => (
          <span key={s} className={styles.chip}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
