import { Children, createContext } from "react";

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({children}) => {
  const context = {};
  return (
    <ShoppingCartContext.Provider value={context}>
      {children}
    </ShoppingCartContext.Provider>
  )
}   

export default ShoppingCartContext;