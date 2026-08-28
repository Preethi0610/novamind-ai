import styles from "./ErrorBanner.module.css";

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className={styles.banner} role="alert">
      <span className={styles.icon}>⚠</span>
      <p className={styles.text}>{message}</p>
      <button
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label="Dismiss error"
      >
        ✕
      </button>
    </div>
  );
}
