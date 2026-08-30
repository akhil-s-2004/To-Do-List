import { apiRequest } from "./client";

import type {
  CreateGroupData,
  Group,
} from "../types/group";

export function getGroups() {
  return apiRequest<Group[]>("/groups");
}

export function createGroup(
  data: CreateGroupData,
) {
  return apiRequest<Group>("/groups", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateGroup(
  id: string,
  name: string,
) {
  return apiRequest<Group>(`/groups/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      name,
    }),
  });
}

export function deleteGroup(id: string) {
  return apiRequest<null>(`/groups/${id}`, {
    method: "DELETE",
  });
}