import type { TaskStatus } from "../../api/tasks";

interface Props {
  status: TaskStatus;
  onChange: (
    status: TaskStatus,
  ) => void;
}

export default function FilterBar({
  status,
  onChange,
}: Props) {
  const filters: TaskStatus[] = [
    "all",
    "active",
    "completed",
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={
            status === filter
              ? "active"
              : ""
          }
          onClick={() =>
            onChange(filter)
          }
        >
          {filter
            .charAt(0)
            .toUpperCase() +
            filter.slice(1)}
        </button>
      ))}
    </div>
  );
}