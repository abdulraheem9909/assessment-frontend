import { useContext } from "react";
import { AuthContext } from "../components/auth/authContex";

const useLogout = () => {
  const { setAuthData } = useContext(AuthContext);
  const logoutHandler = () => {
    localStorage.removeItem("authData");
    setAuthData({ accessToken: null, user: null });
  };

  return { logoutHandler };
};

export default useLogout;
