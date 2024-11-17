import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import  { CartContextProvider } from './Contexts/CartContext.jsx';
import { SearchContextProvider } from './Contexts/SearchContext.jsx';
import { VisibilityContextProvider } from './Contexts/VisibilityContext.jsx';
import { AuthContextProvider } from './Contexts/AuthContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <SearchContextProvider>
          <VisibilityContextProvider>
            <AuthContextProvider>
            <App />
            </AuthContextProvider>
          </VisibilityContextProvider>
        </SearchContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>
);
