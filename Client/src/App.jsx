import React, { useContext, useEffect, useState, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthContext from './Contexts/AuthContext';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Spinner from './components/ui/Spinner';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));

const App = () => {
  const { auth } = useContext(AuthContext);
  const [transition, setTransition] = useState(true);
  const location = useLocation();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (location.pathname === '/') {
      setTransition(true);
      const timeout = setTimeout(() => {
        setTransition(false);
      }, 1500);
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
      {transition && location.pathname === '/' ? (
        <div className='bg-customPalette-blue absolute w-full h-full z-20 flex justify-center items-center transition-all'>
          <div className='text-5xl animate-bounce text-customPalette-yellow font-medium'>
            A2ZKart
          </div>
        </div>
      ) : (
        <>
          <Navbar onInputChange={onInputChange} />
          <Routes key={location.pathname}>
            <Route
              path='/'
              element={
                <Suspense fallback={Spinner}>
                  <LandingPage />
                </Suspense>
              }
            />
            <Route
              path='/products'
              element={
                <Suspense fallback={Spinner}>
                  <ProductsPage searchQuery={query} />
                </Suspense>
              }
            />
            <Route
              path='/cart'
              element={
                <Suspense fallback={Spinner}>
                  <CartPage />
                </Suspense>
              }
            />
            <Route
              path='/login'
              element={
                <Suspense fallback={Spinner}>
                  {auth ? <Navigate to='/products' /> : <LoginPage />}
                </Suspense>
              }
            />
            <Route
              path='/register'
              element={
                <Suspense fallback={Spinner}>
                  <RegisterPage />
                </Suspense>
              }
            />
            <Route
              path='/checkout'
              element={
                <Suspense fallback={Spinner}>
                  <CheckoutPage />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
