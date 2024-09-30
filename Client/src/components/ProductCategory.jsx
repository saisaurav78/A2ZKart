import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';

const ProductCategory = () => {
  const { selected, setSelected } = useContext(userContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/category-list');
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='w-max absolute flex flex-col justify-evenly items-start shadow-lg'>
      <h2 className='font-medium text-xl m-5 text-center'>Categories</h2>
      <div
        key={'all'}
        className='flex flex-1 justify-evenly items-center p-3 border-2 border-customPalette-yellow w-full'
      >
        <label htmlFor={'All'} className='text-lg font-light w-full'>
          {'All'}
        </label>
        <input
          className='w-5 h-5 ml-2'
          onChange={() => setSelected('All')}
          value={'all'}
          checked={selected === 'All'}
          type='radio'
          name='option'
        />
      </div>

      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category}
            className='flex flex-1 justify-evenly items-center p-3 border-2 border-customPalette-yellow w-full'
          >
            <label htmlFor={category} className='text-lg font-light w-full'>
              {category}
            </label>
            <input
              className='w-5 h-5 ml-2'
              onChange={() => setSelected(category)}
              value={category}
              checked={selected === category}
              type='radio'
              name='option'
            />
          </div>
        ))
      ) : (
        <div className='font-medium text-xl m-5 text-center'>Loading...</div>
      )}
    </div>
  );
};

export default ProductCategory;
