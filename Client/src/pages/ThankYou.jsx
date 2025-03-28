import { SuccessIcon } from '@/components/icons/Icons';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const { state } = location;
    if (!state?.orderSuccess) {
      navigate('/products', { replace: true });
      return null;
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-8'>
      <SuccessIcon/>
      <h1 className='text-4xl font-bold text-customPalette-blue mb-4'>🎉 Thank You for shopping with us!</h1>
      <p className='text-lg text-customPalette-black mb-6'>
        Your order has been successfully placed. We will notify you once it's shipped.
      </p>
      <button
        onClick={() => navigate('/products')}
        className='px-6 py-2 bg-customPalette-blue text-white rounded transition-all'
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default ThankYou;
