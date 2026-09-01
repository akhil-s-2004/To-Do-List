import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../../atoms/Button/Button";
import IconButton from "../../atoms/IconButton/IconButton";
import Input from "../../atoms/Input/Input";
import ColorDot from "../../atoms/ColorDot/ColorDot";

import type { Group } from "../../../types/group";

import styles from "./GroupModal.module.css";

const COLORS = [
  "#7C6A5B",
  "#657B69",
  "#6B7280",
  "#7C5C70",
  "#5F7487",
  "#8A6A45",
];

interface GroupModalProps {
  group?: Group;
  onClose: () => void;

  onSave: (data: {
    name: string;
    color: string;
  }) => void;
}

export default function GroupModal({
  group,
  onClose,
  onSave,
}: GroupModalProps) {
  const isEditing = Boolean(group);

  const [name, setName] = useState(
    group?.name ?? ""
  );

  const [color, setColor] = useState(
    group?.color ?? COLORS[0]
  );

  useEffect(() => {
    setName(group?.name ?? "");
    setColor(group?.color ?? COLORS[0]);
  }, [group]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    onSave({
      name: trimmedName,
      color,
    });
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={onClose}
    >
      <div
        className={styles.modal}
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className={styles.header}>
          <h2>
            {isEditing ? "Edit group" : "Add group"}
          </h2>

          <IconButton
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </IconButton>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Group name"
            placeholder="e.g. Work"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            autoFocus
          />

          <div className={styles.colorField}>
            <span className={styles.label}>
              Color
            </span>

            <div className={styles.colors}>
              {COLORS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`${styles.colorOption} ${
                    color === option
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => setColor(option)}
                  aria-label={`Select ${option}`}
                >
                  <ColorDot
                    color={option}
                    size={18}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditing ? "Save changes" : "Add group"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}