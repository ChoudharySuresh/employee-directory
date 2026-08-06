import { filterEmployees, type Filters } from "@/utils/filterEmployees";
import type { Employee } from "@/types/employee";

const mockEmployees = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    gender: "male",
    age: 28,
    company: {
      department: "Engineering",
      name: "Acme Corp",
      title: "Developer",
    },
    address: {
      country: "United States",
      city: "New York",
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    gender: "female",
    age: 35,
    company: {
      department: "Product",
      name: "Acme Corp",
      title: "Manager",
    },
    address: {
      country: "Canada",
      city: "Toronto",
    },
  },
] as unknown as Employee[];

const defaultFilters: Filters = {
  search: "",
  department: "all",
  gender: "all",
  country: "all",
  ageMin: 0,
  ageMax: 100,
  sortBy: "name",
  sortOrder: "asc",
};

describe("filterEmployees utility", () => {
  test("should return all employees when default filters are active", () => {
    const result = filterEmployees(mockEmployees, defaultFilters);
    expect(result).toHaveLength(2);
  });

  test("should filter by search query (case-insensitive name match)", () => {
    const result = filterEmployees(mockEmployees, {
      ...defaultFilters,
      search: "jane",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test("should filter by search query (case-insensitive email match)", () => {
    const result = filterEmployees(mockEmployees, {
      ...defaultFilters,
      search: "doe@example",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test("should filter by department", () => {
    const result = filterEmployees(mockEmployees, {
      ...defaultFilters,
      department: "Engineering",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test("should filter by gender", () => {
    const result = filterEmployees(mockEmployees, {
      ...defaultFilters,
      gender: "female",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test("should filter by country", () => {
    const result = filterEmployees(mockEmployees, {
      ...defaultFilters,
      country: "Canada",
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  test("should filter by age range", () => {
    const result1 = filterEmployees(mockEmployees, {
      ...defaultFilters,
      ageMin: 30,
      ageMax: 40,
    });
    expect(result1).toHaveLength(1);
    expect(result1[0].id).toBe(2);

    const result2 = filterEmployees(mockEmployees, {
      ...defaultFilters,
      ageMin: 20,
      ageMax: 30,
    });
    expect(result2).toHaveLength(1);
    expect(result2[0].id).toBe(1);
  });
});
