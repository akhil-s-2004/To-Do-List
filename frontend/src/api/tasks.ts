import { apiRequest } from "./client";

import type {
  CreateTaskData,
  Task,
  UpdateTaskData,
} from "../types/task";

export type TaskStatus =
  | "all"
  | "active"
  | "completed";

export async function getTasks(
  status: TaskStatus = "all",
  groupId?: string,
) {
  const params = new URLSearchParams();

  params.set("status", status);

  if (groupId) {
    params.set("group_id", groupId);
  }

  return apiRequest<Task[]>(
    `/tasks?${params.toString()}`,
  );
}

export function createTask(
  data: CreateTaskData,
) {
  return apiRequest<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTask(
  id: string,
  data: UpdateTaskData,
) {
  return apiRequest<Task>(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export function deleteTask(id: string) {
  return apiRequest<null>(`/tasks/${id}`, {
    method: "DELETE",
  });
}

export function clearCompletedTasks() {
  return apiRequest<null>("/tasks/completed", {
    method: "DELETE",
  });
}