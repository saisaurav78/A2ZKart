import React from 'react';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='border-4 border-customPalette-yellow border-t-customPalette-blue animate-spin w-10 h-10 rounded-full'></div>
    </div>
  );
};

export default Spinner;
