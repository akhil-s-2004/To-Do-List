import { Plus } from "lucide-react";

import Button from "../../atoms/Button/Button";
import GroupItem from "../../molecules/GroupItem/GroupItem";

import type { Group } from "../../../types/group";

import styles from "./Sidebar.module.css";

interface SidebarProps {
  groups: Group[];

  activeGroup?: string;

  onGroupSelect?: (id?: string) => void;

  onAddGroup?: () => void;

  onEditGroup?: (group: Group) => void;

  onDeleteGroup?: (id: string) => void;
}

export default function Sidebar({
  groups,
  activeGroup,
  onGroupSelect,
  onAddGroup,
  onEditGroup,
  onDeleteGroup,
}: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <button
        type="button"
        className={`${styles.allTasks} ${
          activeGroup === undefined
            ? styles.active
            : ""
        }`}
        onClick={() => onGroupSelect?.()}
      >
        All Tasks
      </button>

      <div className={styles.groupSection}>
        <p className={styles.label}>
          Groups
        </p>

        <div className={styles.groups}>
          {groups.map((group) => (
            <GroupItem
              key={group.id}
              name={group.name}
              color={group.color}
              active={
                group.id === activeGroup
              }
              onClick={() =>
                onGroupSelect?.(group.id)
              }
              onEdit={() =>
                onEditGroup?.(group)
              }
              onDelete={() =>
                onDeleteGroup?.(group.id)
              }
            />
          ))}
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={onAddGroup}
        className={styles.addGroup}
      >
        <Plus size={16} />
        Add group
      </Button>
    </aside>
  );
}