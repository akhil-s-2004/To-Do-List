import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  clearCompletedTasks,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/tasks";

import type {
  CreateTaskData,
  Task,
  UpdateTaskData,
} from "../types/task";

import type { TaskStatus } from "../api/tasks";

export function useTasks(
  status: TaskStatus,
  groupId?: string,
) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks(
        status,
        groupId,
      );

      setTasks(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load tasks",
      );
    } finally {
      setLoading(false);
    }
  }, [status, groupId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function addTask(
    data: CreateTaskData,
  ) {
    const task = await createTask(data);

    await fetchTasks();

    return task;
  }

  async function editTask(
    id: string,
    data: UpdateTaskData,
  ) {
    const task = await updateTask(id, data);

    await fetchTasks();

    return task;
  }

  async function removeTask(id: string) {
    await deleteTask(id);

    await fetchTasks();
  }

  async function clearCompleted() {
    await clearCompletedTasks();

    await fetchTasks();
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    editTask,
    removeTask,
    clearCompleted,
    refreshTasks: fetchTasks,
  };
}