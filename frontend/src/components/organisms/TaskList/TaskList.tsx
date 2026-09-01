import TaskItem from "../../molecules/TaskItem/TaskItem";

import type { Task } from "../../../types/task";
import type { Group } from "../../../types/group";

import styles from "./TaskList.module.css";

interface TaskListProps {
  tasks: Task[];
  groups: Group[];
  onToggle?: (id: string) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskList({
  tasks,
  groups,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  return (
    <div className={styles.list}>
      {tasks.map((task) => {
        const group = groups.find(
          (group) => group.id === task.group_id
        );

        return (
          <TaskItem
            key={task.id}
            title={task.title}
            completed={task.completed}
            dueDate={task.due_date}
            color={group?.color}
            onToggle={() => onToggle?.(task.id)}
            onEdit={() => onEdit?.(task)}
            onDelete={() => onDelete?.(task.id)}
          />
        );
      })}
    </div>
  );
}