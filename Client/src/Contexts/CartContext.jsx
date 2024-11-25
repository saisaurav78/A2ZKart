import { React, createContext, useContext, useEffect, useReducer, useState } from 'react';
import AuthContext from './AuthContext';
import CartReducer from './CartReducer';
import axios from 'axios';
import { initializer } from './CartReducer';
 const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const [cart, dispatch] = useReducer(CartReducer, [], initializer);
  const [cartTotal, setCartTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  // useEffect(() => {
  //   if (auth.auth) {
  //     localStorage.removeItem('a2zkart');
  //   } else {
  //     localStorage.setItem('a2zkart', JSON.stringify(cart));
  //   }
  // }, [cart, auth]); 

  const filteredCart = cart.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image || item.images[0],
    price: Math.ceil(item.price),
    quantity: item.quantity,
  }));


  const sendCart = async () => {
    try {
      console.log('sending cart to backend....');
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
    if (auth.auth) {
      sendCart();
    }
  }, [cart, discount]);

  const getCart = async () => {
    try {
      console.log('getting cart from backend....');
      const response = await axios.get('http://localhost:8080/api/cart', { withCredentials: true });
      if (response.status === 200 || response.status === 201) {
        const fetchedCart = response.data.message.cartItems; 
          dispatch({
            type: 'SET_CART',
            payload: fetchedCart, 
          });
      }
    } catch (error) {
      console.error('Error fetching cart:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (auth.auth) {
      getCart();
    }
  }, [auth]);

  return (
    <CartContext.Provider
      value={{ cart, dispatch, cartTotal, setCartTotal, discount, setDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext
