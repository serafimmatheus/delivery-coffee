"use client";

import { Coffee } from "@prisma/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface CartContextData {
  cart: Coffee[];
  addToCart: (product: CoffeeWithQuantity) => void;
  removeFromCart: (product: CoffeeWithQuantity) => void;
  decreaseProductQuantity: (productId: string) => void;
  clearCart: () => void;
  TotalItens: number;
  delivery: number;
  TotalPrice: number;
}

export interface CoffeeWithQuantity extends Coffee {
  quantity?: number;
}

export const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CoffeeWithQuantity[]>(
    JSON.parse(window.localStorage.getItem("@coffee-delivery:cart") || "[]")
  );

  useEffect(() => {
    window.localStorage.setItem("@coffee-delivery:cart", JSON.stringify(cart));
  }, [cart]);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("@coffee-delivery:cart") || "[]"));
  // }, []);

  const TotalItens = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity!;
    }, 0);
  }, [cart]);

  const delivery = 10;

  const TotalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + Number(item.price) * item.quantity!;
    }, 0);
  }, [cart]);

  const addToCart = (product: CoffeeWithQuantity) => {
    if (cart.find((item) => item.id === product.id)) {
      setCart((prev) =>
        prev.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity! + 1 };
          }

          return item;
        })
      );

      return;
    }

    setCart((prev) => [...prev, { ...product }]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setCart((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity! - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity! > 0)
    );
  };

  const removeFromCart = (product: Coffee) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseProductQuantity,
        removeFromCart,
        clearCart,
        delivery,
        TotalItens,
        TotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
