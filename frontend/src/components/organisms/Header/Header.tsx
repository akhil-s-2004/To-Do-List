import { Menu, Plus } from "lucide-react";
import Logo from "../../atoms/Logo/Logo";
import IconButton from "../../atoms/IconButton/IconButton";
import styles from "./Header.module.css";

interface HeaderProps {
  onMenuClick?: () => void;
  onAddClick?: () => void;
}

export default function Header({
  onMenuClick,
  onAddClick,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <IconButton
          className={styles.menu}
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu size={19} />
        </IconButton>

        <Logo />
      </div>

      <IconButton
        onClick={onAddClick}
        aria-label="Add task"
      >
        <Plus size={19} />
      </IconButton>
    </header>
  );
}