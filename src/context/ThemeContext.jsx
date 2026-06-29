import { createContext, useContext, useEffect } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("app_theme", "light")

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
