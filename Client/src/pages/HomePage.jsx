import React, { useState } from 'react';
import ProductContainer from '../components/ProductContainer';
import ProductCategory from '../components/ProductCategory';
import { userContext } from '../userContext';

const HomePage = (props) => {
  const [selected, setSelected] = useState('All'); 

  return (
    <userContext.Provider value={{ selected, setSelected}}>
      <div className=''>
        <ProductCategory />
        <ProductContainer searchQuery={ props.searchQuery} />
      </div>
    </userContext.Provider>
  );
};

export default HomePage;
