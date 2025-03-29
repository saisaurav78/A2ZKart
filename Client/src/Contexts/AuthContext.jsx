import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const BASE_URL=import.meta.env.VITE_BASE_URL 

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');



  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/status`, {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
      if (response.status === 200 && response.data.user) {
        setUser(response.data.user.user);
        setAuth(true);
      } else {
        setUser('');
        setAuth(false);
      }
    } catch (error) {
      setAuth(false);
      setUser('');
    }
  };
  useEffect(() => {
    fetchUser();
  }, [auth]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        alert(response.data.message);
        setAuth(false);
        setUser('');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
