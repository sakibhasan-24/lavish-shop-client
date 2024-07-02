import React, { createContext, useState } from "react";
import { productsList } from "../../public/productsList";

export const storeContextProvider = createContext(null);

export default function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const addToCart = (itemId) => {
    if (!cartItems) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const storeValue = {
    productsList,
    addToCart,
    removeFromCart,
    cartItems,
  };
  return (
    <storeContextProvider.Provider value={storeValue}>
      {children}
    </storeContextProvider.Provider>
  );
}
