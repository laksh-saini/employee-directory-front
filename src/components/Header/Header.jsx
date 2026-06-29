import { useAuth } from "../../context/AuthContext"
import ThemeToggle from "../common/ThemeToggle/ThemeToggle"
import "./Header.css"

function Header({ onMenuClick }) {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>

      <div className="header-brand">
        <div className="header-logo">Z</div>
        <p className="header-company">ZentrixHR</p>
      </div>

      <div className="header-right">
        <ThemeToggle />
        <span className="header-user">{user?.name}</span>
        <button className="header-logout" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}

export default Header
