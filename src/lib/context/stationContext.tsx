import React, { createContext, useContext, ReactNode, useState } from "react";
import { MergedData } from "../types/chartTypes";

interface StationDataContextProps {
  stationData: MergedData | undefined;
  setStationData: (data: MergedData) => void;
}

const StationDataContext = createContext<StationDataContextProps | undefined>(
  undefined
);

export const StationDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [stationData, setStationData] = useState<MergedData | undefined>(
    undefined
  );

  return (
    <StationDataContext.Provider value={{ stationData, setStationData }}>
      {children}
    </StationDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStationData = () => {
  const context = useContext(StationDataContext);
  if (context === undefined) {
    throw new Error("useStationData must be used within a StationDataProvider");
  }
  return context;
};
