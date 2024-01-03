"use client";

import ScreenLoader from "@/components/screen-loader.component";
import { useSessions } from "@/hooks/session.hook";
import { storeToken } from "@/utils/token.util";
import { ReactNode, createContext, useEffect, useState } from "react";

interface ContextState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  status: "empty" | "valid" | "invalid";
}

export const SessionContext = createContext<ContextState>({
  isAuthenticated: false,
  isAuthenticating: true,
  status: "empty",
});

export default function SessionProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] =
    useState<ContextState["isAuthenticated"]>(false);

  const [isAuthenticating, setIsAuthenticating] =
    useState<ContextState["isAuthenticating"]>(true);

  const [status, setStatus] = useState<ContextState["status"]>("empty");

  const { data, isSuccess, isFetching } = useSessions();

  useEffect(() => {
    setIsAuthenticated(isSuccess);

    if (isSuccess) {
      setStatus("valid");

      if (data.response.status === 201) {
        storeToken(data.response.data?.data?.token);
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    setIsAuthenticating(isFetching);
  }, [isFetching]);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, isAuthenticating, status }}
    >
      {isAuthenticating ? <ScreenLoader /> : children}
    </SessionContext.Provider>
  );
}
