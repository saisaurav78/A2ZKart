import React, { useEffect, useState, useContext } from 'react';
import SearchContext from '@/Contexts/searchContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { ToastContainer, toast } from 'react-toastify';
import { CartContext } from '@/Contexts/ContextProvider';

const ProductContainer = (props) => {
  const {dispatch} = useContext(SearchContext)  
  const { selected } = useContext(SearchContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const handleAddToCart = (e) => {
  //   if (e.target.innerHTML === 'Add to Cart') {
  //     toast('Added to Cart', {
  //       theme: 'dark',
  //       autoClose: 1000,
  //       type: 'success',
  //       pauseOnHover: false,
  //     });

  //     let productdata= products.find((item)=>{return item.title ===e.target.parentElement.childNodes[0].textContent.trim();})
  //     let cart = JSON.parse(localStorage.getItem("cart")) || []
  //         const existingProduct = cart.find((item) => item.id === productdata.id);

  //         if (existingProduct) {
  //           existingProduct.quantity += 1;
  //         } else {
  //           productdata.quantity = 1;
  //           cart.push(productdata);
  //         }
  //     localStorage.setItem("cart", JSON.stringify(cart))
  //   }
  // };
  const loadProducts = async () => {
    let url;
    if (props.searchQuery) {
      url = `https://dummyjson.com/products/search?q=${props.searchQuery}`;
    }
    else {
      if (selected === 'All') {
        url = `https://dummyjson.com/products/`;
      }
      else {
         url = `https://dummyjson.com/products/category/${selected}`;
      }
    }

    try {
      setLoading(true);
      const response = await axios.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  
const handleSort = (e) => {
  const value = e.target.value;
  const sortedProducts = [...products].sort((a, b) => {
    if (value === '<') {
      return a.price - b.price;
    } else if (value === '>') {
      return b.price - a.price; 
    }
    return 0;
  });
  setProducts(sortedProducts);
};


  useEffect(() => {
    loadProducts();
  }, [selected, props.searchQuery]);

  return (
    <>
      {' '}
      <div
        className='lg:relative text-xl m-5 flex lg:flex-row sm:flex-col sm:items-center justify-evenly flex-wrap lg:items-center sm:space-y-4 lg:space-y-0 
      lg:justify-between sm:w-[40vw] md:w-[40vw] lg:w-[68vw] w-[40vw]'
      >
        <span className='text-customPalette-black text-base text-nowrap lg:ml-40'>
          Showing {products.length} products
        </span>
        <select
          className='font-1 h-12 bg-customPalette-white text-xl font-normal sm:w-full lg:w-auto'
          onChange={handleSort}
        >
          <option value='>'>Price High to Low</option>
          <option value='<'>Price Low to High</option>
          <option value='' selected>
            Popular
          </option>
        </select>
        <span className='lg:hidden ml-[100vw]'>
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
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
            />
          </svg>
        </span>
      </div>
      <main
        className='lg:w-[70vw] lg:mt-4 lg:m-10 lg:p-5 grid lg:grid-cols-3 gap-2
       md:grid-cols-2 sm:grid-cols-2 sm:mt-10 sm:m-5'
      >
        {loading ? (
          <Skeleton count={30} height={'max'} width={'60vw'} />
        ) : products.length <= 0 ? (
          <div className='text-5xl text-center p-10 text-nowrap m-40'>No products found</div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className='w-full text-wrap bg-customPalette-white flex flex-col items-center justify-center p-5 shadow-md border rounded-md transition-all'
            >
              <span className='text-xl p-2 text-center font-medium text-customPalette-black'>
                {product.title}
              </span>
              <img
                loading='lazy'
                className='w-full h-60 p-3 object-contain rounded-sm hover:scale-105 transition-all ease-in-out hover:-translate-y-2 delay-75'
                src={product.images[0]}
                alt={'Product Img'}
              />
              <span className='text-2xl p-2 text-customPalette-red text-center'>
                {'Price: $' + product.price}
              </span>
              <button
                onClick={() => {
                  dispatch({ type: 'Add', item: product });
                }}
                className='bg-customPalette-blue text-customPalette-white text-md font-medium rounded-md mt-5 shadow-md p-1 hover:bg-customPalette-yellow 
              hover:text-customPalette-black  transition-all '
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </main>
      <ToastContainer />
    </>
  );
};

export default ProductContainer;
