import React from 'react';

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
  const handleIncrease = () => {
    if (quantity >= 6) {
      alert('You cannot add more than 6 items');
      return;
    }
    onIncrease();
  };

  return (
    <div className='flex w-full max-w-xs justify-evenly items-center gap-2'>
      <button
        className='flex-1 bg-customPalette-red text-customPalette-white p-[3px] rounded'
        onClick={onDecrease}
      >
        -
      </button>
      <span className='flex-1 text-center lg:text-xl font-semibold'>{quantity}</span>
      <button
        className='flex-1 bg-customPalette-blue text-customPalette-white p-[3px] rounded'
        onClick={handleIncrease} // Use the local handler here
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
