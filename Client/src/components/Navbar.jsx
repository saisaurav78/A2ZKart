import { React, useContext, useState, useEffect } from 'react';
import {BellIcon, CartIcon, MenuIcon, SearchIcon, UserIcon} from '../components/icons/Icons'
import { NavLink } from 'react-router-dom';
import DropDown from './DropDown';
import AuthContext from '@/Contexts/AuthContext';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import CartContext from '@/Contexts/CartContext';
import SearchContext from '@/Contexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';





const Navbar = () => {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext);
  const {setQuery } = useContext(SearchContext)
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState()
  const location = useLocation()
  const {auth, user } = useContext(AuthContext)
  
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  
  const handleInputChange = (e) => {
      navigate('/products');
      setInputValue(e.target.value);
    };
 
    const handleSubmit = (e) => {
      e.preventDefault();
      setQuery(inputValue);
      setInputValue(''); 
    };

  return (
    <header className='sticky top-0 z-10'>
      <nav className='bg-customPalette-white shadow-lg w-full lg:flex'>
        <div className='container mx-auto flex justify-between items-center py-4 px-6'>
          <div className='text-customPalette-blue lg:text-3xl text-xl font-semibold hover:text-customPalette-yellow'>
            <NavLink to='/' aria-label='Homepage'>
              A2ZKart
            </NavLink>
          </div>
          <form
            className='flex items-center space-x-2 max-w-sm w-[54vw]'
            role='search'
            onSubmit={handleSubmit}
          >
            <label htmlFor='search' className='sr-only'>
              Search
            </label>
            <input
              required
              type='text'
              id='search'
              placeholder='Search ...'
              className='border border-customPalette-blue rounded-md h-10 w-[100%] text-lg text-customPalette-black px-2 
              focus:outline-none focus:border-customPalette-yellow'
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              className='bg-customPalette-yellow lg:p-2 md:p-2 p-1 rounded-md hover:bg-customPalette-blue/70 transition-colors duration-200 ease-in-out
               hover:text-customPalette-white'
              aria-label='Submit Search'
            >
              <SearchIcon />
            </button>
          </form>

          <ul className='lg:flex items-center justify-around w-[48vw] hidden' role='navigation'>
            <li>
              <NavLink
                to='/products'
                className='hover:text-customPalette-red'
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
                <CartIcon />
                <span>Cart</span>
                <span className='h-5 w-auto min-w-5 rounded-[50%] bg-customPalette-black font-semibold flex items-center justify-center text-customPalette-white bottom-5 right-14 relative'>
                  {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}
                </span>
              </NavLink>
            </li>
            <li className=''>
              {auth ? (
                <DropDown trigger={user} />
              ) : (
                <NavLink to={'/login'} className={'flex hover:text-customPalette-red'}>
                  <UserIcon />
                  Login
                </NavLink>
              )}
            </li>
            <li
              title='notifications'
              className='flex items-center space-x-1 hover:text-customPalette-blue cursor-pointer'
            >
              <AlertDialog>
                <AlertDialogTrigger className='flex'>
                  <BellIcon />
                  Notifications
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-customPalette-white text-customPalette-black'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>There are no notifications</AlertDialogTitle>
                    <AlertDialogDescription>
                      We'll notify you when there are notifications
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Ok</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
          <span className='lg:hidden relative left-6'>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label='Open Menu'
                className='p-4 text-customPalette-red transition duration-200 hover:text-customPalette-blue'
              >
                <MenuIcon />
              </SheetTrigger>
              <SheetContent className='text-customPalette-white font-bold text-lg p-6 bg-customPalette-black'>
                <SheetHeader>
                  <SheetTitle className='text-xl font-semibold mb-4'>Explore Menu</SheetTitle>
                  <SheetDescription className='space-y-6 list-none text-customPalette-white'>
                    <li>
                      <NavLink
                        to='/products'
                        className='flex items-center space-x-3 text-customPalette-blue transition duration-200 hover:text-customPalette-yellow'
                        aria-label='View Products'
                      >
                        <span>Products</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to='/cart'
                        className='flex items-center space-x-3 text-customPalette-yellow transition duration-200 hover:text-customPalette-blue'
                        aria-label='View Cart'
                      >
                        <CartIcon />
                        <span>Cart</span>
                        <span className='w-4 h-4 text-xs font-semibold rounded-full bg-customPalette-red flex items-center justify-center text-customPalette-white relative right-16 bottom-5'>
                          {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}
                        </span>
                      </NavLink>
                    </li>
                    <li className='mr-28'>
                      {auth ? (
                        <DropDown trigger={user} />
                      ) : (
                        <NavLink
                          to='/login'
                          className='flex items-center space-x-2 text-customPalette-white transition duration-200 hover:text-customPalette-red'
                        >
                          <UserIcon />
                          <span>Login</span>
                        </NavLink>
                      )}
                    </li>
                    <li
                      title='notifications'
                      className='flex items-center space-x-2 cursor-pointer text-customPalette-white transition duration-200 hover:text-customPalette-blue'
                    >
                      <AlertDialog>
                        <AlertDialogTrigger className='flex items-center space-x-2'>
                          <BellIcon />
                          <span>Notifications</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-customPalette-white text-customPalette-black p-6 rounded-lg shadow-lg'>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-lg font-semibold'>
                              No notifications
                            </AlertDialogTitle>
                            <AlertDialogDescription className='text-sm'>
                              We'll notify you when there are updates.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'>
                              Ok
                            </AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </span>

          {/* <span className='lg:hidden'>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger aria-label='Open Menu' className='text-customPalette-red p-4'>
               <MenuIcon/>
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
                       <CartIcon/>
                        <span>Cart</span>
                        <span className='w-4 h-4 rounded-full lg:bg-customPalette-black flex items-center justify-center text-customPalette-white bottom-4 right-14 relative'>
                          {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}
                        </span>
                      </NavLink>
                    </li>
                    <li className='text-customPalette-white'>
                     {auth ? (
              <DropDown trigger={user}/>
              ) : (
                <NavLink to={'/login'} className={'flex hover:text-customPalette-red'}>
                <UserIcon/>
                  Login
                </NavLink>
              )}
                    </li>
                    <li
                      title='notifications'
                      className='flex items-center space-x-1 hover:text-customPalette-blue cursor-pointer'
                    >
                      <AlertDialog>
                        <AlertDialogTrigger className='flex'>
                         <BellIcon/>
                          Notifications
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-customPalette-white text-customPalette-black'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>There are no notifications</AlertDialogTitle>
                            <AlertDialogDescription>
                              We'll notify you when there are notifications
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Ok</AlertDialogCancel>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </li>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </span> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
