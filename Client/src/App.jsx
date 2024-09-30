import React, { useState } from 'react'
import { userContext } from './userContext';
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import Footer from './components/Footer';

const App = () => {
  const [navbarValue, setnavbarValue] = useState('')
  const onInputChange = (newvalue) => {
    setnavbarValue(newvalue)
  }
  return (
    <>
        <Navbar onInputChange={onInputChange} />
        <Routes>
          <Route path='/' element={<HomePage searchQuery={navbarValue } />}></Route>
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