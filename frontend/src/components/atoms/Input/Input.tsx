import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  className = "",
  ...props
}: InputProps) {
  return (
    <label className={styles.wrapper}>
      {label && (
        <span className={styles.label}>
          {label}
        </span>
      )}

      <input
        className={`${styles.input} ${className}`}
        {...props}
      />
    </label>
  );
}