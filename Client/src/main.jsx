import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './Contexts/ContextProvider.jsx'
import {SearchContextProvider } from './Contexts/searchContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </ContextProvider>
    </BrowserRouter>
  </StrictMode>
);
