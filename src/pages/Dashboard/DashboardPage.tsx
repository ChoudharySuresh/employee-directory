import { useMemo, useState } from "react";
import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeCardSkeleton from "@/components/employee/EmployeeCardSkeleton";
import FilterBar from "@/components/employee/FilterBar";
import PaginationComponent from "@/components/common/PaginationComponent";
import { useGetEmployeesQuery } from "@/features/employees/employeesApi";
import { deriveOptions } from "@/utils/deriveFilterOptions";
import type { Filters } from "@/utils/filterEmployees";

const DEFAULT_FILTERS: Filters = {
  search: "",
  department: "all",
  gender: "all",
  country: "all",
  ageMin: 0,
  ageMax: 200,
  sortBy: "name",
  sortOrder: "asc",
};

const PAGE_SIZE = 10;

const DashboardPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const { data: allEmployeesData } = useGetEmployeesQuery({
    filters: DEFAULT_FILTERS,
    page: 1,
    limit: 0,
  });

  const { data, error, isLoading } = useGetEmployeesQuery({
    filters,
    page,
    limit: PAGE_SIZE,
  });

  const { departments, countries, genders } = useMemo(
    () => deriveOptions(allEmployeesData?.users ?? []),
    [allEmployeesData],
  );

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / PAGE_SIZE));

  const handleFiltersChange = (nextFilters: Filters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  if (error) return <p>There is something went wrong</p>;

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

      <div className="m-10">
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
