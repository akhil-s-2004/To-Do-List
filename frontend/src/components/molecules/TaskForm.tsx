import {
  FormEvent,
  useState,
} from "react";

import Button from "../atoms/Button";
import Input from "../atoms/Input";

import type { Group } from "../../types/group";

interface Props {
  groups: Group[];
  onSubmit: (data: {
    title: string;
    due_date: string | null;
    group_id: string | null;
  }) => Promise<void>;
}

export default function TaskForm({
  groups,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [groupId, setGroupId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    if (!title.trim()) return;

    try {
      setLoading(true);

      await onSubmit({
        title: title.trim(),
        due_date: dueDate || null,
        group_id: groupId || null,
      });

      setTitle("");
      setDueDate("");
      setGroupId("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="task-form"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) =>
          setTitle(event.target.value)
        }
      />

      <input
        type="date"
        value={dueDate}
        onChange={(event) =>
          setDueDate(event.target.value)
        }
      />

      <select
        value={groupId}
        onChange={(event) =>
          setGroupId(event.target.value)
        }
      >
        <option value="">No group</option>

        {groups.map((group) => (
          <option
            key={group.id}
            value={group.id}
          >
            {group.name}
          </option>
        ))}
      </select>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add task"}
      </Button>
    </form>
  );
}