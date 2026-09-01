import styles from "./Logo.module.css";
import type {CSSProperties} from "react";
import logo from "../../../assets/logo.png";

interface LogoProps {
    height?: CSSProperties["height"]; 
    width?: CSSProperties["width"];  
    alt?: string;
}
export default function Logo({ height = "auto", width = "60px", alt = "Logo" }: LogoProps) {
  return (
    <img
      src={logo}
      alt={alt}
      className={styles.logo}
      style={{ width, height }}
    />
  );
}