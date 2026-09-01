import styles from "./ColorDot.module.css";

interface ColorDotProps {
  color: string;
  size?: number;
}

export default function ColorDot({
  color,
  size = 10,
}: ColorDotProps) {
  return (
    <span
      className={styles.dot}
      style={{
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
}