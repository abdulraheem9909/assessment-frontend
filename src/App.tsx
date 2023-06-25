import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./routes/Layout";
import PublicRoutes from "./routes/PublicRoute/public-route";
import PrivateRoutes from "./routes/PrivateRoute/private-routes";
import DashboardPage from "./pages/dashboardPage";
import CarsPage from "./pages/carsPage";
import CategoryPage from "./pages/categoryPage";
import NotFoundPage from "./pages/notFoundPage";
import LoginPage from "./pages/loginPage";
import SignPage from "./pages/signupPage";

// THIS IS MAIN FILE FOR ROUTING WITH PRIVATE AND PUBLIC ROUTES BASED ON IS USER LOGGED IN OR NOT

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<PublicRoutes />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignPage />} />
        </Route>
        {/* we want to protect these routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<DashboardPage />} />
          <Route path="/car" element={<CarsPage />} />
          <Route path="/category" element={<CategoryPage />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
