import { BASE_URL } from "@/constants/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Employee, EmployeesResponse } from "@/types/employee";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<EmployeesResponse, void>({
      query: () => "users",
    }),
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = employeesApi;
