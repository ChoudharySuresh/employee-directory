import { BASE_URL } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, EmployeesResponse } from "@/types/employee";
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

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

export interface EmployeesQueryArgs {
  filters?: Partial<Filters>;
  page?: number;
  limit?: number;
}

const normalizeFilters = (filters?: Partial<Filters>): Filters => ({
  ...DEFAULT_FILTERS,
  ...filters,
});

const normalizeQueryArgs = (
  args?: EmployeesQueryArgs,
): Required<EmployeesQueryArgs> => ({
  filters: normalizeFilters(args?.filters),
  page: Math.max(1, Number(args?.page ?? DEFAULT_PAGE)),
  limit: Math.max(0, Number(args?.limit ?? DEFAULT_LIMIT)),
});

const normalizeAgeBounds = (filters: Filters) => {
  const ageMin = Number.isFinite(filters.ageMin)
    ? Math.max(0, Number(filters.ageMin))
    : 0;
  const rawAgeMax = Number(filters.ageMax);
  const ageMax = Number.isFinite(rawAgeMax) && rawAgeMax > 0 ? rawAgeMax : 200;

  return {
    ageMin,
    ageMax,
  };
};

const SORT_FIELD_MAP: Record<Filters["sortBy"], string> = {
  name: "firstName",
  age: "age",
  company: "company.department",
  country: "address.country",
};

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesResponse, EmployeesQueryArgs>({
      async queryFn(args, _api, _extraOptions, baseQuery) {
        const normalizedArgs = normalizeQueryArgs(args);
        const normalizedFilters = normalizeFilters(normalizedArgs.filters);
        const { ageMin, ageMax } = normalizeAgeBounds(normalizedFilters);
        const page = normalizedArgs.page;
        const limit = normalizedArgs.limit;
        const skip = limit > 0 ? (page - 1) * limit : 0;
        const searchTerm = normalizedFilters.search.trim();
        const sortField =
          SORT_FIELD_MAP[normalizedFilters.sortBy] ?? "firstName";
        const sortOrder =
          normalizedFilters.sortOrder === "desc" ? "desc" : "asc";

        const fetchUsers = async (url: string): Promise<EmployeesResponse> => {
          const response = await baseQuery({
            url,
            method: "GET",
          });

          if (response.error) {
            throw new Error("Failed to fetch employees from the API.");
          }

          return (
            (response.data as EmployeesResponse) ?? {
              users: [],
              total: 0,
              skip: 0,
              limit: 0,
            }
          );
        };

        const baseResponse = searchTerm
          ? await fetchUsers(
              `users/search?q=${encodeURIComponent(searchTerm)}&limit=0&sortBy=${encodeURIComponent(sortField)}&order=${sortOrder}`,
            )
          : await fetchUsers(
              `users?limit=0&sortBy=${encodeURIComponent(sortField)}&order=${sortOrder}`,
            );

        let users = (baseResponse.users ?? []).filter(
          (user) => user.age >= ageMin && user.age <= ageMax,
        );

        const applySingleFilter = async (
          key: string,
          value: string,
          currentUsers: Employee[],
        ) => {
          if (value === "all") return currentUsers;

          const filteredResponse = await fetchUsers(
            `users/filter?key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}&limit=0`,
          );
          const ids = new Set(
            (filteredResponse.users ?? []).map((user) => user.id),
          );

          return currentUsers.filter((user) => ids.has(user.id));
        };

        if (normalizedFilters.department !== "all") {
          users = await applySingleFilter(
            "company.department",
            normalizedFilters.department,
            users,
          );
        }

        if (normalizedFilters.gender !== "all") {
          users = await applySingleFilter(
            "gender",
            normalizedFilters.gender,
            users,
          );
        }

        if (normalizedFilters.country !== "all") {
          users = await applySingleFilter(
            "address.country",
            normalizedFilters.country,
            users,
          );
        }

        const total = users.length;
        const paginatedUsers =
          limit > 0 ? users.slice(skip, skip + limit) : users;

        return {
          data: {
            users: paginatedUsers,
            total,
            skip,
            limit,
          },
        };
      },
    }),
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = employeesApi;
