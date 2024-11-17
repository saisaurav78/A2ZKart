import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const RegisterPage = () => {
  const [username,setUsername] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('')
    setLoading(true)

    if (!emailValid || !passwordValid || !passwordsMatch || !username) {
      setError('Please ensure all fields are valid.');
      setLoading(false)
      return;
    }

    try {
     // Make API request
      const response = await axios.post('http://localhost:8080/api/user/register',
        {
          username,
       email,
       password,
     });

     // Handle success
     setMessage(response.data.message); // Assuming API sends a success message
     console.log(response.data);
   } catch (err) {
     // Handle errors gracefully
     if (err.response && err.response.data) {
       setError(err.response.data.message || 'Login failed. Please try again.');
     } else {
       setError('An unexpected error occurred. Please try again later.');
     }
   } finally {
     setLoading(false);
   }
  
  };

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleRegister}
        className='lg:w-1/3 md:w-1/2 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <span className='text-customPalette-black text-xl font-medium title-font mb-5'>
          Register
        </span>
        {error && <span className='text-customPalette-red text-md mb-4'>{error}</span>}
        {message && <span className='text-green-500 text-md mb-4'>{message}</span>}
        <div className='relative mb-4'>
          <label htmlFor='username' className='text-customPalette-black text-md'>
            username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {username.length > 0 && (
            <span className='text-customPalette-blue text-sm'>username looks good</span>
          )}
        </div>
        <div className='relative mb-4'>
          <label htmlFor='email' className='text-customPalette-black text-md'>
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
              setEmailValid(value.includes('@') && value.slice(-4) === '.com');
            }}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {email.length > 0 ? (
            emailValid ? (
              <span className='text-customPalette-blue text-sm'>Email looks good</span>
            ) : (
              <span className='text-customPalette-red text-sm'>Invalid email</span>
            )
          ) : (
            <></>
          )}
        </div>
        <div className='relative mb-4'>
          <label htmlFor='password' className='text-customPalette-black text-md'>
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
              setPasswordValid(value.length >= 8 && value.length <= 20);
              setPasswordsMatch(value === confirmPassword);
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
        <div className='relative mb-4'>
          <label htmlFor='confirmpassword' className='text-md text-customPalette-black'>
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
          {password ? (
            passwordsMatch ? (
              <span className='text-customPalette-blue text-sm'>Passwords match</span>
            ) : (
              <span className='text-customPalette-red text-sm'>Passwords do not match</span>
            )
          ) : (
            <></>
          )}
        </div>
        <p>
          Have an Account? Sign in{' '}
          <Link
            to='/login'
            className='text-customPalette-blue underline text-lg hover:text-customPalette-red'
          >
            here
          </Link>
        </p>
        <br />
        <button
          disabled={loading}
          className='text-customPalette-white bg-customPalette-blue border-0 py-2 mt-5 px-8 focus:outline-none hover:bg-customPalette-yellow hover:text-customPalette-black rounded text-lg'
        >
          {loading ? 'Registering user...' : 'Register'}
        </button>
      </form>

    </section>
  );
};

export default RegisterPage;
