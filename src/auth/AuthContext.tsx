import useSWR from "swr";
import { fetcher, HttpError } from "../App";
import React from "react";
import { KeyedMutator } from "swr/dist/types";
import { createCtx } from "../createCtx";
import { User } from "./User";

interface AuthContextInterface {
  loading: boolean;
  user: User | null;
  mutate: KeyedMutator<User | null>;
  isValidating: boolean;
  requestAuthToken: (email: string) => Promise<unknown>;
  logout: () => Promise<unknown>;
}

const [useAuthContext, AuthContextProvider] = createCtx<AuthContextInterface>();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, mutate, error, isValidating } = useSWR<User | null, HttpError>(
    `${process.env.REACT_APP_API_ENDPOINT}/v1/auth/session`,
    fetcher
  );

  const loading = !data && !error;

  const login = async (email: string): Promise<any> => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/auth/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
      credentials: "include",
    });
  };

  const logout = async (): Promise<any> => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/v1/auth/session`, {
      method: "DELETE",
      credentials: "include",
    });
  };

  return (
    <AuthContextProvider
      value={{
        loading,
        user: data || null,
        mutate,
        requestAuthToken: login,
        logout,
        isValidating,
      }}
    >
      {children}
    </AuthContextProvider>
  );
};

export default function useAuth() {
  return useAuthContext();
}
