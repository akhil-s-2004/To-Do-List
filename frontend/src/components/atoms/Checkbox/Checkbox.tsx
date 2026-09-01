import type { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox(props: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      {...props}
    />
  );
}