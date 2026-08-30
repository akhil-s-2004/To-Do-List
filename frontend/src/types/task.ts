export interface Task {
  id: string;
  title: string;
  due_date: string | null;
  completed: boolean;
  group_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
  due_date?: string | null;
  group_id?: string | null;
}

export interface UpdateTaskData {
  title?: string;
  due_date?: string | null;
  group_id?: string | null;
}