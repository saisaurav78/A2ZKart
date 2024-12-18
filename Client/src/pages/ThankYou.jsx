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
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={1.5}
        stroke='currentColor'
        className='size-60 text-green-600'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
        />
      </svg>
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
