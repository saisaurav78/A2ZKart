import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [error, setError] = useState('');
  const[loading,setLoading]= useState(false)

  const handleLogin = (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      setError('Please ensure all fields are valid.');
      return;
    }
    setError('');
     setLoading(true);
  };

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleLogin}
        className='lg:w-1/3 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <span className='text-customPalette-black text-xl font-medium title-font mb-5'>Sign in</span>
        {error && <span className='text-customPalette-red text-sm mb-4'>{error}</span>}
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
              setEmailValid(value.indexOf('.com') !== -1 && value.includes('@'));
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
