import React, { createContext, useContext, ReactNode, useState } from "react";

// Define types for the context
interface UserContextProps {
  selectedDataType: string;
  setSelectedDataType: (type: string) => void;
}

// Create context with default value of undefined
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Context provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedDataType, setSelectedDataType] =
    useState<string>("temperature");

  return (
    <UserContext.Provider value={{ selectedDataType, setSelectedDataType }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(UserContext);
  console.log("the context is ", context);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
