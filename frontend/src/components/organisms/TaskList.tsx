import TaskItem from "../molecules/TaskItem";

import type { Task } from "../../types/task";
import type { Group } from "../../types/group";

interface Props {
  tasks: Task[];
  groups: Group[];
  onUpdate: (
    id: string,
    data: {
      title?: string;
      completed?: boolean;
    },
  ) => Promise<void>;
  onDelete: (
    id: string,
  ) => Promise<void>;
}

export default function TaskList({
  tasks,
  groups,
  onUpdate,
  onDelete,
}: Props) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <h3>No tasks here</h3>
        <p>
          Add a task above to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          groups={groups}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}