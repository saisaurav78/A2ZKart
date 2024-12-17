import React from 'react'

const ProfileForm = () => {
  return (
    <>
      <div className='container p-4 grid grid-cols-2 gap-2 w-full lg:max-w-2xl shadow-lg mt-5'>
        <span className='text-lg text-customPalette-red col-span-2 text-center'>
          Edit Your Profile
        </span>

        {/* First Name */}
        <label className='block'>
          <span className='text-gray-700'>First Name</span>
          <input
            type='text'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Peter'
          />
        </label>

        {/* Last Name */}
        <label className='block'>
          <span className='text-gray-700'>Last Name</span>
          <input
            type='text'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Parker'
          />
        </label>

        {/* Email */}
        <label className='block col-span-2'>
          <span className='text-gray-700'>Email</span>
          <input
            type='email'
            className='border-2 rounded h-12  w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='peterparker123@gmail.com'
          />
        </label>

        {/* Gender */}
        <label className='block'>
          <span className='text-gray-700'>Gender</span>
          <select
            name='gender'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            <option value=''>Choose</option>
            <option selected value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </label>

        <label className='block col-span-2'>
          <span className='text-gray-700'>Current Password</span>
          <input
            type='password'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Current Password'
          />
        </label>

        <label className='block col-span-2'>
          <span className='text-gray-700'>New Password</span>
          <input
            type='password'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='New Password'
          />
              </label>
              
        <label className='block col-span-2'>
          <span className='text-gray-700'>Confirm Password</span>
          <input
            type='password'
            className='border-2 rounded h-12 w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Confirm Password'
          />
        </label>

        {/* Button */}
        <button className='bg-customPalette-blue hover:bg-customPalette-red text-lg col-span-full p-4 mt-1 text-customPalette-white transition-all'>
          Save Changes
        </button>
      </div>
    </>
  );
}

export default ProfileForm