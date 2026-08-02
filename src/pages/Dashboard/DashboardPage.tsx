import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeCardSkeleton from "@/components/employee/EmployeeCardSkeleton";
import { useGetEmployeesQuery } from "@/features/employees/employeesApi";

const DashboardPage = () => {
  const { data, error, isLoading } = useGetEmployeesQuery();

  if (error) return <p>There is something went wrong</p>;

  console.log(data);
  return (
    <div className="pt-24 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 p-2">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <EmployeeCardSkeleton key={i} />
            ))
          : data?.users.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
      </div>
    </div>
  );
};

export default DashboardPage;
