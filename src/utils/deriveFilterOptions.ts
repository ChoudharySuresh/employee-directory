// utils/deriveFilterOptions.ts
import type { Employee } from "@/types/employee";

export function deriveOptions(employees: Employee[]) {
  const departments = [
    ...new Set(employees.map((e) => e.company.department)),
  ].sort();
  const countries = [
    ...new Set(employees.map((e) => e.address.country)),
  ].sort();
  const genders = [...new Set(employees.map((e) => e.gender))].sort();
  return { departments, countries, genders };
}
