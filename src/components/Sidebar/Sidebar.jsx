import { NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import ThemeToggle from "../common/ThemeToggle/ThemeToggle"
import { NAV_LINKS, NAV_PLACEHOLDERS } from "../../constants"
import "./Sidebar.css"

function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("")
    : "OJ"

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">Z</div>
          <div>
            <p className="sidebar-company">ZentrixHR</p>
            <p className="sidebar-tagline">HR Management</p>
          </div>
          <button className="sidebar-close" onClick={onClose}>X</button>
        </div>

        <nav className="sidebar-nav">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              end={link.exact}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {NAV_PLACEHOLDERS.map((label) => (
            <span key={label} className="sidebar-link sidebar-link--disabled">
              {label}
            </span>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <ThemeToggle />
          <div className="sidebar-footer">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user?.name}</p>
              <p className="sidebar-user-role">{user?.role}</p>
            </div>
            <button className="sidebar-logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
