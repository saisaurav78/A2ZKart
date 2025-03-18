import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import AuthContext from '@/Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import CartContext from '@/Contexts/CartContext';



const LoginPage = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { cart } = useContext(CartContext);
  const [showPassword, setShowPassword] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const [formState, setFormState] = useState({
    error: '',
    loading: false,
  });

  const [valid, setValid] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|in|co\.uk|io|tech)$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValid((prev) => {
      const newValidity = {
        emailValid: name === 'email' ? emailRegex.test(value) : prev.emailValid,
        passwordValid: name === 'password' ? value.length >= 8 : prev.passwordValid,
      };
      if (
        newValidity.emailValid !== prev.emailValid ||
        newValidity.passwordValid !== prev.passwordValid
      ) {
        return newValidity;
      }

      return prev;
    });
  };
  
    const handleLogin = async (e) => {
      e.preventDefault();

      setFormState({ error: '', loading: true });

      const { email, password } = loginDetails;

      if (!email.trim() || !password.trim()) {
        setFormState((prev) => ({
          ...prev,
          error: 'Email and password are required.',
          loading: false,
        }));
        return;
      }

      if (!valid.emailValid || !valid.passwordValid) {
        setFormState((prev) => ({
          ...prev,
          error: 'Please ensure all fields are valid.',
          loading: false,
        }));
        return;
      }
      try {
        const response = await axios.post(
          `${BASE_URL}/user/login`,
          { email, password },
          { withCredentials: true },
        );

        if (response.status === 200) {
          setAuth(true);
          navigate(cart.length > 0 ? '/cart' : '/products', {
            state: { showtoast: true, toastmessage: response.data.message },
          });
        }
      } catch (err) {
        setAuth(false);
        setFormState((prev) => ({
          ...prev,
          error:
            err.response?.data?.message || 'An unexpected error occurred. Please try again later.',
          loading: false,
        }));
      } finally {
        setFormState((prev) => ({ ...prev, loading: false }));
      }
  };
  
  const handleOAuth = () => {
    window.location.assign(`${BASE_URL}/user/google/OAuth`);
  }

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleLogin}
        className='lg:w-1/3 md:w-1/2 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <span className='text-customPalette-black lg:text-2xl text-xl font-medium title-font mb-5'>
          Sign in
        </span>
        {formState.error && (
          <span className='text-customPalette-red text-md mb-4'>{formState.error}</span>
        )}
        <div className='relative mb-4'>
          <label htmlFor='email' className='text-md text-customPalette-black'>
            Email
          </label>
          <input
            disabled={formState.loading}
            type='text'
            id='email'
            name='email'
            value={loginDetails.email}
            onChange={handleChange}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {loginDetails.email.length > 0 ? (
            valid.emailValid ? (
              <span className='text-customPalette-blue text-sm'>Email looks good</span>
            ) : (
              <span className='text-customPalette-red text-sm'>Invalid Email</span>
            )
          ) : (
            <></>
          )}
        </div>
        <div className='relative mb-4'>
          <label htmlFor='password' className='text-md text-customPalette-black'>
            Password
          </label>
          <input
            disabled={formState.loading}
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={loginDetails.password}
            onChange={handleChange}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          <button
            title='show password'
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-8 text-customPalette-blue'
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </button>

          {loginDetails.password.length > 0 ? (
            valid.passwordValid ? (
              <span className='text-customPalette-blue text-sm'>Password looks good </span>
            ) : (
              <span className='text-customPalette-red text-sm'>
                Password must be at least 8 characters long.
              </span>
            )
          ) : (
            <></>
          )}
        </div>
        <p>
          Don't have an account? Register{' '}
          <Link
            to='/register'
            className='text-customPalette-blue underline text-lg hover:text-customPalette-red'
          >
            here
          </Link>
        </p>
        <br />
        <button
          type='submit'
          title='login'
          disabled={formState.loading}
          className='text-customPalette-white bg-customPalette-blue border-0 py-2 mt-2 px-8 focus:outline-none transition hover:bg-customPalette-yellow hover:text-customPalette-black rounded text-lg'
        >
          {formState.loading ? 'Logging in...' : 'Login'}
        </button>
        <span className='text-xl text-center mt-5'>OR</span>
        <button
          onClick={handleOAuth}
          type='button'
          title='google login'
          className='flex items-center justify-center gap-2 px-4 py-2 mt-5 border rounded-md shadow-md bg-white text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition'
        >
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png'
            alt='Google Logo'
            className='w-5 h-5'
          />
          <span>Sign in with Google</span>
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
