import React, { createContext } from "react";
import { productsList } from "../../public/productsList";

export const storeContextProvider = createContext(null);

export default function StoreProvider({ children }) {
  const storeValue = {
    productsList,
  };
  return (
    <storeContextProvider.Provider value={storeValue}>
      {children}
    </storeContextProvider.Provider>
  );
}
