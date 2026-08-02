import DetailRow from "@/components/employee/DetailRow";
import EmployeeDetailsSkeleton from "@/components/employee/EmployeeDetailsSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetEmployeeByIdQuery } from "@/features/employees/employeesApi";
import { useFavorites } from "@/hooks/useFavorites";
import { LuArrowLeft, LuHeart } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: employee, error, isLoading } = useGetEmployeeByIdQuery(id!);
  const { isFavorite, toggleFavorite } = useFavorites();

  if (isLoading) return <EmployeeDetailsSkeleton />;

  if (error || !employee)
    return <p className="pt-24 text-center">Employee Not Found</p>;

  const favorited = isFavorite(employee.id);
  const fullName = `${employee.firstName} ${employee.lastName}`;
  const biography = `${employee.firstName} is a ${employee.age}-year-old ${employee.company.title.toLowerCase()} in the ${employee.company.department} team at ${employee.company.name}. Based in ${employee.address.city}, ${employee.address.country}, and a graduate of ${employee.university}. Reach out at ${employee.email} or ${employee.phone}.`;

  return (
    <div className="pt-24 max-w-screen-xl mx-auto px-4 pb-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-heading"
      >
        <LuArrowLeft size={16} />
        Back to Dashboard
      </Link>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={employee.image}
            alt={fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-heading">{fullName}</h1>
            <p className="text-muted-foreground">
              {employee.company.title} · {employee.company.department}
            </p>
            <p className="text-muted-foreground">{employee.company.name}</p>
          </div>
        </div>

        <Button
          onClick={() => toggleFavorite(employee.id)}
          className={`gap-2 ${
            favorited
              ? "bg-favorite text-favorite-foreground hover:bg-favorite/90"
              : ""
          }`}
          variant={favorited ? "default" : "outline"}
        >
          <LuHeart
            className={favorited ? "fill-favorite-foreground" : ""}
            size={16}
          />
          {favorited ? "Favorited" : "Add to favorites"}
        </Button>
      </Card>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Personal
          </h2>
          <DetailRow label="Full name" value={fullName} />
          <DetailRow label="Age" value={employee.age} />
          <DetailRow label="Gender" value={employee.gender} />
          <DetailRow label="Birth date" value={employee.birthDate} />
          <DetailRow label="Blood group" value={employee.bloodGroup} />
          <DetailRow label="Height" value={`${employee.height} cm`} />
          <DetailRow label="Weight" value={`${employee.weight} kg`} />
          <DetailRow label="Eye color" value={employee.eyeColor} />
          <DetailRow
            label="Hair"
            value={`${employee.hair.color}, ${employee.hair.type}`}
          />
          <DetailRow label="University" value={employee.university} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Contact
          </h2>
          <DetailRow label="Email" value={employee.email} />
          <DetailRow label="Phone" value={employee.phone} />
          <DetailRow label="Username" value={employee.username} />
          <DetailRow label="Role" value={employee.role} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Address
          </h2>
          <DetailRow label="Street" value={employee.address.address} />
          <DetailRow label="City" value={employee.address.city} />
          <DetailRow label="State" value={employee.address.state} />
          <DetailRow label="Postal code" value={employee.address.postalCode} />
          <DetailRow label="Country" value={employee.address.country} />
        </Card>

        <Card className="p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Company
          </h2>
          <DetailRow label="Company" value={employee.company.name} />
          <DetailRow label="Department" value={employee.company.department} />
          <DetailRow label="Job title" value={employee.company.title} />
          <DetailRow label="Office" value={employee.company.address.address} />
          <DetailRow
            label="Location"
            value={`${employee.company.address.city}, ${employee.company.address.state}, ${employee.company.address.country}`}
          />
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Biography
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {biography}
        </p>
      </Card>
    </div>
  );
};

export default EmployeeDetails;
