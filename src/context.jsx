import { useContext, createContext, useState, useEffect } from "react";
const AppContext = createContext();

const getIntialDarkMode = () => {
    const prefersDAerkMode = window.matchMedia('(prefers-color-scheme:dark)').matches

    const storeDarkTheme = localStorage.getItem('darkTHeme') === 'true'
    return storeDarkTheme || prefersDAerkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getIntialDarkMode());
  const [searchTerm, setSearchTerm] = useState("monkey");

  const toggleDarkTheme = () => {
    // if(!isDarkTheme){
    //     setIsDarkTheme(isDarkTheme)
    // }
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    // const body = document.querySelector("body ");
    // body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem('darkTheme',newDarkTheme)
  };
useEffect(()=>{
    document. body.classList.toggle("dark-theme", isDarkTheme);
},[isDarkTheme])
  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => useContext(AppContext);
