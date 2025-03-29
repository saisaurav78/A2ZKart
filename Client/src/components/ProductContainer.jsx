import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import SearchContext from '@/Contexts/SearchContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { toast} from 'react-hot-toast'
import CartContext from '../Contexts/CartContext';
import VisibilityContext from '@/Contexts/VisibilityContext';
import { useLocation } from 'react-router-dom';
import { DrawIcon } from './icons/Icons';

const ProductContainer = () => {
  const location = useLocation();
  const { dispatch } = useContext(CartContext);
  const { query, selected } = useContext(SearchContext);
  const { setVisible } = useContext(VisibilityContext);

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('');

  const ITEMS_PER_PAGE = 5;

  // Fetch products
  const loadProducts = useCallback(async () => {
    let url;
    if (query) {
      url = `https://dummyjson.com/products/search?q=${query}`;
    } else {
      url =
        selected === 'All'
          ? `https://dummyjson.com/products/`
          : `https://dummyjson.com/products/category/${selected}`;
    }

    try {
      setLoading(true);
      const response = await axios.get(url);
      setAllProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to load products. Please try again later.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [query, selected]);

  useEffect(() => {
    loadProducts();
  }, [selected, query]);

  // Sorting products
  const sortedProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => {
      if (sortOrder === '<') return a.price - b.price;
      if (sortOrder === '>') return b.price - a.price;
      return 0;
    });
  }, [allProducts, sortOrder]);

  // Calculate total pages first
  const TOTAL_PAGES = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  // Adjust current page if needed
  useEffect(() => {
    if (currPage > TOTAL_PAGES) {
      setCurrPage(1);
    }
  }, [sortedProducts]);

  // Scroll to top when pagination changes
useEffect(() => {
  window.scrollTo(0,0)
}, [currPage]);


  // Then use TOTAL_PAGES inside paginatedProducts
  const paginatedProducts = useMemo(() => {
    return TOTAL_PAGES > 1
      ? sortedProducts.slice((currPage - 1) * ITEMS_PER_PAGE, currPage * ITEMS_PER_PAGE)
      : sortedProducts;
  }, [sortedProducts, currPage]);

  // Handle sorting
  const handleSort = useCallback((e) => {
    setSortOrder(e.target.value);
  }, []);

  // Handle "Add to Cart"
  const addToCart = useCallback(
    (product) => {
      toast('Added to Cart', {
       duration:3000,
        type: 'success',
      });
      dispatch({ type: 'Add', item: product });
    },
    [dispatch],
  );
useEffect(() => {
  if (location.state?.showtoast) {
    const { toastType, toastmessage } = location.state;
    toastType === 'Success'
      ? toast.success(toastmessage, { duration: 3000 })
      : toast(toastmessage, { duration: 3000 })
  }
}, [location.state]);


  return (
    <>
      {/* Sorting & Product Count */}
      <section className='max-w-screen-lg mx-auto p-4'>
        <header className='flex justify-between items-center mb-6'>
          <p className='text-sm font-medium lg lg:text-lg text-customPalette-black'>
            Showing page {currPage} of {TOTAL_PAGES} 
          </p>

          <select
            className='h-12 font-medium px-0 py-2 rounded-md shadow-sm border-2 border-customPalette-blue/50 focus:outline-none '
            onChange={handleSort}
            aria-label='Sort products'
            title='sort'
          >
            <option value=''>Latest Arrivals</option>
            <option value='>'>Price: High to Low</option>
            <option value='<'>Price: Low to High</option>
          </select>
        </header>
        <span
          onClick={() => {
            setVisible(true);
          }}
          className='lg:hidden ml-[100vw] sm:ml-[80vw] md:ml-[80vw]'
        >
          <DrawIcon/>
        </span>
      </section>

      {/* Product Listing Grid */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-screen-lg mx-auto'>
        {loading ? (
          <Skeleton count={ITEMS_PER_PAGE} height={'max'} width={'60vw'} enableAnimation />
        ) : paginatedProducts.length === 0 ? (
          <p className='text-center text-4xl text-customPalette-black col-span-full'>
            No products found
          </p>
        ) : (
          paginatedProducts.map((product) => (
            <div
              key={product.id}
              className='w-full text-wrap bg-customPalette-white flex flex-col items-center justify-center p-3 shadow-md border rounded-md transition-all'
            >
              <span className='text-xl p-2 text-center font-medium text-customPalette-black'>
                {product.title}
              </span>
              <img
                loading='lazy'
                src={product.images[0]}
                alt={`${product.title} image`}
                className='w-full max-h-52 p-3 object-contain rounded-sm hover:scale-105 transition-all ease-in-out hover:-translate-y-2 delay-75'
              />

              <span className='text-2xl p-2 text-customPalette-red text-center'>
                {'Price: $' + product.price}
              </span>
              <button
                onClick={() => addToCart(product)}
                className='bg-customPalette-blue text-white px-4 py-2 rounded-md mt-2 hover:bg-customPalette-yellow hover:text-black transition-all'
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </section>

      {/* Pagination Buttons */}
      <div className='flex justify-center mt-16 space-x-2' aria-label='Pagination'>
        {Array.from({ length: TOTAL_PAGES }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrPage(index + 1)}
            className={`px-4 py-2 text-lg font-medium rounded-md transition-all ${
              currPage === index + 1
                ? 'bg-customPalette-blue text-white'
                : 'bg-customPalette-blue/10 text-customPalette-black hover:bg-customPalette-yellow/50'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductContainer;
