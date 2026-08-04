import type { Employee } from "@/types/employee";

export interface Filters {
  search: string;
  department: string; // "all" = no filter
  gender: string;
  country: string;
  ageMin: number;
  ageMax: number;
  sortBy: "name" | "age" | "company" | "country";
  sortOrder: "asc" | "desc";
}
export function filterEmployees(employees: Employee[], f: Filters): Employee[] {
  const search = f.search.trim().toLowerCase();

  return employees.filter((emp) => {
    if (search) {
      const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
      const email = emp.email.toLowerCase();
      if (!fullName.includes(search) && !email.includes(search)) return false;
    }
    if (f.department !== "all" && emp.company.department !== f.department)
      return false;
    if (f.gender !== "all" && emp.gender !== f.gender) return false;
    if (f.country !== "all" && emp.address.country !== f.country) return false;
    if (emp.age < f.ageMin || emp.age > f.ageMax) return false;

    return true;
  });
}
