import { React, createContext, useReducer, useState } from 'react';
import CartReducer from './CartReducer';

 const CartContext = createContext();

export const CartContextProvider = ({ children }) => { 
    const [cart, dispatch] = useReducer(CartReducer, []);
    const [cartTotal,setCartTotal] = useState(0)
  
    return (
        <CartContext.Provider value={{ cart, dispatch , cartTotal, setCartTotal}}>
            {children} 
        </CartContext.Provider>
    );
}

export default CartContext
