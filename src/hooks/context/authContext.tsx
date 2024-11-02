import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../../types";
import { getIsAuthenticated, getUserSession } from "@/api/get";
import {
  useGetIsAuthenticated,
  useGetUserSession,
} from "../react-query/queries";

export const INITIAL_USER = {
  id: 0,
  username: "",
  role: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: UserType;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getUserSession();
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          username: currentAccount.username,
          role: currentAccount.role,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const data = await getIsAuthenticated();
        if (data) {
          return;
        }
        navigate("/signin");
      } catch (error) {
        navigate("/signin");
      }
    };
    checkIsLoggedIn();
    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
