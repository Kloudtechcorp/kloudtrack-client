import { useNavigate } from "react-router-dom";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserType } from "../types";

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
const server = import.meta.env.VITE_SERVER_LOCAL;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${server}/user/session`, {
        credentials: "include",
      });
      const currentAccount = await response.json();
      console.log(currentAccount);
      if (currentAccount.token) {
        console.log(currentAccount.token);
        setUser({
          id: currentAccount.token.id,
          username: currentAccount.token.username,
          role: currentAccount.token.role,
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
    const isUserAuthenticated = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/user/is-auth`, {
          credentials: "include",
        });
        const currentAccount = await response.json();
        if (currentAccount) {
          return;
        }
        navigate("/signin");
      } catch (error) {
        console.log(error);
      }
    };
    isUserAuthenticated();
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
