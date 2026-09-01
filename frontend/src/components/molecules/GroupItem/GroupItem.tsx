import { useState } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import ColorDot from "../../atoms/ColorDot/ColorDot";
import IconButton from "../../atoms/IconButton/IconButton";

import styles from "./GroupItem.module.css";

interface GroupItemProps {
  name: string;
  color: string;
  active?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function GroupItem({
  name,
  color,
  active = false,
  onClick,
  onEdit,
  onDelete,
}: GroupItemProps) {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  return (
    <div
      className={`${styles.item} ${
        active ? styles.active : ""
      }`}
    >
      <button
        type="button"
        className={styles.select}
        onClick={onClick}
      >
        <ColorDot color={color} />

        <span>{name}</span>
      </button>

      <div className={styles.actions}>
        <IconButton
          type="button"
          aria-label="Group actions"
          onClick={() =>
            setIsMenuOpen((prev) => !prev)
          }
        >
          <MoreVertical size={16} />
        </IconButton>

        {isMenuOpen && (
          <div className={styles.menu}>
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onEdit?.();
              }}
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMenuOpen(false);
                onDelete?.();
              }}
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}