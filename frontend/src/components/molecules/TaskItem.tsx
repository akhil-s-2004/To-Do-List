import {
  useState,
} from "react";

import Button from "../atoms/Button";
import Input from "../atoms/Input";

import type { Task } from "../../types/task";
import type { Group } from "../../types/group";

interface Props {
  task: Task;
  groups: Group[];
  onUpdate: (
    id: string,
    data: {
      title?: string;
      completed?: boolean;
    },
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskItem({
  task,
  groups,
  onUpdate,
  onDelete,
}: Props) {
  const [editing, setEditing] =
    useState(false);

  const [title, setTitle] =
    useState(task.title);

  const [loading, setLoading] =
    useState(false);

  async function handleToggle() {
    try {
      setLoading(true);

      await onUpdate(task.id, {
        completed: !task.completed,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!title.trim()) return;

    try {
      setLoading(true);

      await onUpdate(task.id, {
        title: title.trim(),
      });

      setEditing(false);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);

      await onDelete(task.id);
    } finally {
      setLoading(false);
    }
  }

  const groupName = task.group_id
    ? groups.find(
        (group) =>
          group.id === task.group_id,
      )?.name
    : null;

  return (
    <div
      className={`task-item ${
        task.completed ? "completed" : ""
      }`}
    >
      <button
        className="task-check"
        onClick={handleToggle}
        disabled={loading}
        aria-label="Toggle task completion"
      >
        {task.completed ? "✓" : ""}
      </button>

      <div className="task-content">
        {editing ? (
          <Input
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />
        ) : (
          <div className="task-title">
            {task.title}
          </div>
        )}

        <div className="task-meta">
          {task.due_date && (
            <span>
              Due {task.due_date}
            </span>
          )}

          {groupName && (
            <span>{groupName}</span>
          )}
        </div>
      </div>

      <div className="task-actions">
        {editing ? (
          <>
            <Button
              variant="secondary"
              onClick={handleSave}
              disabled={loading}
            >
              Save
            </Button>

            <Button
              variant="ghost"
              onClick={() =>
                setEditing(false)
              }
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="ghost"
            onClick={() =>
              setEditing(true)
            }
          >
            Edit
          </Button>
        )}

        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}