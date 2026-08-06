import { useEffect, useMemo, useState } from "react";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeCardSkeleton from "@/components/employee/EmployeeCardSkeleton";
import FilterBar from "@/components/employee/FilterBar";
import PaginationComponent from "@/components/common/PaginationComponent";
import { useGetEmployeesQuery } from "@/features/employees/employeesApi";
import { useFavorites } from "@/hooks/useFavorites";
import { useDebounce } from "@/hooks/useDebounce";
import { deriveOptions } from "@/utils/deriveFilterOptions";
import { filterEmployees, type Filters } from "@/utils/filterEmployees";

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

const FavoritePage = () => {
  const { favoriteIds } = useFavorites();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(PAGE_SIZE_OPTIONS[0]);
  const debouncedSearch = useDebounce(filters.search, 400);

  const debouncedFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  // Fetch all employees to filter locally. Since limit: 0 is used in the dashboard page,
  // this is likely already cached by RTK Query.
  const { data: allEmployeesData, isLoading, error } = useGetEmployeesQuery({
    filters: DEFAULT_FILTERS,
    page: 1,
    limit: 0,
  });

  // Extract all favorite employee details
  const favoriteEmployees = useMemo(() => {
    if (!allEmployeesData?.users) return [];
    return allEmployeesData.users.filter((user) => favoriteIds.includes(user.id));
  }, [allEmployeesData, favoriteIds]);

  // Derive filter options based on the user's favorites
  const { departments, countries, genders } = useMemo(
    () => deriveOptions(favoriteEmployees),
    [favoriteEmployees],
  );

  // Filter and Sort favorites list client-side
  const filteredAndSortedFavorites = useMemo(() => {
    const filtered = filterEmployees(favoriteEmployees, debouncedFilters);

    return [...filtered].sort((a, b) => {
      let valA = "";
      let valB = "";
      if (debouncedFilters.sortBy === "name") {
        valA = `${a.firstName} ${a.lastName}`;
        valB = `${b.firstName} ${b.lastName}`;
      } else if (debouncedFilters.sortBy === "age") {
        return debouncedFilters.sortOrder === "asc" ? a.age - b.age : b.age - a.age;
      } else if (debouncedFilters.sortBy === "company") {
        valA = a.company.department;
        valB = b.company.department;
      } else if (debouncedFilters.sortBy === "country") {
        valA = a.address.country;
        valB = b.address.country;
      }
      return debouncedFilters.sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });
  }, [favoriteEmployees, debouncedFilters]);

  // Reset page to 1 if filters change
  const handleFiltersChange = (nextFilters: Filters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // Pagination calculation
  const total = filteredAndSortedFavorites.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const startIndex = (page - 1) * pageSize;
  const paginatedFavorites = useMemo(() => {
    return filteredAndSortedFavorites.slice(startIndex, startIndex + pageSize);
  }, [filteredAndSortedFavorites, startIndex, pageSize]);

  if (error) {
    return (
      <div className="mx-auto flex min-h-screen max-w-screen-xl items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-sm">
          <h2 className="mb-3 text-2xl font-semibold text-foreground">
            Unable to load favorites
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            Something went wrong while fetching the employee data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl pt-24 px-2 min-h-screen">
      <h1 className="mb-6 text-3xl font-bold p-2">Favorites</h1>

      {favoriteIds.length === 0 ? (
        <div className="p-2">
          <p className="text-muted-foreground">
            No favorites yet. Mark an employee's heart icon to add them here.
          </p>
        </div>
      ) : (
        <>
          <div className="p-2">
            <FilterBar
              filters={filters}
              onChange={handleFiltersChange}
              departments={departments}
              countries={countries}
              genders={genders}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 lg:grid-cols-4 min-h-[300px]">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <EmployeeCardSkeleton key={i} />
              ))
            ) : paginatedFavorites.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No favorites match your current filter criteria.
                </p>
              </div>
            ) : (
              paginatedFavorites.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))
            )}
          </div>

          {filteredAndSortedFavorites.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default FavoritePage;
