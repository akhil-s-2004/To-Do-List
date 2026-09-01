import { useState } from "react";
import { Plus } from "lucide-react";

import Input from "../../atoms/Input/Input";
import IconButton from "../../atoms/IconButton/IconButton";

import styles from "./TaskInput.module.css";

interface TaskInputProps {
  onAdd?: (title: string) => void;
}

export default function TaskInput({
  onAdd,
}: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    onAdd?.(trimmedTitle);
    setTitle("");
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Input
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
        onKeyDown={handleKeyDown}
        placeholder="Add a task..."
      />

      <IconButton
        type="button"
        onClick={handleAdd}
        aria-label="Add task"
      >
        <Plus size={18} />
      </IconButton>
    </div>
  );
}