import AuthContext from '@/Contexts/AuthContext';
import CartContext from '@/Contexts/CartContext';
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const location = useLocation()
  const { cart, cartTotal, setCartTotal, discount, setDiscount} = useContext(CartContext)
  const { dispatch } = useContext(CartContext)
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleDiscount = (e) => {
    e.target.value= e.target.value.trim()
    if (e.target.value === 'WELCOME10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };
  useEffect(() => {
    const itemsPrice = cart.map((item) => parseFloat(item.price) * item.quantity);
    const itemsPriceTotal = itemsPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    );
    setCartTotal(itemsPriceTotal);
  }, [cart, discount, cartTotal]);

  useEffect(() => {
    location.state?.showtoast ? toast(location.state.toastmessage,{autoClose:2000, theme:"light", type:"success"}) : '';
  },[location.state]);

  return (
    <>
      <ToastContainer />
      <section
        className='lg:grid lg:grid-cols-2 lg:grid-rows-[auto,1fr] gap-8 sm:flex sm:flex-row sm:flex-wrap 
      sm:justify-center sm:mx-5 '
      >
        {cart.length > 0 ? (
          <>
            <div className='lg:col-span-1 lg:row-span-2'>
              <span className='text-4xl text-center m-5 block'>Your Cart</span>
              <table className='shadow-md lg:m-5 lg:w-[50vw] lg:max-w-[50vw]'>
                <thead>
                  <tr>
                    <th className='px-4 py-2'>Item</th>
                    <th className='px-4 py-2'>Image</th>
                    <th className='px-4 py-2'>Quantity</th>
                    <th className='px-4 py-2'>Price</th>
                    <th className='px-4 py-2'>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((eachItem, index) => (
                    <tr key={index}>
                      <td className='px-4 py-2'>{eachItem.title}</td>
                      <td className='px-4 py-2'>
                        <img
                          src={`${eachItem.image || eachItem.images[0]}`}
                          className='w-28 max-h-28 object-contain mx-auto'
                          alt={eachItem.title}
                          loading='lazy'
                        />
                      </td>
                      <td className='px-4 py-2'>
                        <div className='flex justify-evenly'>
                          <button
                            className='bg-customPalette-red text-customPalette-white size-5'
                            onClick={() => {
                              dispatch({ type: 'Decrease', item: eachItem });
                            }}
                          >
                            -
                          </button>
                          <span>{eachItem.quantity}</span>
                          <button
                            className='bg-customPalette-blue text-customPalette-white size-5'
                            onClick={() => {
                             eachItem.quantity>9 ? alert('You cannot add more than 10 items'): dispatch({ type: 'Increase', item: eachItem });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className='px-4 py-2'>
                        $ {Math.ceil(eachItem.price * eachItem.quantity)}
                      </td>
                      <td className='px-4 py-2'>
                        <button
                          title='delete'
                          className='text-customPalette-red'
                          onClick={() => {
                            toast('Removed from Cart', {
                              theme: 'dark',
                              autoClose: 1500,
                              type: 'error',
                              pauseOnHover: false,
                            });
                            dispatch({ type: 'Remove', item: eachItem });
                          }}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className='col-start-2 lg:flex lg:flex-col lg:mx-28 lg:m-20 lg:gap-6 sm:gap-8 row-end-3 text-customPalette-black
            lg:space-y-0 space-y-9 m-9'>
              <span className='self-start text-xl text-customPalette-blue'>
                Sub Total: $ {Math.ceil(cartTotal)}
              </span>
              <hr />
              <span className='self-start text-xl text-customPalette-blue'>Shipping: $ 5.00</span>
              <hr />
              {discount > 0 ? (
                <span className='self-start text-xl text-customPalette-red'>
                  Discount: {discount + '%'}
                </span>
              ) : (
                <span className='self-start text-xl'>use WELCOME10 for 10% discount</span>
              )}

              <input
                placeholder='Coupon Code'
                className='border-none p-1 md:w-[100%] sm:w-[100%] outline-none text-customPalette-blue'
                type='text'
                onChange={(e) => {
                  handleDiscount(e);
                }}
                name='discountInput'
                id='discountInput'
              />
              <hr />
              <span className='self-start text-4xl font-medium text-customPalette-red'>
                Total: $ {Math.ceil((cartTotal + 5) * ((100 - discount) / 100))}
              </span>
              <button
                onClick={
                  () => {
                    auth ? navigate('/checkout') : navigate('/login') 
                    setCartTotal(Math.ceil((cartTotal + 5) * ((100 - discount) / 100)));
                  }
                }
                className='border-none bg-customPalette-blue text-xl text-customPalette-white shadow-md p-3
              hover:bg-customPalette-yellow hover:text-customPalette-black transition-all lg:mx-0 w-[100%]'
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className='col-span-2 m-16 flex flex-col items-center justify-center'>
            <span className='text-4xl font-sans text-nowrap'>Your Cart is Empty</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              enable-background='new 0 0 1500 1500'
              viewBox='0 0 1500 1500'
              width={400}
            >
              <g fill='#02020b' className='color000000 svgShape' transform='scale(1.875)'>
                <rect width='800' height='800' fill='none' />
                <circle
                  cx='750'
                  cy='750'
                  r='540.5'
                  fill='#f9cb77'
                  fill-rule='evenodd'
                  className='colore0e9f9 svgShape'
                  clip-rule='evenodd'
                  transform='translate(-23.64 -23.64) scale(.56485)'
                />
                <g
                  className='color000000 svgShape'
                  transform='rotate(3.884 1246.644 76.259) scale(1.0884)'
                >
                  <polygon
                    fill='#356cdc'
                    fill-rule='evenodd'
                    points='4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2'
                    className='color3594dc svgShape'
                    clip-rule='evenodd'
                    transform='matrix(.33483 0 -.1488 .88359 -425.458 -2019.43)'
                  />
                  <path
                    fill='#356cdc'
                    fill-rule='evenodd'
                    d='M4234,2697.2c0,0,49-290.9,65.6-389.7c3.1-18.7,19.4-32.4,38.3-32.4h85.4c4.5,0,8.7,2,11.6,5.4      c2.9,3.4,4.1,7.9,3.4,12.3c-1.1,6.6-2.4,14.1-3.4,20.1c-1.2,7.3-7.6,12.7-15,12.7c-23.1,0-69.2,0-69.2,0l-62.6,371.7H4234z'
                    className='color3594dc svgShape'
                    clip-rule='evenodd'
                    transform='translate(-1731.77 -979.943) scale(.53333)'
                  />
                  <polygon
                    fill='#356cdc'
                    fill-rule='evenodd'
                    points='4089 2804.5 4175.2 2804.5 4175.2 2961.2 4089 2961.2'
                    className='color3594dc svgShape'
                    clip-rule='evenodd'
                    transform='matrix(2.74912 0 -.02522 .14973 -10871.5 153.666)'
                  />
                  <path
                    fill='#80a4ed'
                    fill-rule='evenodd'
                    d='M4283,2410.7l-586.3,0c0,0,37.6,224.2,53.3,317.4c3.9,23.1,23.8,40,47.2,40c88.3,0,297,0,385.3,0      c23.4,0,43.4-16.9,47.2-40C4245.4,2634.9,4283,2410.7,4283,2410.7z'
                    className='color4fb4f3 svgShape'
                    clip-rule='evenodd'
                    transform='translate(-2164.2 -1260.6) scale(.64172)'
                  />
                  <path
                    fill='#1d55c7'
                    fill-rule='evenodd'
                    d='M3821.7,2489.9l34.4,197.7c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-34.4-197.6      c-2.4-13.6-15.3-22.7-28.9-20.4C3828.5,2463.3,3819.4,2476.3,3821.7,2489.9z'
                    className='color1d77c7 svgShape'
                    clip-rule='evenodd'
                    transform='translate(-1717.29 -978.37) scale(.53333)'
                  />
                  <path
                    fill='#356cdc'
                    fill-rule='evenodd'
                    d='M3824.9,2508.2l31.2,179.4c2.4,13.6,15.3,22.7,28.9,20.3c13.6-2.4,22.7-15.3,20.4-28.9l-31.2-179.4      c-2.4-13.6-15.3-22.7-28.9-20.4C3831.7,2481.6,3822.6,2494.6,3824.9,2508.2z'
                    className='color3594dc svgShape'
                    clip-rule='evenodd'
                    transform='translate(-1717.29 -978.37) scale(.53333)'
                  />
                  <path
                    fill='#1d55c7'
                    fill-rule='evenodd'
                    d='M3871,2481.3l34.3,197.6c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-34.3-197.7      c-2.4-13.6,6.8-26.5,20.4-28.9C3855.7,2458.6,3868.6,2467.7,3871,2481.3z'
                    className='color1d77c7 svgShape'
                    clip-rule='evenodd'
                    transform='matrix(-.53333 0 0 .53333 2509.6 -978.37)'
                  />
                  <path
                    fill='#356cdc'
                    fill-rule='evenodd'
                    d='M3874.2,2500l31.1,179c2.4,13.6-6.8,26.6-20.4,28.9c-13.6,2.4-26.6-6.8-28.9-20.3l-31.1-179      c-2.4-13.6,6.8-26.6,20.4-28.9C3858.9,2477.3,3871.9,2486.4,3874.2,2500z'
                    className='color3594dc svgShape'
                    clip-rule='evenodd'
                    transform='matrix(-.53333 0 0 .53333 2509.6 -978.37)'
                  />
                  <circle
                    cx='4221.5'
                    cy='2934.9'
                    r='74.1'
                    fill='#80a4ed'
                    fill-rule='evenodd'
                    className='color4fb4f3 svgShape'
                    clip-rule='evenodd'
                    transform='rotate(-86.116 887.879 2212.744) scale(.58893)'
                  />
                  <circle
                    cx='4221.5'
                    cy='2934.9'
                    r='41.5'
                    fill='#fff'
                    fill-rule='evenodd'
                    className='colorffffff svgShape'
                    clip-rule='evenodd'
                    transform='rotate(-86.116 748.041 1248.217) scale(.33009)'
                  />
                  <g className='color000000 svgShape' transform='translate(-214.555)'>
                    <circle
                      cx='4221.5'
                      cy='2934.9'
                      r='74.1'
                      fill='#80a4ed'
                      fill-rule='evenodd'
                      className='color4fb4f3 svgShape'
                      clip-rule='evenodd'
                      transform='rotate(-86.116 887.879 2212.744) scale(.58893)'
                    />
                    <circle
                      cx='4221.5'
                      cy='2934.9'
                      r='41.5'
                      fill='#fff'
                      fill-rule='evenodd'
                      className='colorffffff svgShape'
                      clip-rule='evenodd'
                      transform='rotate(-86.116 748.041 1248.217) scale(.33009)'
                    />
                  </g>
                </g>
                <path
                  fill='#356cdc'
                  fill-rule='evenodd'
                  d='M3815.9,2374.4c0,91.2-62.5,167.9-147,189.5l-31.8-189.5H3815.9z'
                  className='color3594dc svgShape'
                  clip-rule='evenodd'
                  transform='rotate(3.885 17917.271 -27187.194) scale(.58048)'
                />
                <g className='color000000 svgShape' transform='translate(-401.968 -24.545)'>
                  <circle
                    cx='2723.5'
                    cy='2299.7'
                    r='171'
                    fill='#d36135'
                    fill-rule='evenodd'
                    className='colorf2763d svgShape'
                    clip-rule='evenodd'
                    transform='translate(-852.633 -964.234) scale(.53333)'
                  />
                  <path
                    fill='#ed4707'
                    d='M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8      c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8      C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9      c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9      c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6      c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z'
                    className='colored3f07 svgShape'
                    transform='translate(-5171.21 -4548.84) scale(2.0901)'
                  />
                  <path
                    fill='#fff'
                    d='M2771.9,2305.3c0-4.6-0.7-8.1-2-10.6c-1.3-2.5-3.2-3.8-5.7-3.8c-2.4,0-4.3,1.2-5.6,3.8      c-1.3,2.5-1.9,6-1.9,10.6s0.6,8.1,1.9,10.7c1.3,2.5,3.1,3.8,5.6,3.8c2.4,0,4.3-1.3,5.7-3.8      C2771.2,2313.4,2771.9,2309.9,2771.9,2305.3z M2785.2,2305.3c0,4-0.5,7.6-1.6,10.7c-1,3.1-2.5,5.7-4.3,7.9      c-1.9,2.1-4.1,3.7-6.6,4.8c-2.6,1.1-5.4,1.6-8.4,1.6c-3.1,0-5.9-0.5-8.5-1.6c-2.6-1.1-4.8-2.7-6.6-4.8c-1.8-2.1-3.3-4.7-4.3-7.9      c-1-3.1-1.5-6.7-1.5-10.7s0.5-7.6,1.5-10.7c1-3.1,2.5-5.7,4.3-7.8c1.9-2.1,4.1-3.7,6.6-4.8c2.6-1.1,5.4-1.6,8.5-1.6      c3,0,5.8,0.6,8.4,1.6c2.6,1.1,4.8,2.7,6.6,4.8c1.8,2.1,3.3,4.7,4.3,7.8C2784.7,2297.7,2785.2,2301.3,2785.2,2305.3z'
                    className='colorffffff svgShape'
                    transform='translate(-5176.68 -4558.37) scale(2.0901)'
                  />
                </g>
                <g
                  className='color000000 svgShape'
                  transform='translate(-1430.73 1262.04) scale(.7358)'
                >
                  <path
                    fill='#d36135'
                    d='M3631.3,244.3c-0.5,0-1.1-0.1-1.6-0.2l-97.7-23.7c-3.7-0.9-6-4.6-5.1-8.3c0.9-3.7,4.6-6,8.3-5.1l97.7,23.7      c3.7,0.9,6,4.6,5.1,8.3C3637.2,242.2,3634.4,244.3,3631.3,244.3z'
                    class='colorf2763d svgShape'
                    transform='translate(-631.561 -1639.04) scale(.73655)'
                  />
                  <path
                    fill='#d36135'
                    d='M3621.4,260.8c-2.8,0-5.4-1.7-6.4-4.4l-29.7-77.5c-1.4-3.6,0.4-7.5,4-8.9c3.6-1.4,7.5,0.4,8.9,4l29.7,77.5      c1.4,3.6-0.4,7.5-4,8.9C3623.1,260.6,3622.2,260.8,3621.4,260.8z'
                    className='colorf2763d svgShape'
                    transform='translate(-543.978 -1733.64) scale(.73655)'
                  />
                  <path
                    fill='#d36135'
                    d='M3631.3,244.3c-1.8,0-3.5-0.7-4.9-2l-92.7-92.7c-2.7-2.7-2.7-7.1,0-9.7c2.7-2.7,7.1-2.7,9.7,0l92.7,92.7      c2.7,2.7,2.7,7.1,0,9.7C3634.8,243.6,3633.1,244.3,3631.3,244.3z'
                    className='colorf2763d svgShape'
                    transform='translate(-606.998 -1687.36) scale(.73655)'
                  />
                </g>
              </g>
            </svg>
          </div>
        )}
      </section>
    </>
  );
};

export default CartPage;
