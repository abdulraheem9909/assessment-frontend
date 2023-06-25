import axios from "axios";
import { useEffect } from "react";
import useLogout from "./useLogout";
import { useNavigate } from "react-router-dom";
const useFetch = axios.create({
  baseURL: "http://localhost:8000",
});

useFetch.interceptors.request.use(
  async (config: any) => {
    config.headers = config.headers;
    if (localStorage.getItem("authData")) {
      const authData: any = localStorage.getItem("authData");
      const parseData = JSON.parse(authData);
      config.headers!.Authorization = `Bearer ${parseData?.accessToken}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

const AxiosInterceptor = ({ children }: any) => {
  const { logoutHandler } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = useFetch.interceptors.response.use(
      function (response: any) {
        return response;
      },
      function (error: any) {
        if (error?.response?.status === 401) {
          logoutHandler();
          navigate("/");
        }
        return Promise.reject(error);
      }
    );

    return () => useFetch.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export { useFetch, AxiosInterceptor };
