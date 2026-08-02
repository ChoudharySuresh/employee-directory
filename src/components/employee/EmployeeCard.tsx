import type { Employee } from "@/types/employee";
import { Card } from "@/components/ui/card";
import {
  LuBuilding2,
  LuHeart,
  LuMail,
  LuMapPin,
  LuPhone,
} from "react-icons/lu";
import type React from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(employee?.id);

  const fullName = `${employee.firstName} ${employee.lastName}`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(employee?.id);
  };

  return (
    <Card
      onClick={() => navigate(`/employee/${employee.id}`)}
      className="relative cursor-pointer p-5 transition-shadow hover:shadow-md"
    >
      <button
        onClick={handleFavoriteClick}
        aria-label="Toggle favorite"
        className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
          favorited
            ? "bg-favorite text-favorite-foreground"
            : "bg-secondary text-muted-foreground hover:text-favorite"
        }`}
      >
        <LuHeart
          className={favorited ? "fill-favorite-foreground" : ""}
          size={16}
        />
      </button>

      <div className="flex items-center gap-3">
        <img
          src={employee.image}
          alt={fullName}
          className="h-14 w-14 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-heading">{fullName}</h3>
          <p className="text-sm text-muted-foreground">
            {employee.company.title}
          </p>
        </div>
      </div>

      <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
        {employee.company.department} · {employee.age} yrs
      </span>

      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <LuBuilding2 size={16} />
          <span>{employee.company.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuMail size={16} />
          <span className="truncate">{employee.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuPhone size={16} />
          <span>{employee.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <LuMapPin size={16} />
          <span>
            {employee.address.city}, {employee.address.country}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
