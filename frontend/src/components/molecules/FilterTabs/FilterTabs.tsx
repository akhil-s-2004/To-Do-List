import styles from "./FilterTabs.module.css";

export type Filter =
  | "All"
  | "Active"
  | "Completed";

interface FilterTabsProps {
  active?: Filter;
  onChange?: (value: Filter) => void;
}

export default function FilterTabs({
  active = "All",
  onChange,
}: FilterTabsProps) {
  const tabs: Filter[] = [
    "All",
    "Active",
    "Completed",
  ];

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={
            active === tab
              ? styles.active
              : ""
          }
          onClick={() => onChange?.(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}