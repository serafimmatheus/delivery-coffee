"use client";
import { ReactNode, createContext } from "react";
import { CartProvider } from "./cart/cart";
import { AuthProvider } from "./auth/auth";

export const ContextCoffee = createContext({});

export const ProviderCoffee = ({ children }: { children: ReactNode }) => {
  return (
    <ContextCoffee.Provider value={{}}>
      <CartProvider>
        <AuthProvider>{children}</AuthProvider>
      </CartProvider>
    </ContextCoffee.Provider>
  );
};
