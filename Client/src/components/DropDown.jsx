import React, { useContext } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';
import AuthContext from '@/Contexts/AuthContext';

const DropDown = ({ trigger}) => {
  const { handleLogout, user } = useContext(AuthContext); 

  return (
    <>
      {trigger ? (
        <DropdownMenu>
          <DropdownMenuTrigger>{user ? `Hi, ${user}` : 'Open'}</DropdownMenuTrigger>
          <DropdownMenuContent className='bg-customPalette-white shadow-md text-customPalette-black'>
            <DropdownMenuLabel className='text-md text-customPalette-black'>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuItem className='hover:bg-customPalette-blue text-md'>
              <Link to='/profile'>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-customPalette-blue text-md'>
              <Link to='/orders'>Orders</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='hover:bg-customPalette-blue text-md'>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
    </>
  );
};

export default DropDown;
