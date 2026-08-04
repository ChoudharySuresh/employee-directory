// components/employee/FilterBar.tsx
import type { Filters } from "@/utils/filterEmployees";

interface FilterBarProps {
  filters: Filters;
  onChange: (next: Filters) => void;
  departments: string[];
  countries: string[];
  genders: string[];
}

const FilterBar = ({
  filters,
  onChange,
  departments,
  countries,
  genders,
}: FilterBarProps) => {
  // single generic updater — avoids writing 6 separate onChange handlers
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-row flex-nowrap items-center gap-3 overflow-x-auto p-2">
      <input
        type="text"
        placeholder="Search name or email"
        value={filters.search}
        onChange={(e) => update("search", e.target.value)}
        className="min-w-[220px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      />

      <select
        value={filters.department}
        onChange={(e) => update("department", e.target.value)}
        className="min-w-[170px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        <option value="all">All Departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={filters.gender}
        onChange={(e) => update("gender", e.target.value)}
        className="min-w-[150px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        <option value="all">All Genders</option>
        {genders.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <select
        value={filters.country}
        onChange={(e) => update("country", e.target.value)}
        className="min-w-[155px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        <option value="all">All Countries</option>
        {countries.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2 text-sm">
        <span className="whitespace-nowrap">Age</span>
        <input
          type="number"
          value={filters.ageMin}
          onChange={(e) => update("ageMin", Number(e.target.value))}
          className="w-16 rounded border border-border bg-background px-2 py-1 text-foreground"
        />
        <span>-</span>
        <input
          type="number"
          value={filters.ageMax}
          onChange={(e) => update("ageMax", Number(e.target.value))}
          className="w-16 rounded border border-border bg-background px-2 py-1 text-foreground"
        />
      </div>

      <select
        value={filters.sortBy}
        onChange={(e) => update("sortBy", e.target.value as Filters["sortBy"])}
        className="min-w-[145px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        <option value="name">Sort by Name</option>
        <option value="age">Sort by Age</option>
        <option value="company">Sort by Company</option>
        <option value="country">Sort by Country</option>
      </select>

      <select
        value={filters.sortOrder}
        onChange={(e) =>
          update("sortOrder", e.target.value as Filters["sortOrder"])
        }
        className="min-w-[135px] rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default FilterBar;
