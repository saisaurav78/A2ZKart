import React from 'react';

const ProfileMenu = () => {
  return (
    <>
      <div className='container w-full max-w-max mt-5 p-8 min-h-full'>
        {/* Manage My Account Section */}
        <div className='mb-8'>
          <span className='text-xl font-bold'>Manage My Account</span>
          <ul className='space-y-2 mt-4'>
            <li className='text-md font-normal hover:text-customPalette-red cursor-pointer'>
              My Profile
            </li>
            <li className='text-md font-normal hover:text-customPalette-red cursor-pointer'>
              Address Book
            </li>
            <li className='text-md font-normal hover:text-customPalette-red cursor-pointer'>
              Payment Methods
            </li>
          </ul>
        </div>

        {/* My Orders Section */}
        <div className='mb-8'>
          <span className='text-xl font-bold'>My Orders</span>
          <ul className='space-y-2 mt-4'>
            <li className='text-md font-normal hover:text-customPalette-red cursor-pointer'>
              My Returns
            </li>
            <li className='text-md font-normal hover:text-customPalette-red cursor-pointer'>
              My Cancellations
            </li>
          </ul>
        </div>

        {/* Wish List Section */}
        <div>
          <span className='text-xl font-bold'>Wish List</span>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
