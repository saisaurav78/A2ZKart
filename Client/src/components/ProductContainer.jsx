import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { ToastContainer, toast } from 'react-toastify';

const ProductContainer = (props) => {
  const [count,setCount]= useState(5)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selected } = useContext(userContext);

  const handleAddToCart = (e) => {
    if (e.target.innerHTML === 'Add to Cart') {
      toast('Added to Cart', {
        theme: 'light',
        autoClose: 3000,
        type: 'success',
        pauseOnHover: false,
      });
    }
  };

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

  useEffect(() => {
    loadProducts();
  }, [selected, props.searchQuery]);

  return (
    <>
      <main
        className='lg:w-[65vw] lg:mt-24 lg:m-10 lg:p-5 grid lg:grid-cols-3 gap-2
       md:grid-cols-2 sm:grid-cols-1 sm: w-[80vw] sm:mt-10 sm:m-5'
      >
        <div className='lg:absolute top-24 mt-2 text-xl w-[60%] flex justify-between'>
          <span className='text-customPalette-black'> showing {products.length} products </span>
            <select name='' id=''>
              <option value=''>Sort By</option>
              <option value=''>Price High to Low</option>
              <option value=''>Price Low to high</option>
              <option value=''>Popular</option>
            </select>
        </div>
        {loading ? (
          <Skeleton count={30} height={'max'} width={'60vw'} />
        ) : products.length <= 0 ? (
          <div className='text-5xl text-center p-10 text-nowrap m-40'>No products found</div>
          ) : (products.map((product) => (
            <div
              key={product.id}
              className='w-full text-balance bg-customPalette-white flex flex-col items-center justify-center p-5 shadow-xl border rounded-md transition-all'
              onClick={handleAddToCart}
            >
              <span className='text-xl p-2 text-center font-medium text-customPalette-black'>{product.title}</span>
              <img
                loading='lazy'
                className='w-full h-60 p-3 object-contain rounded-sm hover:scale-105 transition-all ease-in-out hover:-translate-y-2 delay-75'
                src={product.images[0]}
                alt={'Product Img'}
              />
              <span className='text-2xl p-2 text-customPalette-red text-center'>
                {'Price: $' + product.price}
              </span>
              <button className='bg-customPalette-blue text-md font-medium rounded-md mt-5 shadow-md p-1  text-customPalette-white hover:text-customPalette-yellow'>
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
