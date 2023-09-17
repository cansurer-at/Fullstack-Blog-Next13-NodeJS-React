"use client";

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    // if it's empty, make it light
    return value || "light";
  }
  return "light";
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(getFromLocalStorage);

  // Add an effect to sync the theme with localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <ThemeContext.Provider toggle={toggle} value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
