import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import * as apiClient from "../apiClient";
import { useQuery } from "@tanstack/react-query";

type AppContext = {
  isLoggedIn: boolean;
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState<string>("");
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
  });

  return (
    <AppContext.Provider
      value={{
        isLoggedIn: !isError,
        token,
        setToken,
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
