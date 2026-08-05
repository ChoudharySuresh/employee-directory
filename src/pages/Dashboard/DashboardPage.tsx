import { useEffect, useMemo, useState } from "react";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeCardSkeleton from "@/components/employee/EmployeeCardSkeleton";
import FilterBar from "@/components/employee/FilterBar";
import PaginationComponent from "@/components/common/PaginationComponent";
import { useGetEmployeesQuery } from "@/features/employees/employeesApi";
import { useDebounce } from "@/hooks/useDebounce";
import { deriveOptions } from "@/utils/deriveFilterOptions";
import type { Filters } from "@/utils/filterEmployees";

const DEFAULT_FILTERS: Filters = {
  search: "",
  department: "all",
  gender: "all",
  country: "all",
  ageMin: 0,
  ageMax: 100,
  sortBy: "name",
  sortOrder: "asc",
};

const PAGE_SIZE_OPTIONS = [10, 20] as const;

const DashboardPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const debouncedSearch = useDebounce(filters.search, 400);

  const debouncedFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const { data: allEmployeesData } = useGetEmployeesQuery({
    filters: DEFAULT_FILTERS,
    page: 1,
    limit: 0,
  });

  const { data, error, isLoading, refetch } = useGetEmployeesQuery({
    filters: debouncedFilters,
    page,
    limit: pageSize,
  });

  const { departments, countries, genders } = useMemo(
    () => deriveOptions(allEmployeesData?.users ?? []),
    [allEmployeesData],
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / pageSize));

  const handleFiltersChange = (nextFilters: Filters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen max-w-screen-xl items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            Unable to load employees
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Something went wrong while fetching the employee list. Please try
            again.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl pt-24">
      <div className="p-2">
        <FilterBar
          filters={filters}
          onChange={handleFiltersChange}
          departments={departments}
          countries={countries}
          genders={genders}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <EmployeeCardSkeleton key={i} />
            ))
          : data?.users.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
      </div>

      <div className="m-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm">
          <label htmlFor="page-size" className="whitespace-nowrap">
            Items per page
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <PaginationComponent
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
