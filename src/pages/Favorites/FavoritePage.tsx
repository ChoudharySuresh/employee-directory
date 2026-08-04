import EmployeeCard from "@/components/employee/EmployeeCard";
import EmployeeCardSkeleton from "@/components/employee/EmployeeCardSkeleton";
import { useGetEmployeeByIdQuery } from "@/features/employees/employeesApi";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteEmployeeItemProps {
  id: number;
}

const FavoriteEmployeeItem = ({ id }: FavoriteEmployeeItemProps) => {
  const { data: employee, isLoading } = useGetEmployeeByIdQuery(String(id));

  if (isLoading) return <EmployeeCardSkeleton />;
  if (!employee) return null;

  return <EmployeeCard employee={employee} />;
};

const FavoritePage = () => {
  const { favoriteIds } = useFavorites();
  return (
    <div className="pt-24 max-w-screen-xl mx-auto px-2">
      <h1 className="mb-6 text-3xl font-bold">Favorites</h1>

      {favoriteIds.length === 0 ? (
        <p className="text-muted-foreground">
          No favorites yet. Mark an employee's heart icon to add them here.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {favoriteIds.map((id) => (
            <FavoriteEmployeeItem key={id} id={id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
