import React, { createContext, useState } from "react";
const VisibilityContext = createContext()

export const VisibilityContextProvider = ({ children }) => {
    const [visible,setVisible]=useState(false)
    return <VisibilityContext.Provider value={{ visible, setVisible }}>
        {children}
    </VisibilityContext.Provider>
}
export default VisibilityContext;