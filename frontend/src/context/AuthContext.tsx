import React, { useContext } from "react";
import * as apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";

type AppContext = {
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError, data } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
  });

  console.log(data);
  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContext;
};
