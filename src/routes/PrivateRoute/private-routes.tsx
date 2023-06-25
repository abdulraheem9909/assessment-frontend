import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { useContext } from "react";
import { AuthContext } from "../../components/auth/authContex";

const PrivateRoutes = () => {
  const { authData } = useContext(AuthContext);
  const token = authData?.accessToken;

  return token ? (
    <Sidebar>
        <Outlet />
    </Sidebar>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
