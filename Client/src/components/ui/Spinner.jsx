import React from 'react';

// Full-screen spinner (default)
const Spinner = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='border-4 border-customPalette-yellow border-t-customPalette-blue animate-spin w-10 h-10 rounded-full'></div>
    </div>
  );
};

// Small inline spinner for buttons (named export)
export const InlineSpinner = () => {
  return (
    <div className='inline-block animate-spin w-5 h-5 border-2 border-customPalette-yellow border-t-customPalette-blue rounded-full'></div>
  );
};

export default Spinner;
