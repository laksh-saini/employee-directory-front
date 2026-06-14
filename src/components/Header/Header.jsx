import "./Header.css"

function Header({ onMenuClick }) {
  return (
    <header className="header">
      <button className="hamburger" onClick={onMenuClick} aria-label="Open menu">
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
        <span className="hamburger-bar" />
      </button>

      <div className="header-brand">
        <div className="header-logo">Z</div>
        <div>
          <p className="header-company">ZentrixHR</p>
          <p className="header-tagline">HR Management</p>
        </div>
      </div>
    </header>
  )
}

export default Header
