import { SuccessIcon } from '@/components/icons/Icons';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CartContext from '@/Contexts/CartContext';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const ThankYou = () => {
  const { dispatch } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const urlParams = new URLSearchParams(location.search);
  const sessionId = urlParams.get('sessionId');

  const [paymentMethod, setPaymentMethod] = useState(null); // 'cod' | 'stripe'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async (sessionId) => {
      try {
        const verifyUrl = `${BASE_URL}/orders/verify-payment?sessionId=${sessionId}`;
        const response = await axios.get(verifyUrl, { withCredentials: true });
        if (response.status === 200 || response.status === 201) {
           dispatch({ type: 'CLEAR_CART' });
          setPaymentMethod('stripe');
        } else {
          console.warn('Stripe verification failed. Redirecting to cart.');
          navigate('/cart', { replace: true });
        }
      } catch (err) {
        console.error('Stripe verification error:', err.message);
        if (err.response) console.error('Backend responded with:', err.response.data);
        navigate('/cart', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (state?.orderSuccess) {
      setPaymentMethod('cod');
      setLoading(false);
    } else if (sessionId) {
      verifyPayment(sessionId);
    } else {
      console.warn('No valid order info. Redirecting...');
      navigate('/products', { replace: true });
    }
  }, [state, sessionId, navigate]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-100 text-xl'>
        Verifying your order...
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-8'>
      <SuccessIcon />
      <h1 className='text-4xl font-bold text-customPalette-blue mb-4'>
        🎉 Thank You for shopping with us!
      </h1>
      <p className='text-lg text-customPalette-black mb-2'>
        Your order has been successfully placed.
      </p>

      {paymentMethod === 'cod' && (
        <p className='text-customPalette-red mt-2'>Payment Method: Cash on Delivery</p>
      )}
      {paymentMethod === 'stripe' && (
        <p className='text-customPalette-red mt-2'>Payment Method: Paid via Stripe</p>
      )}

      <button
        onClick={() => navigate('/products')}
        className='mt-6 px-6 py-2 bg-customPalette-blue text-white rounded transition-all'
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
