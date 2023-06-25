import { Navigate, Outlet } from "react-router-dom";
import PublicRouteAnimation from "./public-route-animation";
import { useContext } from "react";
import { AuthContext } from "../../components/auth/authContex";

// THIS PUBLIC ROUTE FILE IF USER IS LOGGED IN THEN THESE ROUTES WOULD NOT BE ACCESSABLE 

const PublicRoutes = () => {
  const { authData } = useContext(AuthContext);
  const token = authData?.accessToken;

  return !token ? (
    <PublicRouteAnimation>
      <Outlet />
    </PublicRouteAnimation>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoutes;
