import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../userContext';
import axios from 'axios';

const ProductCategory = () => {
  const { selected, setSelected } = useContext(userContext);
  const [categories, setCategories] = useState([]);
  const [visible,setVisible]= useState('1')

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
  function toggleCategory() {
   setVisible('0')
  }

  return (
    <>
      <aside
        className={`w-max bg-customPalette-white relative flex flex-col justify-evenly items-start shadow-lg opacity-${visible}`}
      >
        <h2 className='font-medium text-xl w-full p-3 text-center text-customPalette-black'>
          Categories
        </h2>
        <div
          key={'all'}
          className={`flex flex-1 justify-evenly items-center p-2 border-customPalette-blue border-${selected==='All'?2:0} hover:bg-customPalette-yellow 
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
              className={`flex flex-1 justify-evenly items-center p-2 border-${selected===category?2:0} border-customPalette-blue  hover:bg-customPalette-yellow 
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
