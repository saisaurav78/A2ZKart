import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState('')
    const [user, setUser] = useState('')
    const [auth, setAuth] = useState(false)
    
    useEffect(() => {
        if (token && user) {
          setAuth(true);
        }
  
 },[token,user])

    return <AuthContext.Provider value={{token,setToken,user,setUser,auth}}>
        {children}
    </AuthContext.Provider>
    
}
export default AuthContext;