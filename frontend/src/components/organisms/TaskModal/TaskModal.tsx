import { useEffect, useState } from "react";
import { X } from "lucide-react";

import Button from "../../atoms/Button/Button";
import IconButton from "../../atoms/IconButton/IconButton";
import Input from "../../atoms/Input/Input";

import type { Task } from "../../../types/task";
import type { Group } from "../../../types/group";

import styles from "./TaskModal.module.css";

interface TaskModalProps {
  groups: Group[];
  task?: Task;
  defaultGroupId?: string;

  onClose: () => void;

  onSave: (data: {
    title: string;
    due_date: string;
    group_id: string;
  }) => void;
}

export default function TaskModal({
  groups,
  task,
  defaultGroupId,
  onClose,
  onSave,
}: TaskModalProps) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState(
    task?.title ?? ""
  );

  const [groupId, setGroupId] = useState(
    task?.group_id ??
      defaultGroupId ??
      groups[0]?.id ??
      ""
  );

  const [dueDate, setDueDate] = useState(
    task?.due_date ?? ""
  );

  useEffect(() => {
    setTitle(task?.title ?? "");

    setGroupId(
      task?.group_id ??
        defaultGroupId ??
        groups[0]?.id ??
        ""
    );

    setDueDate(task?.due_date ?? "");
  }, [task, defaultGroupId, groups]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || !groupId) {
      return;
    }

    onSave({
      title: trimmedTitle,
      due_date: dueDate,
      group_id: groupId,
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
            {isEditing ? "Edit task" : "Add task"}
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
          <div className={styles.field}>
            <Input
              label="Task"
              id="task-title"
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="task-group">
              Group
            </label>

            <select
              id="task-group"
              value={groupId}
              onChange={(event) =>
                setGroupId(event.target.value)
              }
            >
              {groups.map((group) => (
                <option
                  key={group.id}
                  value={group.id}
                >
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="task-date">
              Date
            </label>

            <input
              id="task-date"
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
            />
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
              {isEditing ? "Save changes" : "Add task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}