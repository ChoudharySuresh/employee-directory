import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import FavoritePage from "@/pages/Favorites/FavoritePage";
import EmployeeDetails from "@/pages/Employee/EmployeeDetails";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route element={<DashboardPage />} path="/" />
          <Route element={<FavoritePage />} path="/favorites" />
          <Route element={<EmployeeDetails />} path="/employee/:id" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
