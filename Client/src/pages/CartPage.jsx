import { EmptyCartIcon, TrashIcon } from '@/components/icons/Icons';
import AuthContext from '@/Contexts/AuthContext';
import CartContext from '@/Contexts/CartContext';
import React, { useEffect, useState, useContext } from 'react';
import { toast} from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
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
    location.state?.showtoast ? toast(location.state.toastmessage,{duration:1500}) : '';
  },[location.state]);

  return (
    <>
      <section
        className='lg:grid lg:grid-cols-2 lg:grid-rows-[auto,1fr] gap-8 sm:flex sm:flex-row sm:flex-wrap 
      sm:justify-center sm:mx-5'
      >
        {cart.length > 0 ? (
          <>
            <div className='lg:col-span-1 lg:row-span-2 overflow-x-scroll lg:w-max'>
              <span className='lg:text-4xl text-2xl text-center m-5 block'>Your Cart</span>
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
                              eachItem.quantity > 9
                                ? alert('You cannot add more than 10 items')
                                : dispatch({ type: 'Increase', item: eachItem });
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
                            toast.error('Removed from Cart', {
                              duration: 2000
                            });
                        
                            dispatch({ type: 'Remove', item: eachItem });
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            

            <div
              className='col-start-2 lg:flex lg:flex-col lg:mx-28 lg:m-20 lg:gap-6 sm:gap-8 row-end-3 text-customPalette-black
            lg:space-y-0 space-y-9 m-9'
            >
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
                <span className='self-start lg:text-xl text-md'>use WELCOME10 for 10% off</span>
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
                onClick={() => {
                  auth ? navigate('/checkout') : navigate('/login');
                  setCartTotal(Math.ceil((cartTotal + 5) * ((100 - discount) / 100)));
                }}
                className='border-none bg-customPalette-blue text-xl text-customPalette-white shadow-md p-3
              hover:bg-customPalette-yellow hover:text-customPalette-black transition-all lg:mx-0 w-[100%]'
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className='col-span-2 m-16 flex flex-col items-center justify-center'>
            <span className='text-3xl lg:text-4xl text-nowrap'>Your Cart is Empty</span>
            <span className='lg:scale-100 scale-75'>
              {' '}
              <EmptyCartIcon />
            </span>
          </div>
        )}
      </section>
    </>
  );
};

export default CartPage;
