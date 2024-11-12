import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  const [transition, setTransition] = useState(false);
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setTransition(true);
      const timeout = setTimeout(() => {
        setTransition(false);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      setTransition(false);
    }
  }, [location]);

  const onInputChange = (newValue) => {
    setQuery(newValue);
  };
  return (
    <>
      {transition && location.pathname==='/' ? (
        <div className='bg-customPalette-blue absolute w-full h-full z-20 flex justify-center items-center transition-all'>
          <div className='text-5xl animate-bounce text-customPalette-yellow font-medium'>
            A2ZKart
          </div>
        </div>
      ) : (
        <>
          <Navbar onInputChange={onInputChange} />
          <Routes key={location.pathname}>
            <Route path='/' element={<LandingPage />} />
            <Route path='/products' element={<ProductsPage searchQuery={query} />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/productdetail' element={<DetailPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
