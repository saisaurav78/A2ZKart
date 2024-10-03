import React, { useState } from 'react'
import { userContext } from './userContext';
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  const [query, setQuery] = useState('')
  const onInputChange = (newvalue) => {
    setQuery(newvalue)
  }
  return (
    <>
        <Navbar onInputChange={onInputChange} />
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/products' element={<ProductsPage searchQuery={query } />}></Route>
          <Route path='/cart' element={<CartPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/productdetail' element={<DetailPage />}></Route>
        </Routes>
      <Footer />
    </>
  );
}
export default App