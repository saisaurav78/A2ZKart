import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import  { CartContextProvider } from './Contexts/CartContext.jsx';
import { SearchContextProvider } from './Contexts/searchContext.jsx';
import { VisibilityContextProvider } from './Contexts/VisibilityContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <SearchContextProvider>
          <VisibilityContextProvider>
            <App />
          </VisibilityContextProvider>
        </SearchContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
