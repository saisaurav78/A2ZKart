import { React, createContext, useEffect, useReducer, useState } from 'react';
import CartReducer from './CartReducer';
import axios from 'axios';
import { initializer } from './CartReducer';

 const CartContext = createContext();

export const CartContextProvider = ({ children }) => { 

    const [cart, dispatch] = useReducer(CartReducer,[], initializer);
    const [cartTotal, setCartTotal] = useState(0)
    const [discount, setDiscount] = useState(0);
    
  useEffect(() => {
  localStorage.setItem("a2zkart", JSON.stringify(cart));
}, [cart]);
  

  const filteredCart = cart.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.images[0],
    price: Math.ceil(item.price),
    quantity: item.quantity,
  }));
    
const sendCart = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/cart/',
      {
        cartItems: filteredCart,
        appliedDiscount: discount,
      },
      {
        withCredentials: true,
      },
    );

    if (response.status) {
      console.log(response.data.message);
    }
  } catch (error) {
    console.error('Error sending cart:', error);
  }
};

useEffect(() => {
  sendCart();
}, [cart, discount]);


  
    return (
        <CartContext.Provider value={{ cart, dispatch , cartTotal, setCartTotal , discount, setDiscount}}>
            {children} 
        </CartContext.Provider>
    );
}

export default CartContext
