import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='relative w-[100%] h-max text-customPalette-white bg-customPalette-black px-4 md:px-20 py-16'>
      <div className='container flex flex-col md:flex-row justify-between'>
        <div className='flex flex-col items-start justify-evenly mb-4'>
          <h1 className='text-xl hover:text-customPalette-blue'>Quick Links</h1>
          <NavLink
            to='/'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Home</p>
          </NavLink>
          <NavLink
            to='/cart'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Cart</p>
          </NavLink>
          <NavLink
            to='/orders'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Orders</p>
          </NavLink>
        </div>
        <div className='flex flex-col items-start justify-evenly mb-4 md:ml-10'>
          <h1 className='text-xl hover:text-customPalette-blue'>Consumer Policy</h1>
          <NavLink
            to='/contact'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Contact Us</p>
          </NavLink>
          <NavLink
            to='/privacy-policy'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Privacy Policy</p>
          </NavLink>
          <NavLink
            to='/terms'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>T&C</p>
          </NavLink>
          <NavLink
            to='/refund-policy'
            className='hover:text-customPalette-yellow hover:mx-2 text-customPalette-blue transition-all'
          >
            <p>Refund Policy</p>
          </NavLink>
        </div>
        <div className='flex flex-col items-start justify-evenly mb-4 md:ml-10'>
          <h1 className='text-xl hover:text-customPalette-blue'>Follow Us</h1>
          <NavLink
            to='/instagram'
            className='hover:text-customPalette-yellow text-customPalette-blue transition-all'
          >
            <p>Instagram</p>
          </NavLink>
          <NavLink
            to='/facebook'
            className='hover:text-customPalette-yellow  text-customPalette-blue transition-all'
          >
            <p>Facebook</p>
          </NavLink>
          <NavLink
            to='/twitter'
            className='hover:text-customPalette-yellow text-customPalette-blue transition-all'
          >
            <p>Twitter</p>
          </NavLink>
        </div>
      </div>
      <div className='w-full mt-4'>
        <p className='text-center'>&copy; A2ZKart 2024 All rights reserved</p>
        <p className='text-center'>Developed with ❤️ by Sai Sowrav</p>
      </div>
    </footer>
  );
};

export default Footer;
