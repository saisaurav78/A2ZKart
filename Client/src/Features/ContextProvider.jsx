import { React, createContext, useReducer } from 'react';
import CartReducer from './CartReducer';

export const CartContext = createContext();

const ContextProvider = ({ children }) => { // Accept props to destructure children
    const [cart, dispatch] = useReducer(CartReducer, []);
  
    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children} {/* Render children */}
        </CartContext.Provider>
    );
}

export default ContextProvider;
