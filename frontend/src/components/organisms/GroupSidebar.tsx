import GroupForm from "../molecules/GroupForm";

import type { Group } from "../../types/group";

interface Props {
  groups: Group[];
  selectedGroup?: string;
  onSelectGroup: (
    groupId?: string,
  ) => void;
  onCreateGroup: (
    name: string,
  ) => Promise<void>;
  onDeleteGroup: (
    id: string,
  ) => Promise<void>;
}

export default function GroupSidebar({
  groups,
  selectedGroup,
  onSelectGroup,
  onCreateGroup,
  onDeleteGroup,
}: Props) {
  return (
    <aside className="group-sidebar">
      <h3>Groups</h3>

      <button
        className={
          !selectedGroup
            ? "selected"
            : ""
        }
        onClick={() =>
          onSelectGroup(undefined)
        }
      >
        All groups
      </button>

      {groups.map((group) => (
        <div
          className="group-row"
          key={group.id}
        >
          <button
            className={
              selectedGroup === group.id
                ? "selected"
                : ""
            }
            onClick={() =>
              onSelectGroup(group.id)
            }
          >
            {group.name}
          </button>

          <button
            className="group-delete"
            onClick={() =>
              onDeleteGroup(group.id)
            }
            aria-label={`Delete ${group.name}`}
          >
            ×
          </button>
        </div>
      ))}

      <GroupForm
        onSubmit={onCreateGroup}
      />
    </aside>
  );
}