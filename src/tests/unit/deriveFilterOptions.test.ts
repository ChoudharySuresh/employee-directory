import { deriveOptions } from "@/utils/deriveFilterOptions";
import type { Employee } from "@/types/employee";

const mockEmployees = [
  {
    id: 1,
    gender: "male",
    company: { department: "Engineering" },
    address: { country: "United States" },
  },
  {
    id: 2,
    gender: "female",
    company: { department: "Product" },
    address: { country: "Canada" },
  },
  {
    id: 3,
    gender: "male",
    company: { department: "Engineering" },
    address: { country: "United States" },
  },
] as unknown as Employee[];

describe("deriveOptions utility", () => {
  test("should extract unique sorted departments, countries, and genders", () => {
    const result = deriveOptions(mockEmployees);

    expect(result.departments).toEqual(["Engineering", "Product"]);
    expect(result.countries).toEqual(["Canada", "United States"]);
    expect(result.genders).toEqual(["female", "male"]);
  });

  test("should handle empty list of employees", () => {
    const result = deriveOptions([]);
    expect(result.departments).toEqual([]);
    expect(result.countries).toEqual([]);
    expect(result.genders).toEqual([]);
  });
});
