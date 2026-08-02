import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "./features/employees/employeesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeesApi.middleware),
});

setupListeners(store.dispatch);
