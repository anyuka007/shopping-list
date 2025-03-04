import React, {useState} from "react";

export const AppContext = React.createContext();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    return <AppContext.Provider value={{loading, setLoading}}>{children}</AppContext.Provider>;
};

export default AppProvider;
