import { useMemo, useState } from "react";

import Header from "../../components/organisms/Header/Header";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import TaskSection from "../../components/organisms/TaskSection/TaskSection";
import TaskModal from "../../components/organisms/TaskModal/TaskModal";
import GroupModal from "../../components/organisms/GroupModal/GroupModal";
import FilterTabs from "../../components/molecules/FilterTabs/FilterTabs";
import Button from "../../components/atoms/Button/Button";

import type { Task } from "../../types/task";
import type { Group } from "../../types/group";

import styles from "./TasksPage.module.css";

type Filter = "All" | "Active" | "Completed";

const initialGroups: Group[] = [
  {
    id: "work-group-id",
    name: "Work",
    color: "#7C6A5B",
  },
  {
    id: "personal-group-id",
    name: "Personal",
    color: "#657B69",
  },
];

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Finish frontend",
    due_date: "2026-09-02",
    completed: false,
    group_id: "work-group-id",
    created_at: "2026-09-01T18:33:30.198Z",
    updated_at: "2026-09-01T18:33:30.198Z",
  },
  {
    id: "task-2",
    title: "Review backend API",
    due_date: "2026-09-02",
    completed: false,
    group_id: "work-group-id",
    created_at: "2026-09-01T18:33:30.198Z",
    updated_at: "2026-09-01T18:33:30.198Z",
  },
  {
    id: "task-3",
    title: "Buy groceries",
    due_date: "2026-09-02",
    completed: true,
    group_id: "personal-group-id",
    created_at: "2026-09-01T18:33:30.198Z",
    updated_at: "2026-09-01T18:33:30.198Z",
  },
];

export default function TasksPage() {
  const [groups, setGroups] =
    useState<Group[]>(initialGroups);

  const [taskList, setTaskList] =
    useState<Task[]>(initialTasks);

  const [activeGroup, setActiveGroup] =
    useState<string | undefined>(undefined);

  const [filter, setFilter] =
    useState<Filter>("All");

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState<Task | undefined>(undefined);

  const [isGroupModalOpen, setIsGroupModalOpen] =
    useState(false);

  const [editingGroup, setEditingGroup] =
    useState<Group | undefined>(undefined);

  /*
   * -----------------------------
   * TASKS
   * -----------------------------
   */

  const handleToggleTask = (id: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updated_at:
                new Date().toISOString(),
            }
          : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTaskList((prevTasks) =>
      prevTasks.filter(
        (task) => task.id !== id
      )
    );
  };

  const handleClearCompleted = () => {
    setTaskList((prevTasks) =>
      prevTasks.filter(
        (task) => !task.completed
      )
    );
  };

  const handleSaveTask = (data: {
    title: string;
    due_date: string;
    group_id: string;
  }) => {
    if (editingTask) {
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: data.title,
                due_date: data.due_date,
                group_id: data.group_id,
                updated_at:
                  new Date().toISOString(),
              }
            : task
        )
      );
    } else {
      const now =
        new Date().toISOString();

      const newTask: Task = {
        id: crypto.randomUUID(),
        title: data.title,
        due_date: data.due_date,
        completed: false,
        group_id: data.group_id,
        created_at: now,
        updated_at: now,
      };

      setTaskList((prevTasks) => [
        ...prevTasks,
        newTask,
      ]);
    }

    setIsTaskModalOpen(false);
    setEditingTask(undefined);
  };

  const handleInlineAdd = (
    title: string
  ) => {
    const now =
      new Date().toISOString();

    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      due_date: "",
      completed: false,
      group_id:
        activeGroup ??
        groups[0]?.id ??
        "",
      created_at: now,
      updated_at: now,
    };

    setTaskList((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);
  };

  /*
   * -----------------------------
   * GROUPS
   * -----------------------------
   */

  const handleSaveGroup = (data: {
    name: string;
    color: string;
  }) => {
    if (editingGroup) {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === editingGroup.id
            ? {
                ...group,
                name: data.name,
                color: data.color,
              }
            : group
        )
      );
    } else {
      const newGroup: Group = {
        id: crypto.randomUUID(),
        name: data.name,
        color: data.color,
      };

      setGroups((prevGroups) => [
        ...prevGroups,
        newGroup,
      ]);
    }

    setIsGroupModalOpen(false);
    setEditingGroup(undefined);
  };

  const handleDeleteGroup = (
    id: string
  ) => {
    setGroups((prevGroups) =>
      prevGroups.filter(
        (group) => group.id !== id
      )
    );

    /*
     * For Phase 1:
     * deleting a group leaves its tasks
     * without a valid group.
     */
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.group_id === id
          ? {
              ...task,
              group_id: "",
            }
          : task
      )
    );

    if (activeGroup === id) {
      setActiveGroup(undefined);
    }
  };

  /*
   * -----------------------------
   * FILTERING
   * -----------------------------
   */

  const visibleTasks = useMemo(() => {
    let result = taskList;

    if (activeGroup !== undefined) {
      result = result.filter(
        (task) =>
          task.group_id === activeGroup
      );
    }

    if (filter === "Active") {
      result = result.filter(
        (task) => !task.completed
      );
    }

    if (filter === "Completed") {
      result = result.filter(
        (task) => task.completed
      );
    }

    return result;
  }, [
    taskList,
    activeGroup,
    filter,
  ]);

  const activeGroupData = groups.find(
    (group) => group.id === activeGroup
  );

  return (
    <div className={styles.page}>
      <Header
        onAddClick={() => {
          setEditingTask(undefined);
          setIsTaskModalOpen(true);
        }}
      />

      <div className={styles.layout}>
        <Sidebar
          groups={groups}
          activeGroup={activeGroup}
          onGroupSelect={setActiveGroup}
          onAddGroup={() => {
            setEditingGroup(undefined);
            setIsGroupModalOpen(true);
          }}
          onEditGroup={(group) => {
            setEditingGroup(group);
            setIsGroupModalOpen(true);
          }}
          onDeleteGroup={handleDeleteGroup}
        />

        <main className={styles.content}>
          <div className={styles.top}>
            <div>
              <p className={styles.eyebrow}>
                Today
              </p>

              <h1>
                {activeGroupData?.name ??
                  "All tasks"}
              </h1>
            </div>

            <div className={styles.controls}>
              <FilterTabs
                active={filter}
                onChange={(value) =>
                  setFilter(value as Filter)
                }
              />

              {taskList.some(
                (task) => task.completed
              ) && (
                <Button
                  variant="ghost"
                  onClick={
                    handleClearCompleted
                  }
                >
                  Clear completed
                </Button>
              )}
            </div>
          </div>

          <TaskSection
            title={
              activeGroupData?.name ??
              "All Tasks"
            }
            tasks={visibleTasks}
            groups={groups}
            color={
              activeGroupData?.color
            }
            onToggle={
              handleToggleTask
            }
            onAddTask={
              handleInlineAdd
            }
            onEditTask={(task) => {
              setEditingTask(task);
              setIsTaskModalOpen(true);
            }}
            onDeleteTask={
              handleDeleteTask
            }
          />
        </main>
      </div>

      {isTaskModalOpen && (
        <TaskModal
          groups={groups}
          task={editingTask}
          defaultGroupId={activeGroup}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTask(undefined);
          }}
          onSave={handleSaveTask}
        />
      )}

      {isGroupModalOpen && (
        <GroupModal
          group={editingGroup}
          onClose={() => {
            setIsGroupModalOpen(false);
            setEditingGroup(undefined);
          }}
          onSave={handleSaveGroup}
        />
      )}
    </div>
  );
}