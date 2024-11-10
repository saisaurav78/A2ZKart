import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';


const Navbar = () => {
  // const { cart } = useContext(CartContext);
  // const { query, setQuery } = useContext(SearchContext);
  

  return (
    <header>
      <nav className='bg-customPalette-white shadow-lg w-full lg:flex'>
        <div className='container mx-auto flex justify-between items-center py-4 px-6'>
          <div className='text-customPalette-blue text-2xl font-semibold hover:text-customPalette-yellow'>
            <NavLink to='/' aria-label='Homepage'>
                A2ZKart
            </NavLink>
          </div>
          <form className='flex items-center space-x-2 max-w-md w-[45vw]' role='search'>
            <label htmlFor='search' className='sr-only'>
              Search
            </label>
            <input
              required
              type='text'
              id='search'
              placeholder='Search...'
              className='border border-customPalette-blue rounded-md h-10 w-[100%] text-lg text-customPalette-black px-2 
              focus:outline-none focus:border-customPalette-yellow'
            />
            <button
              type='submit'
              className='bg-customPalette-yellow p-2 rounded-md hover:bg-customPalette-blue
               hover:text-customPalette-white'
              aria-label='Submit Search'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-5 h-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </button>
          </form>

          <ul
            className='lg:flex items-center justify-evenly w-[35vw] space-x-14 hidden'
            role='navigation'
          >
            <li>
              <NavLink
                to='/products'
                className='hover:text-customPalette-blue'
                aria-label='View Products'
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/cart'
                className='flex items-center space-x-1 hover:text-customPalette-blue'
                aria-label='View Cart'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-7 h-7 '
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                  />
                </svg>
                <span>Cart</span>
                <span className='w-4 h-4 rounded-[50%] bg-customPalette-black flex items-center justify-center text-customPalette-white bottom-4 right-14 relative'></span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                className='flex items-center space-x-1 hover:text-customPalette-blue'
                aria-label='Sign In'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Signin</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/notifications'
                className='flex items-center space-x-1 hover:text-customPalette-blue'
                aria-label='View Notifications'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-6 h-6'
                >
                  <path d='M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z' />
                  <path
                    fillRule='evenodd'
                    d='M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Notifications</span>
              </NavLink>
            </li>
          </ul>
          <span className='lg:hidden'>
            <Sheet>
              <SheetTrigger aria-label='Open Menu'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6 transition-transform hover:scale-110 duration-300'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </SheetTrigger>
              <SheetContent className='text-customPalette-white font-bold fs-1'>
                <SheetHeader>
                  <SheetTitle className='text-lg font-semibold mb-2'>Explore Menu</SheetTitle>
                  <SheetDescription className='space-y-4 list-none text-customPalette-white'>
                    <li className='text-customPalette-blue'>
                      <NavLink
                        to='/products'
                        className='hover:text-customPalette-blue flex items-center space-x-2'
                        aria-label='View Products'
                      >
                        <span>Products</span>
                      </NavLink>
                    </li>
                    <li className='text-customPalette-yellow'>
                      <NavLink
                        to='/cart'
                        className='flex items-center space-x-2 hover:text-customPalette-blue'
                        aria-label='View Cart'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-7 h-7'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                          />
                        </svg>
                        <span>Cart</span>
                        <span className='w-4 h-4 rounded-full lg:bg-customPalette-black flex items-center justify-center text-customPalette-white bottom-4 right-14 relative'></span>
                      </NavLink>
                    </li>
                    <li className='text-customPalette-white'>
                      <NavLink
                        to='/login'
                        className='flex items-center space-x-2 hover:text-customPalette-blue'
                        aria-label='Sign In'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          className='w-6 h-6'
                        >
                          <path
                            fillRule='evenodd'
                            d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>Sign In</span>
                      </NavLink>
                    </li>
                    <li className='text-customPalette-red'>
                      <NavLink
                        to='/notifications'
                        className='flex items-center space-x-2 hover:text-customPalette-blue'
                        aria-label='View Notifications'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          className='w-6 h-6'
                        >
                          <path d='M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z' />
                          <path
                            fillRule='evenodd'
                            d='M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z'
                            clipRule='evenodd'
                          />
                        </svg>
                        <span>Notifications</span>
                      </NavLink>
                    </li>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
