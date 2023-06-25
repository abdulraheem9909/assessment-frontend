import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import LoaderScreen from "../common/loader";

interface AuthData {
  accessToken: string | null;
  user: User | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  authData: AuthData;
  setAuthData: (data: AuthData) => void;
}

//THIS CONTEXT API TO FETXH ACCESSTOKEN AFTER USER LOGGED IN INTO OUR SYSTEM

export const AuthContext = createContext<AuthContextType>({
  authData: {
    accessToken: null,
    user: null,
  },
  setAuthData: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authData, setAuthDataState] = useState<AuthData>({
    accessToken: null,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      setAuthDataState(JSON.parse(storedAuthData));
    }
    setIsLoading(false);
  }, []);

  const setAuthData = (newAuthData: AuthData) => {
    if (newAuthData) {
      localStorage.setItem("authData", JSON.stringify(newAuthData));
    } else {
      localStorage.removeItem("authData");
    }
    setAuthDataState(newAuthData);
  };

  if (isLoading) {
    return <LoaderScreen />;
  }

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
