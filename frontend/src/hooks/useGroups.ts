import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  createGroup,
  deleteGroup,
  getGroups,
  updateGroup,
} from "../api/groups";

import type { Group } from "../types/group";

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null,
  );

  const fetchGroups = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getGroups();

      setGroups(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load groups",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  async function addGroup(name: string) {
    const group = await createGroup({ name });

    await fetchGroups();

    return group;
  }

  async function editGroup(
    id: string,
    name: string,
  ) {
    const group = await updateGroup(
      id,
      name,
    );

    await fetchGroups();

    return group;
  }

  async function removeGroup(id: string) {
    await deleteGroup(id);

    await fetchGroups();
  }

  return {
    groups,
    loading,
    error,
    addGroup,
    editGroup,
    removeGroup,
    refreshGroups: fetchGroups,
  };
}