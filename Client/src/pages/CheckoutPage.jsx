import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '@/Contexts/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/Contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { CardIcon, CashIcon } from '@/components/icons/Icons';
import { loadStripe } from '@stripe/stripe-js';
import { InlineSpinner } from '@/components/ui/Spinner';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const { cart, cartTotal, setCartTotal, discount, dispatch } = useContext(CartContext);
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const states = [
    { value: 'AP', name: 'Andhra Pradesh' },
    { value: 'AR', name: 'Arunachal Pradesh' },
    { value: 'AS', name: 'Assam' },
    { value: 'BR', name: 'Bihar' },
    { value: 'CT', name: 'Chhattisgarh' },
    { value: 'GA', name: 'Goa' },
    { value: 'GJ', name: 'Gujarat' },
    { value: 'HR', name: 'Haryana' },
    { value: 'HP', name: 'Himachal Pradesh' },
    { value: 'JK', name: 'Jammu and Kashmir' },
    { value: 'JH', name: 'Jharkhand' },
    { value: 'KA', name: 'Karnataka' },
    { value: 'KL', name: 'Kerala' },
    { value: 'MP', name: 'Madhya Pradesh' },
    { value: 'MH', name: 'Maharashtra' },
    { value: 'MN', name: 'Manipur' },
    { value: 'ML', name: 'Meghalaya' },
    { value: 'MZ', name: 'Mizoram' },
    { value: 'NL', name: 'Nagaland' },
    { value: 'OD', name: 'Odisha' },
    { value: 'PB', name: 'Punjab' },
    { value: 'RJ', name: 'Rajasthan' },
    { value: 'SK', name: 'Sikkim' },
    { value: 'TN', name: 'Tamil Nadu' },
    { value: 'TS', name: 'Telangana' },
    { value: 'UP', name: 'Uttar Pradesh' },
    { value: 'UK', name: 'Uttarakhand' },
    { value: 'WB', name: 'West Bengal' },
    { value: 'AN', name: 'Andaman and Nicobar Islands' },
    { value: 'CH', name: 'Chandigarh' },
    { value: 'DN', name: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'DL', name: 'Delhi' },
    { value: 'LD', name: 'Lakshadweep' },
    { value: 'PY', name: 'Puducherry' },
  ];

  useEffect(() => {
    const itemsPrice = cart.map((item) => parseFloat(item.price) * item.quantity);
    const itemsPriceTotal = itemsPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCartTotal(Math.ceil(itemsPriceTotal));
  }, [cart, discount, cartTotal]);

  const [details, setDetails] = useState({
    fullname: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
    saveAddress: false,
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type !== 'checkbox') {
      setValid(value.trim() !== '');
    }

    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOrder = async (paymentMethod) => {
    setIsLoading(true);
    try {
      const isDetailsValid =
        details &&
        details.fullname?.trim() &&
        details.address?.trim() &&
        details.city?.trim() &&
        details.state?.trim() &&
        details.zipcode &&
        details.phone;

      if (!isDetailsValid) {
        setValid(false);
        toast.error('Ensure all address fields are valid');
        setIsLoading(false);
        return;
      }

      const uri = `${BASE_URL}/orders/`;
      const payload = {
        order: cart,
        orderTotal: cartTotal,
        discount: discount,
        paymentMethod,
        address: details,
      };

      const config = {
        withCredentials: true,
      };

      const response = await axios.post(uri, payload, config);

      if (paymentMethod === 'cod') {
        if (response.status === 201) {
          dispatch({ type: 'CLEAR_CART' });
          localStorage.removeItem('a2zkart');
          navigate('/thankyou', { state: { orderSuccess: true } });
        } else {
          alert('Unexpected response from server');
        }
      } else if (paymentMethod === 'card') {
        const { sessionId } = response.data;

        if (sessionId) {
          const stripe = await stripePromise;
          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });

          if (error) {
            console.error('Stripe redirect error:', error);
            alert('Something went wrong. Please try again.');
          }
        } else {
          alert('Failed to initiate payment. Please try again.');
        }
      }
    } catch (error) {
      console.error('Order Error:', error);
      alert(
        error.response?.data?.message ||
          'An error occurred while placing the order. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/address`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.message.length > 0) {
        toast.success('Existing address found', { duration: 2000 });
        setDetails(response.data.message[0]);
      }
    } catch (error) {
      toast.error('No address found', { duration: 2000 });
    }
  };
  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth]);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/products');
    } else {
      fetchAddress();
    }
  }, [cart]);

  return (
    <>
      <section className='w-full h-full flex flex-col lg:flex-row'>
        <div className='container w-[100%] m-auto lg:w-[60%] p-5 flex-col lg:ml-28 flex items-center justify-center lg:items-start'>
          <span className='text-2xl lg:text-4xl w-full p-3  text-center lg:text-start text-customPalette-black font-semibold'>
            Shipping Details
          </span>

          <form className='flex flex-col justify-start items-start w-[90%] gap-4 my-5'>
            <div className='flex flex-col w-full'>
              <label htmlFor='fullname' className='text-lg font-medium mb-1'>
                Full Name:
              </label>
              <input
                type='text'
                id='fullname'
                value={details.fullname}
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                name='fullname'
                placeholder='Full Name'
                required
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='address' className='text-lg font-medium mb-1'>
                Address:
              </label>
              <input
                type='text'
                id='address'
                value={details.address}
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                name='address'
                placeholder='Address'
                required
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='city' className='text-lg font-medium mb-1'>
                City:
              </label>
              <input
                type='text'
                id='city'
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                name='city'
                value={details.city}
                placeholder='City'
                required
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='state' className='text-lg font-medium mb-1'>
                State:
              </label>
              <select
                required
                name='state'
                id='state'
                value={details.state}
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                onChange={handleChange}
              >
                <option>Choose a State</option>
                {states.map((state) => {
                  return (
                    <option key={state.value} value={`${state.value}`}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='zipcode' className='text-lg font-medium mb-1'>
                ZIP Code:
              </label>
              <input
                type='tel'
                id='zipcode'
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                name='zipcode'
                placeholder='ZIP Code'
                required
                value={details.zipcode}
                pattern='\d*'
                minLength='6'
                maxLength='6'
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='country' className='text-lg font-medium mb-1'>
                Country:
              </label>
              <select
                required
                value={details.country}
                name='country'
                id='country'
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                onChange={handleChange}
              >
                <option value=''>Choose a Country</option>
                <option value='INDIA'>INDIA</option>
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='phoneNumber' className='text-lg font-medium mb-1'>
                Phone Number:
              </label>
              <input
                value={details.phone}
                onChange={handleChange}
                type='tel'
                id='phone'
                className={`border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow ${
                  !valid && 'border-red-500 focus:ring-0'
                }`}
                name='phone'
                placeholder='Phone Number'
                pattern='\d*'
                minLength='10'
                maxLength='10'
                required
              />
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='saveAddress'
                  className='border-2 h-5 w-5 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                  name='saveAddress'
                  onChange={handleChange}
                  checked={details.saveAddress}
                />
                <label htmlFor='saveAddress' className='text-lg text-gray-700 font-medium'>
                  Save Address for future purchases
                </label>
              </div>
            </div>

            <div className='w-full flex lg:flex-row '>
              <NavLink to={'/cart'} className='w-[100%] p-4 text-customPalette-black font-semibold'>
                Return to cart
              </NavLink>
            </div>
          </form>
        </div>

        <div className='container lg:w-[50%] w-[80%] flex flex-col m-auto lg:m-0 lg:mr-28'>
          <span className='text-4xl bg-customPalette-blue w-full p-3 my-5 text-center text-customPalette-white font-semibold'>
            Order Details
          </span>
          <div className='p-5 flex flex-col bg-customPalette-white text-xl shadow-md rounded-md'>
            <span className='text-xl font-semibold mb-4'>Order Summary</span>

            <div className='flex justify-between mb-2'>
              <span>Items:</span>
              <span> {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}</span>
            </div>

            <div className='flex justify-between mb-2'>
              <span>Sub Total:</span>
              <span>$ {cart.length > 0 ? cartTotal : 0}</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span className='text-customPalette-red'>Discount:</span>
              <span className='text-customPalette-red'>
                $ {discount ? Math.ceil((discount / 100) * cartTotal) : 0}
              </span>
            </div>

            <div className='flex justify-between mb-2'>
              <span>Shipping:</span>
              <span>$ 5</span>
            </div>

            <div className='flex justify-between mt-4 border-t-2 border-customPalette-blue pt-2'>
              <span className='font-bold'>Total:</span>
              <span className='font-bold'>
                $ {Math.ceil((cartTotal + 5) * ((100 - discount) / 100))}
              </span>
            </div>
          </div>

          <div className='shadow-md p-5 my-5 rounded-md bg-customPalette-white'>
            <span className='text-xl font-semibold mb-3 block'>Select Payment Method</span>

            <form
              className='flex flex-col gap-3 mt-3'
              onSubmit={(e) => {
                e.preventDefault();
                const paymentMethod = e.target.paymentMethod.value;
                handleOrder(paymentMethod);
              }}
            >
              <div className='space-y-4'>
                <label
                  htmlFor='cod'
                  className='flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:shadow-md transition'
                >
                  <input
                    type='radio'
                    id='cod'
                    name='paymentMethod'
                    value='cod'
                    className='accent-customPalette-red size-5'
                    required
                  />
                  <CashIcon className='w-6 h-6 text-customPalette-red' />
                  <span className='text-lg text-customPalette-black'>Cash on Delivery (COD)</span>
                </label>

                <label
                  htmlFor='card'
                  className='flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:shadow-md transition'
                >
                  <input
                    type='radio'
                    id='card'
                    name='paymentMethod'
                    value='card'
                    className='accent-customPalette-red size-5'
                  />
                  <CardIcon className='w-6 h-6 text-customPalette-blue' />
                  <span className='text-lg text-customPalette-black'>Credit/Debit Card</span>
                </label>
              </div>

              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-customPalette-yellow text-customPalette-black font-semibold py-3 mt-4 rounded-md 
    hover:bg-customPalette-blue hover:text-customPalette-white transition-all duration-200 
    active:scale-95 focus:outline-none focus:ring-2 focus:ring-customPalette-blue focus:ring-opacity-50'
              >
                {isLoading ? (
                  <span className='flex items-center gap-2 justify-center'>
                    Processing <InlineSpinner />
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
