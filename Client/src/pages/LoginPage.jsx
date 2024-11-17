import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '@/Contexts/AuthContext';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');
  const [message,setMessage]=useState('')
  const [loading, setLoading] = useState(false)
  const {setToken, setUser } = useContext(AuthContext)
  
  



 const handleLogin = async (e) => {
   e.preventDefault();
   setError('');
    setToken(null);
   setMessage('');
   setLoading(true);

   if (!emailValid || !passwordValid) {
     setError('Please ensure all fields are valid.');
     setLoading(false);
     return;
   }

   try {
     const response = await axios.post('http://localhost:8080/api/user/login', {
       email,
       password,
     });
     setMessage(response.data.message); 
     setToken(response.data.token)
     setUser(response.data.user)
   } catch (err) {
     setToken(null)
     if (err.response && err.response.data) {
       setError(err.response.data.message || 'Login failed. Please try again.');
     } else {
       setError('An unexpected error occurred. Please try again later.');
     }
   } finally {
     setLoading(false);
   }
  }
  

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleLogin}
        className='lg:w-1/3 md:w-1/2 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <span className='text-customPalette-black text-xl font-medium title-font mb-5'>Sign in</span>
        {error && <span className='text-customPalette-red text-md mb-4'>{error}</span>}
        {message && <span className='text-green-500 text-md mb-4'>{message}</span>}
        <div className='relative mb-4'>
          <label htmlFor='email' className='text-md text-customPalette-black'>
            Email
          </label>
          <input
            disabled={loading }
            type='text'
            id='email'
            name='email'
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              setEmailValid(value.indexOf('.com') !== -1  && (value.slice(-4)==='.com'));
              setError('')
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {email.length > 0 ? (
            emailValid ? (
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
            disabled={ loading}
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordValid(value.length >= 8 && value.length <= 20);
              setError('')
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {password.length > 0 ? (
            passwordValid ? (
              <span className='text-customPalette-blue text-sm'>Password looks good </span>
            ) : (
              <span className='text-customPalette-red text-sm'>
                Password should be 8-20 characters
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
        <button disabled={loading } className='text-customPalette-white bg-customPalette-blue border-0 py-2 mt-5 px-8 focus:outline-none hover:bg-customPalette-yellow hover:text-customPalette-black rounded text-lg'>
          { loading? 'Logging in...' :'Login'}
          </button>
      </form>
    </section>
  );
};

export default LoginPage;