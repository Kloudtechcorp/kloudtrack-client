import { createContext, useContext, useEffect, useState } from "react";
import { useUserContext } from "./authContext";
import { getStationNames } from "@/api/get";
import { stationStaticType } from "@/types";
import { useNavigate } from "react-router-dom";

const initialState = {
  stationNames: [],
  isLoading: false,
  setStationNames: () => {},
  checkStationNames: async () => false as boolean,
};

type StationContextType = {
  stationNames: stationStaticType[];
  isLoading: boolean;
  setStationNames: React.Dispatch<React.SetStateAction<stationStaticType[]>>;
  checkStationNames: () => Promise<boolean>;
};

const StationContext = createContext<StationContextType>(initialState);

export function StationProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUserContext();
  const [stationNames, setStationNames] = useState<stationStaticType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkStationNames = async () => {
    setIsLoading(true);
    try {
      const data = await getStationNames();
      if (data) {
        setStationNames(data);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkStationNames();
  }, [isAuthenticated]);

  const value = {
    stationNames,
    isLoading,
    setStationNames,
    checkStationNames,
  };

  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
}

export const useStationContext = () => useContext(StationContext);
