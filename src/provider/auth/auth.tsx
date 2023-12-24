"use client";

import { myToken } from "@/actions/auth.actions";
import { $Enums } from "@prisma/client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  user: User | null | undefined;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: $Enums.Role;
  createdAt: string;
  updatedAt: string;
  iat: Number;
  exp: Number;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const getMyToken = async () => {
      const token: User = await myToken();

      setUser(token as User);
    };

    getMyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthProviver = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
