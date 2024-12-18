import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter as Router} from 'react-router-dom';
import  { CartContextProvider } from './Contexts/CartContext.jsx';
import { SearchContextProvider } from './Contexts/SearchContext.jsx';
import { VisibilityContextProvider } from './Contexts/VisibilityContext.jsx';
import { AuthContextProvider } from './Contexts/AuthContext.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
createRoot(document.getElementById('root')).render(
  <>
    <Router>
      <ScrollToTop/>
        <SearchContextProvider>
          <VisibilityContextProvider>
            <AuthContextProvider>
      <CartContextProvider>
                <App />
      </CartContextProvider>
            </AuthContextProvider>
          </VisibilityContextProvider>
        </SearchContextProvider>
    </Router>
  </>
);
