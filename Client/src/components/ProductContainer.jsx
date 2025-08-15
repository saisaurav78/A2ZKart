import React, { useEffect, useState, useContext, useCallback, useMemo } from 'react';
import SearchContext from '@/Contexts/SearchContext';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-hot-toast';
import CartContext from '../Contexts/CartContext';
import VisibilityContext from '@/Contexts/VisibilityContext';
import { useLocation } from 'react-router-dom';
import { DrawIcon } from './icons/Icons';
import QuantitySelector from './QuantitySelector';
import { useDebounce } from '@/hooks/use-debounce';
import { PaginationContainer } from './PaginationContainer';

const ProductContainer = () => {
  const location = useLocation();
  const { dispatch, cart } = useContext(CartContext);
  const { query, setQuery, selected } = useContext(SearchContext);
  const { debouncedQuery } = useDebounce(query, 500);
  const { setVisible } = useContext(VisibilityContext);

  const [allProducts, setAllProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('');

  const ITEMS_PER_PAGE = 5;

  // Fetch products
  const loadProducts = useCallback(async () => {
    const skip = (currPage - 1) * ITEMS_PER_PAGE;

    const getUrl = () => {
      if (debouncedQuery) {
        return `https://dummyjson.com/products/search?q=${debouncedQuery}&limit=${ITEMS_PER_PAGE}&skip=${skip}`;
      }
      return selected === 'All'
        ? `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`
        : `https://dummyjson.com/products/category/${selected}?limit=${ITEMS_PER_PAGE}&skip=${skip}`;
    };

    try {
      setLoading(true);
      const { data } = await axios.get(getUrl());
      setAllProducts(data?.products ?? []);
      setTotalProducts(data?.total ?? 0);
    } catch (error) {
      toast.error('Failed to load products. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, selected, currPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Sorting products
  const sortedProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => {
      if (sortOrder === '<') return a.price - b.price;
      if (sortOrder === '>') return b.price - a.price;
      return 0;
    });
  }, [allProducts, sortOrder]);

  // Calculate total pages first
  const TOTAL_PAGES = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  // Adjust current page if needed
  useEffect(() => {
    if (currPage > TOTAL_PAGES) {
      setCurrPage(1);
    }
  }, [sortedProducts]);

  // Scroll to top when pagination changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  // Then use TOTAL_PAGES inside paginatedProducts
  const paginatedProducts = sortedProducts

  // Handle sorting
  const handleSort = useCallback((e) => {
    setSortOrder(e.target.value);
  }, []);

  // Handle "Add to Cart"
  const addToCart = useCallback(
    (product) => {
      toast('Added to Cart', {
        duration: 3000,
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
        : toast(toastmessage, { duration: 3000 });
    }
  }, [location.state]);

  return (
    <>
      {/* Sorting & Product Count */}
      <section className='max-w-screen-lg mx-auto p-4'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
          {/* Left Section (Results + Count) */}
          <div className='flex flex-col gap-2'>
            {/* Results Chip */}
            {query && (
              <div>
                <span className='inline-flex items-center px-3 py-1 bg-gray-200 rounded-full text-sm text-customPalette-black'>
                  Results for: "{query}"
                  <button
                    onClick={() => {
                      setQuery('');
                      setCurrPage(1);
                    }}
                    className='ml-2 text-gray-500 hover:text-gray-700 font-bold'
                    aria-label='Clear search'
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            {/* Pagination Count */}
            <p className='text-sm sm:text-base lg:text-lg font-medium text-customPalette-black'>
              Showing {totalProducts === 0 ? 0 : (currPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
              {Math.min(currPage * ITEMS_PER_PAGE, totalProducts)} of {totalProducts} products
            </p>
          </div>

          {/* Sort Dropdown */}
          <div>
            <select
              className='h-10 sm:h-12 font-medium px-2 py-2 rounded-md shadow-sm border-2 border-customPalette-blue/50 focus:outline-none w-full sm:w-auto'
              onChange={handleSort}
              aria-label='Sort products'
              title='sort'
            >
              <option value=''>Latest Arrivals</option>
              <option value='>'>Price: High to Low</option>
              <option value='<'>Price: Low to High</option>
            </select>
          </div>
        </div>

        <span
          onClick={() => {
            setVisible(true);
          }}
          className='lg:hidden ml-[100vw] sm:ml-[80vw] md:ml-[80vw]'
        >
          <DrawIcon />
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
          paginatedProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);

            return (
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
                {cartItem ? (
                  <div className='flex justify-center'>
                    <QuantitySelector
                      quantity={cartItem.quantity}
                      onDecrease={() => dispatch({ type: 'Decrease', item: cartItem })}
                      onIncrease={() => dispatch({ type: 'Increase', item: cartItem })}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product)}
                    className='bg-customPalette-blue text-white px-4 py-2 rounded-md mt-2 hover:bg-customPalette-yellow hover:text-black transition-all'
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })
        )}
      </section>

      {/* Pagination Buttons */}
      <div className='flex justify-center mt-16 space-x-2 mx-auto' aria-label='Pagination'>
        <PaginationContainer
          TOTAL_PAGES={TOTAL_PAGES}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      </div>
    </>
  );
};

export default ProductContainer;
