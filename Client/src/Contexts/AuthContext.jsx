import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState('');
const fetchUser = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/status', {
      withCredentials: true,
    });
    if (response.status === 200) {
      setUser(response.data.user.user);
      setAuth(true)
    }
    else {
      setUser('')
      setAuth(false)
    }
  } catch (error) {
    console.error('Error fetching user status:', error);
    setAuth(false);
    setUser('');
  }
};
  useEffect(() => {
    fetchUser();
  }, [auth]);
    
    const handleLogout = async () => {
       try {
         const response = await axios.post(
           'http://localhost:8080/api/auth/logout',
           {},
           { withCredentials: true },
         );
         if (response.status === 200) {
           alert(response.data.message);
           setAuth(false);
           setUser(''); 
         }
       } catch (error) {
         console.error('Error during logout:', error);
       }
    }

  return (
      <AuthContext.Provider value={{ auth, setAuth, user, setUser, handleLogout }}>
          {children}
      </AuthContext.Provider>
  );
};

export default AuthContext;
