import React, { useContext, useEffect, useState } from 'react';
import SearchContext from '@/Contexts/SearchContext';
import axios from 'axios';

const ProductCategory = () => {
  const { selected, setSelected } = useContext(SearchContext);
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
    <>
      <aside
        className={`w-max bg-customPalette-white relative  hidden lg:flex flex-col justify-evenly items-start shadow-lg`}
      >
        <h2 className='font-medium text-xl w-full p-3 text-center text-customPalette-black'>
          Categories
        </h2>
        <div
          key={'all'}
          className={`flex flex-1 justify-evenly items-center p-2 border-customPalette-blue ${selected==='All'?'border-2':'border-0'} hover:bg-customPalette-yellow 
           w-full`}
        >
          <label
            htmlFor={'All'}
            className='text-lg font-normal w-full h-full text-customPalette-black'
          >
            {'All'}
          </label>
          <input
            className='w-5 h-5 ml-2'
            onChange={() => setSelected('All')}
            value={'All'}
            checked={selected === 'All'}
            type='radio'
            name='option'
            id='All'
          />
        </div>

        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category}
              className={`flex flex-1 justify-evenly items-center p-2 ${selected===category?'border-2':'border-0'} border-customPalette-blue hover:bg-customPalette-yellow 
           transition-all duration-75 w-full`}
            >
              <label
                htmlFor={category}
                className='text-lg font-normal w-full h-full text-customPalette-black'
              >
                {category}
              </label>
              <input
                className='w-5 h-5 ml-2'
                onChange={() => setSelected(category)}
                value={category}
                checked={selected === category}
                type='radio'
                name='option'
                id={category}
              />
            </div>
          ))
        ) : (
          <div className='font-medium text-xl m-5 text-center'>Loading...</div>
        )}
      </aside>
    </>
  );
};

export default ProductCategory;
