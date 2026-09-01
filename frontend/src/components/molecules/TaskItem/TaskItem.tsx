import { useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import Checkbox from "../../atoms/Checkbox/Checkbox";
import IconButton from "../../atoms/IconButton/IconButton";

import styles from "./TaskItem.module.css";

interface TaskItemProps {
  title: string;
  dueDate?: string;
  completed?: boolean;
  color?: string;
  onToggle?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskItem({
  title,
  dueDate,
  completed = false,
  color,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleEdit = () => {
    setIsMenuOpen(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    onDelete?.();
  };

  return (
    <div className={styles.item}>
      <Checkbox
        checked={completed}
        onChange={onToggle}
      />

      <span
        className={styles.line}
        style={{
          backgroundColor:
            color ?? "var(--color-border)",
        }}
      />

      <span
        className={`${styles.title} ${
          completed ? styles.completed : ""
        }`}
      >
        {title}
      </span>

      {dueDate && (
        <span className={styles.date}>
          {dueDate}
        </span>
      )}

      <div className={styles.actions}>
        <IconButton
          type="button"
          aria-label="Task actions"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <MoreVertical size={17} />
        </IconButton>

        {isMenuOpen && (
          <div className={styles.menu}>
            <button
              type="button"
              onClick={handleEdit}
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
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