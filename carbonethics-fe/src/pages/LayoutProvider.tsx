import "../styles/globals.css";
import { createContext, useEffect } from "react";
import { useRefreshTokenMutation } from "@/lib/services/client";
import Cookies from "js-cookie";

const LayoutContext = createContext<object>({});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LayoutProvider({ children }: any) {
  const [refreshToken] = useRefreshTokenMutation();
  useEffect(() => {
    refreshToken(null).then(({ data }) => {
      if (data?.access) {
        Cookies.set("access-token", data.access);
        // toast login success
      } else {
        // toast login fail
      }
    });
  }, [refreshToken]);
  return <LayoutContext.Provider value={{}}>{children}</LayoutContext.Provider>;
}
