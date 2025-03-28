import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from '../components/icons/Icons';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [details, setDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [valid, setValid] = useState({
    emailValid: true,
    passwordValid: true,
    passwordsMatchValid: true,
  });

  const [formState, setFormState] = useState({
    error: '',
    loading: false,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|in|co\.uk|io|tech)$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails, [name]: value };

      setValid((prevValid) => ({
        emailValid: name === 'email' ? emailRegex.test(value) : prevValid.emailValid,
        passwordValid: name === 'password' ? passwordRegex.test(value) : prevValid.passwordValid,
        passwordsMatchValid: updatedDetails.password === updatedDetails.confirmPassword,
      }));

      return updatedDetails;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormState({ error: '', loading: true });

    const { username, email, password } = details;

    if (!email.trim() || !password.trim() || !username.trim()) {
      setFormState((prev) => ({
        ...prev,
        error: 'All fields are required',
        loading: false,
      }));
      return;
    }

    if (!valid.emailValid || !valid.passwordValid || !valid.passwordsMatchValid) {
      setFormState((prev) => ({
        ...prev,
        error: 'Please ensure all fields are valid',
        loading: false,
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/user/register', {
        username,
        email: email.toLowerCase(),
        password,
      });
      if (response.status === 201) {
        response.data?.message && alert(response.data.message);
        navigate('/login');
      }
    } catch (err) {
      setFormState((prev) => ({
        ...prev,
        error:
          err.response?.data?.message || 'An unexpected error occurred. Please try again later.',
        loading: false,
      }));
    }
  };

  return (
    <section className='w-full h-full flex items-center justify-center'>
      <form
        onSubmit={handleRegister}
        className='lg:w-1/3 md:w-1/2 sm:w-10/12 bg-customPalette-white shadow-lg rounded-lg p-6 flex flex-col m-10 mr-5'
      >
        <span className='text-customPalette-black lg:text-2xl text-xl font-medium title-font mb-5'>
          Register
        </span>
        {formState.error && (
          <span className='text-customPalette-red text-md mb-4'>{formState.error}</span>
        )}
        <div className='relative mb-4'>
          <label htmlFor='username' className='text-customPalette-black text-md'>
            username
          </label>
          <input
            type='text'
            id='username'
            disabled={formState.loading}
            name='username'
            value={details.username}
            onChange={handleChange}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
        </div>
        <div className='relative mb-4'>
          <label htmlFor='email' className='text-customPalette-black text-md'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            disabled={formState.loading}
            value={details.email}
            onChange={handleChange}
            className='w-full rounded border border-customPalette-blue py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
          />
          {details.email.length > 0 ? (
            valid.emailValid ? (
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
            disabled={formState.loading}
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='password'
            value={details.password}
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
          {details.password.length > 0 ? (
            valid.passwordValid ? (
              <span className='text-customPalette-blue text-sm'>Password looks good </span>
            ) : (
              <span className='text-customPalette-red text-sm'>
                <p>Password must contain:</p>
                <ul>
                  <li> At least one uppercase letter (A-Z)</li>
                  <li> At least one lowercase letter (a-z)</li>
                  <li> At least one number (0-9)</li>
                  <li> At least one special character (@$!%*?&)</li>
                  <li> Minimum 8 characters</li>
                </ul>
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
            disabled={formState.loading}
            type={showPassword ? 'text' : 'password'}
            id='password'
            name='confirmPassword'
            value={details.confirmPassword}
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
          {details.confirmPassword.length > 0 ? (
            valid.passwordsMatchValid ? (
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
          disabled={formState.loading}
          className='text-customPalette-white bg-customPalette-blue border-0 py-2 mt-5 px-8 focus:outline-none transition hover:bg-customPalette-yellow hover:text-customPalette-black rounded text-lg'
        >
          {formState.loading ? 'Registering user...' : 'Register'}
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
