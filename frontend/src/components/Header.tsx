import styles from "./Header.module.css";

interface HeaderProps {
  messageCount: number;
  onClear: () => void;
}

export default function Header({ messageCount, onClear }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>◆</span>
        <h1 className={styles.title}>AI Chat</h1>
      </div>
      {messageCount > 0 && (
        <button className={styles.clearBtn} onClick={onClear}>
          Clear chat
        </button>
      )}
    </header>
  );
}
