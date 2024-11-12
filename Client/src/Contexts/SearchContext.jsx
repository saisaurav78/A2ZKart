import React, { createContext, useState } from 'react';

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected]= useState('All')
    return <SearchContext.Provider value={{ query, setQuery, selected, setSelected }}>
        {children}
    </SearchContext.Provider>;
};

export default SearchContext;
