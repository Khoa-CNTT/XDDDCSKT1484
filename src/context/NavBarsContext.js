import { createContext, useState } from "react";

export const NavBarsContext = createContext();

export const NavBarsProvider = ({ children }) => {
    const [showNav, setShowNav] = useState(false);
    return (
        <NavBarsContext.Provider value={{ showNav, setShowNav }}>
            {children}
        </NavBarsContext.Provider>
    );
};
