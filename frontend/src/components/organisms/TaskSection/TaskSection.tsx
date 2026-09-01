import TaskInput from "../../molecules/TaskInput/TaskInput";
import TaskList from "../TaskList/TaskList";

import type { Task } from "../../../types/task";
import type { Group } from "../../../types/group";

import styles from "./TaskSection.module.css";

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  groups: Group[];
  color?: string;
  onToggle?: (id: string) => void;
  onAddTask?: (title: string) => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (id: string) => void;
}

export default function TaskSection({
  title,
  tasks,
  groups,
  color,
  onToggle,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: TaskSectionProps) {
  return (
    <section className={styles.section}>
      <div
        className={styles.heading}
        style={{
          borderTopColor:
            color ?? "var(--color-border)",
        }}
      >
        <h2>{title}</h2>

        <span>{tasks.length}</span>
      </div>

      <TaskList
        tasks={tasks}
        groups={groups}
        onToggle={onToggle}
        onEdit={onEditTask}
        onDelete={onDeleteTask}
      />

      <TaskInput onAdd={onAddTask} />
    </section>
  );
}