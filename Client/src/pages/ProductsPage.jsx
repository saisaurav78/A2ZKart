import React, { useState } from 'react';
import ProductContainer from '../components/ProductContainer';
import ProductCategory from '../components/ProductCategory';
import SearchContext from '@/Contexts/searchContext';

const ProductsPage = (props) => {
  const [selected, setSelected] = useState('All');

  return (
    <SearchContext.Provider value={{ selected, setSelected }}>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/4 w-full p-4'>
          <ProductCategory />
        </div>
        <div className='lg:w-3/4 w-full p-4'>
          <ProductContainer searchQuery={props.searchQuery} />
        </div>
      </div>
    </SearchContext.Provider>
  );
};

export default ProductsPage;
