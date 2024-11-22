import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartContext from '@/Contexts/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '@/Contexts/AuthContext';

const CheckoutPage = () => {
  const navigate = useNavigate()
  const {auth} = useContext(AuthContext)
  const { cart, cartTotal } = useContext(CartContext);
  const [details, setDetails] = useState({
    fullname:"",
    Address:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]:value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
   try {
   const response = await axios.post(
     'http://localhost:8080/api/address',
     { details },
     { withCredentials: true }
   );

     console.log(response.data)
     if (response.status === 201) {
       alert(response.data.message)
     }
   } catch (error) {
     console.log(error)
   }
    
  }
const fetchAddress = async () => {
  try {
    const existingAddress = await axios.get('http://localhost:8080/api/address', {
      withCredentials: true,
    });

    if (existingAddress.status === 200) {
      if (existingAddress.data && existingAddress.data.message) {
        setDetails(existingAddress.data.message[0]); // Ensure data matches the expected structure
        console.log(existingAddress.data.message[0]); // Ensure data matches the expected structure
        alert('Existing address found');
      } else {
        console.warn('No address data returned');
      }
    } else {
      console.warn('Unexpected status:', existingAddress.status);
      alert(existingAddress.data.message || 'Failed to fetch the address.');
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    alert('Error fetching address. Please try again later.');
  }
};

  useEffect(() => {
    if (!auth) {
     navigate('/login')
    }
  }, [auth])

  useEffect(() => {
    fetchAddress()
  },[])
  


  return (
    <>
      <section className='w-full h-full flex flex-col lg:flex-row '>
        <div className='container w-[100%] m-auto lg:w-[60%] p-5 flex flex-col lg:ml-28'>
          <span className='text-4xl w-full p-3  text-customPalette-black font-semibold'>
            Shipping Details
          </span>

          <form
            action=''
            className='flex flex-col justify-start items-start w-[80%] gap-4 my-5'
            onSubmit={handleSubmit}
          >
            <div className='flex flex-col w-full'>
              <label htmlFor='fullname' className='text-lg font-medium mb-1'>
                Full Name:
              </label>
              <input
                type='text'
                id='fullname'
                value={details.fullname}
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                name='fullname'
                placeholder='Full Name'
                required
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='Address' className='text-lg font-medium mb-1'>
                Address:
              </label>
              <input
                type='text'
                id='Address'
                value={details.Address}
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                name='Address'
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
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
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
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                onChange={handleChange}
              >
                <option>Choose a State</option>
                <option value='AP'>Andhra Pradesh</option>
                <option value='AR'>Arunachal Pradesh</option>
                <option value='AS'>Assam</option>
                <option value='BR'>Bihar</option>
                <option value='CT'>Chhattisgarh</option>
                <option value='GA'>Goa</option>
                <option value='GJ'>Gujarat</option>
                <option value='HR'>Haryana</option>
                <option value='HP'>Himachal Pradesh</option>
                <option value='JK'>Jammu and Kashmir</option>
                <option value='JH'>Jharkhand</option>
                <option value='KA'>Karnataka</option>
                <option value='KL'>Kerala</option>
                <option value='MP'>Madhya Pradesh</option>
                <option value='MH'>Maharashtra</option>
                <option value='MN'>Manipur</option>
                <option value='ML'>Meghalaya</option>
                <option value='MZ'>Mizoram</option>
                <option value='NL'>Nagaland</option>
                <option value='OD'>Odisha</option>
                <option value='PB'>Punjab</option>
                <option value='RJ'>Rajasthan</option>
                <option value='SK'>Sikkim</option>
                <option value='TN'>Tamil Nadu</option>
                <option value='TS'>Telangana</option>
                <option value='UP'>Uttar Pradesh</option>
                <option value='UK'>Uttarakhand</option>
                <option value='WB'>West Bengal</option>
                <option value='AN'>Andaman and Nicobar Islands</option>
                <option value='CH'>Chandigarh</option>
                <option value='DN'>Dadra and Nagar Haveli and Daman and Diu</option>
                <option value='DL'>Delhi</option>
                <option value='LD'>Lakshadweep</option>
                <option value='PY'>Puducherry</option>
              </select>
            </div>

            <div className='flex flex-col w-full'>
              <label htmlFor='zipcode' className='text-lg font-medium mb-1'>
                ZIP Code:
              </label>
              <input
                type='number'
                id='zipcode'
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                name='zipcode'
                placeholder='ZIP Code'
                required
                value={details.zipcode}
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
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
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
                type='number'
                id='phone'
                className='border-2 w-full h-10 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                name='phone'
                placeholder='Phone Number'
                required
              />
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='saveaddress'
                  className='border-2 h-5 w-5 rounded-md focus:outline-none focus:ring-2 focus:ring-customPalette-yellow'
                  name='saveaddress'
                  required
                />
                <label htmlFor='saveaddress' className='text-lg text-gray-700 font-medium'>
                  Save Address for future purchases
                </label>
              </div>
            </div>

            <div className='w-full flex lg:flex-row '>
              <NavLink to={'/cart'} className='w-[50%] p-4 text-customPalette-black font-semibold'>
                Return to cart
              </NavLink>
              <button
                type='submit'
                className='w-[50%] bg-customPalette-yellow text-customPalette-black font-semibold py-2 mt-4 rounded-md'
              >
                Add Address
              </button>
            </div>
          </form>
        </div>

        <div className='container lg:w-[50%] w-[80%] flex flex-col m-auto lg:m-0 lg:mr-28'>
          <span className='text-4xl bg-customPalette-blue w-full p-3 my-5 text-center text-customPalette-white font-semibold'>
            Payment Details
          </span>
          <div className='p-5 flex flex-col bg-customPalette-white text-xl shadow-md rounded-md'>
            <span className='text-xl font-semibold mb-4'>Order Summary</span>

            <div className='flex justify-between mb-2'>
              <span>Items:</span>
              <span> {cart.reduce((acc, cartItem) => acc + cartItem.quantity, 0)}</span>
            </div>

            <div className='flex justify-between mb-2'>
              <span>Sub Total:</span>
              <span>$ {cart.length > 0 ? cartTotal - 5 : 0}</span>
            </div>

            <div className='flex justify-between mb-2'>
              <span>Shipping:</span>
              <span>$ 5</span>
            </div>

            <div className='flex justify-between mt-4 border-t-2 border-customPalette-blue pt-2'>
              <span className='font-bold'>Total:</span>
              <span className='font-bold'>$ {cart.length > 0 ? cartTotal : 5}</span>
            </div>
          </div>

          <div className='shadow-md p-5 my-5 rounded-md bg-customPalette-white'>
            <span className='text-xl font-semibold mb-3 block'>Select Payment Method</span>

            <form className='flex flex-col gap-3 mt-3'>
              <div className='flex items-center'>
                <input
                  type='radio'
                  id='cod'
                  name='paymentMethod'
                  value='cod'
                  className='mr-2'
                  required
                />
                <label htmlFor='cod' className='text-lg'>
                  Cash on Delivery (COD)
                </label>
              </div>

              <div className='flex items-center'>
                <input type='radio' id='card' name='paymentMethod' value='card' className='mr-2' />
                <label htmlFor='card' className='text-lg'>
                  Credit/Debit Card
                </label>
              </div>

              <div className='flex items-center'>
                <input type='radio' id='upi' name='paymentMethod' value='upi' className='mr-2' />
                <label htmlFor='upi' className='text-lg'>
                  UPI
                </label>
              </div>
              <button
                type='submit'
                className='w-[100%] bg-customPalette-yellow text-customPalette-black font-semibold py-2 mt-4 rounded-md hover:bg-customPalette-blue hover:text-customPalette-white transition duration-200'
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
