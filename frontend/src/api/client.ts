const API_URL = import.meta.env.VITE_API_URL;

export interface APIResponse<T> {
  status_code: number;
  status_message: string;
  error_message: string | null;
  response_data: T | null;
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let data: APIResponse<T>;

  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!response.ok) {
    throw new Error(
      data.error_message || "Something went wrong",
    );
  }

  return data.response_data as T;
}