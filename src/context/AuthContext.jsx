import { createContext, useContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import { VALID_CREDENTIALS } from "../constants"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("auth_user", null)

  function login(username, password) {
    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      setUser({ name: "Ovie Joshua", role: "HR Manager", username })
      return true
    }
    return false
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
