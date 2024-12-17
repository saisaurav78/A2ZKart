import AuthContext from '@/Contexts/AuthContext';
import React, { useContext } from 'react';
import ProfileMenu from '@/components/ProfileMenu';
import ProfileForm from '@/components/ProfileForm';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {/* <h1 className='text-2xl text-center'>Welcome {user}</h1> */}
      <section className='flex flex-col lg:flex-row justify-around items-start w-full max-w-7xl mx-auto mt-10'>
        {/* Profile Menu */}
        <div className='lg:w-1/2 w-full mb-8 lg:mb-0'>
          <ProfileMenu />
        </div>

        {/* Profile Form */}
        <div className='lg:w-3/4 w-full'>
          <ProfileForm />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
