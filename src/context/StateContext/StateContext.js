import { createContext, useEffect, useState, useContext } from "react";

const StateContext = createContext({});

const StateContextProvider = ({ children }) => {
  const [dbUser, setDbUser] = useState();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <StateContext.Provider
      value={{
        dbUser,
        setDbUser,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        colors: {
          background: isDarkMode ? "#FFFFFF" : "#0d0d0d",
          cardBackground: isDarkMode ? "#FFFFFF" : "#252525",
          iconBackground: isDarkMode ? "#e6eaff" : "#111425",
          searchInput: isDarkMode ? "#F2F2F2" : "#141414",
          primary: "#304ffe",
          textColor: isDarkMode ? "#000000" : "#FFFFFF",
          Color:isDarkMode ? "#FFFFFF" : "#000000"
        },
      }}          
    >

      {children}
    </StateContext.Provider>
  );
};

export default StateContextProvider;

export const useStateContext = () => useContext(StateContext);