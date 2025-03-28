import React, { useContext, useEffect } from 'react';
import SearchContext from '@/Contexts/SearchContext';
import axios from 'axios';

const ProductCategory = ({ productCategories, setProductCategories }) => {
  const { selected, setSelected, setQuery } = useContext(SearchContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/category-list');
        setProductCategories(res.data || []); // Ensure data is an array
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [setProductCategories]); // Depend on setProductCategories to avoid re-fetching

  return (
    <aside className='w-max bg-customPalette-white relative hidden lg:flex flex-col justify-evenly items-start shadow-lg'>
      <h2 className='font-medium text-xl w-full p-3 text-center text-customPalette-black'>
        Categories
      </h2>

      {/* "All" Category Option */}
      <div
        key={'all'}
        className={`flex flex-1 justify-evenly items-center p-2 border-customPalette-blue ${
          selected === 'All' ? 'border-2' : 'border-0'
        } hover:bg-customPalette-yellow w-full`}
      >
        <label
          htmlFor={'All'}
          className='text-lg font-normal w-full h-full text-customPalette-black'
        >
          All
        </label>
        <input
          className='w-5 h-5 ml-2'
          onChange={() => {
            setSelected('All');
            setQuery('');
          }}
          value={'All'}
          checked={selected === 'All'}
          type='radio'
          name='category'
          id='All'
        />
      </div>

      {/* Dynamic Categories */}
      {productCategories.length > 0 ? (
        productCategories.map((category) => (
          <div
            key={category}
            className={`flex flex-1 justify-evenly items-center p-2 ${
              selected === category ? 'border-2' : 'border-0'
            } border-customPalette-blue hover:bg-customPalette-yellow transition-all duration-75 w-full`}
          >
            <label
              htmlFor={category}
              className='text-lg font-normal w-full h-full text-customPalette-black'
            >
              {category}
            </label>
            <input
              className='w-5 h-5 ml-2'
              onChange={() => {
                setSelected(category);
                setQuery('');
              }}
              value={category}
              checked={selected === category}
              type='radio'
              name='category'
              id={category}
            />
          </div>
        ))
      ) : (
        <div className='font-medium text-xl m-5 text-center'>Loading...</div>
      )}
    </aside>
  );
};

export default ProductCategory;
