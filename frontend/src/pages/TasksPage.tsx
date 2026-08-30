import { useState } from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import Header from "../components/organisms/Header";
import GroupSidebar from "../components/organisms/GroupSidebar";
import TaskList from "../components/organisms/TaskList";

import TaskForm from "../components/molecules/TaskForm";
import FilterBar from "../components/molecules/FilterBar";
import Button from "../components/atoms/Button";

import { useAuth } from "../hooks/useAuth";
import { useGroups } from "../hooks/useGroups";
import { useTasks } from "../hooks/useTasks";

import type { TaskStatus } from "../api/tasks";

export default function TasksPage() {
  const navigate = useNavigate();

  const {
    user,
    loading: authLoading,
    signOut,
  } = useAuth();

  const [status, setStatus] =
    useState<TaskStatus>("all");

  const [
    selectedGroup,
    setSelectedGroup,
  ] = useState<string>();

  const groupsState =
    useGroups();

  const tasksState =
    useTasks(
      status,
      selectedGroup,
    );

  if (authLoading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/signin"
        replace
      />
    );
  }

  async function handleLogout() {
    await signOut();

    navigate("/signin");
  }

  async function handleCreateTask(
    data: {
      title: string;
      due_date: string | null;
      group_id: string | null;
    },
  ) {
    await tasksState.addTask(data);
  }

  return (
    <div className="app-page">
      <Header
        user={user}
        onLogout={handleLogout}
      />

      <div className="app-layout">
        <GroupSidebar
          groups={groupsState.groups}
          selectedGroup={selectedGroup}
          onSelectGroup={
            setSelectedGroup
          }
          onCreateGroup={
            groupsState.addGroup
          }
          onDeleteGroup={
            groupsState.removeGroup
          }
        />

        <main className="task-main">
          <div className="task-heading">
            <div>
              <p className="eyebrow">
                YOUR TASKS
              </p>

              <h1>
                Today
              </h1>
            </div>

            <Button
              variant="ghost"
              onClick={
                tasksState.clearCompleted
              }
            >
              Clear completed
            </Button>
          </div>

          <TaskForm
            groups={
              groupsState.groups
            }
            onSubmit={
              handleCreateTask
            }
          />

          <FilterBar
            status={status}
            onChange={setStatus}
          />

          {tasksState.error && (
            <p className="form-error">
              {tasksState.error}
            </p>
          )}

          {tasksState.loading ? (
            <div className="loading">
              Loading tasks...
            </div>
          ) : (
            <TaskList
              tasks={
                tasksState.tasks
              }
              groups={
                groupsState.groups
              }
              onUpdate={
                tasksState.editTask
              }
              onDelete={
                tasksState.removeTask
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}