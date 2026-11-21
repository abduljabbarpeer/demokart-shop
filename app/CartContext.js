"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const KEY = "demokart-cart";

// cart = { [productId]: quantity }
export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem(KEY)) || {});
    } catch {
      setCart({});
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  const addToCart = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const removeFromCart = (id) =>
    setCart((c) => {
      const { [id]: _, ...rest } = c;
      return rest;
    });
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <CartContext.Provider value={{ cart, loaded, count, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
