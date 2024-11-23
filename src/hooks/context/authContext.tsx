import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../../types";
import { getIsAuthenticated, getUserSession } from "@/api/get";

export const INITIAL_USER = {
  id: 0,
  username: "",
  role: "USER",
  stations: [],
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: true,
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
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getUserSession();
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          username: currentAccount.username,
          role: currentAccount.role,
          stations: currentAccount.stations,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await getIsAuthenticated();
        if (data.isAuthenticated) {
          await checkAuthUser(); // Wait for user to be checked
        } else {
          navigate("/signin"); // Only navigate if not authenticated
        }
      } catch (error) {
        navigate("/signin");
      } finally {
        setIsLoading(false); // End loading after check
      }
    };
    checkIsLoggedIn();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useUserContext = () => useContext(AuthContext);
