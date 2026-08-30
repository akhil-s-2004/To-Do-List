import {
  FormEvent,
  useState,
} from "react";

import Button from "../atoms/Button";
import Input from "../atoms/Input";

interface Props {
  onSubmit: (
    name: string,
  ) => Promise<void>;
}

export default function GroupForm({
  onSubmit,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent,
  ) {
    event.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      await onSubmit(name.trim());

      setName("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="new-group"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="New group"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
      />

      <Button
        type="submit"
        variant="secondary"
        disabled={loading}
      >
        Add
      </Button>
    </form>
  );
}