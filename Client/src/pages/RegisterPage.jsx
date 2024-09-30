import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (!emailValid || !passwordValid || !passwordsMatch) {
      setError('Please ensure all fields are valid.');
      return;
    }
    
    setError('');
    alert('Registered successfully');
  };

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleRegister}
        className='lg:w-1/3 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <h2 className='text-gray-900 text-lg font-medium title-font mb-5'>Register</h2>
        {error && <span className='text-customPalette-red text-sm mb-4'>{error}</span>}
        <div className='relative mb-4'>
          <label htmlFor='email' className='leading-7 text-sm text-gray-600'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);
              setEmailValid(value.includes('@'));
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {emailValid ? (
            <span className='text-customPalette-blue text-sm'>Email looks good </span>
          ) : (
            <span className='text-customPalette-red text-sm'>Invalid Email</span>
          )}
        </div>
        <div className='relative mb-4'>
          <label htmlFor='password' className='leading-7 text-sm text-gray-600'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              setPasswordValid(value.length >= 8);
              setPasswordsMatch(value === confirmPassword);
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {passwordValid ? (
            <span className='text-customPalette-blue text-sm'>Password looks good </span>
          ) : (
            <span className='text-customPalette-red text-sm'>
              Password should be at least 8 characters
            </span>
          )}
        </div>
        <div className='relative mb-4'>
          <label htmlFor='confirmpassword' className='leading-7 text-sm text-gray-600'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmpassword'
            name='confirmpassword'
            value={confirmPassword}
            onChange={(e) => {
              const value = e.target.value;
              setConfirmPassword(value);
              setPasswordsMatch(value === password);
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {passwordsMatch ? (
            <span className='text-customPalette-blue text-sm'>Passwords match</span>
          ) : (
            <span className='text-customPalette-red text-sm'>Passwords do not match</span>
          )}
        </div>
        <p>
          Have an Account? Sign in{' '}
          <Link
            to='/login'
            className='text-customPalette-blue underline font-semibold hover:text-customPalette-red'
          >
            here
          </Link>
        </p>
        <br />
        <button className='text-customPalette-white bg-customPalette-blue border-0 py-2 px-8 focus:outline-none hover:bg-customPalette-yellow hover:text-customPalette-black rounded text-lg'>
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
