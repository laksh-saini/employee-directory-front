import "./Sidebar.css"

const navLinks = [
  { label: "Dashboard" },
  { label: "Performance" },
  { label: "Scheduling" },
  { label: "Employee Directory", active: true },
  { label: "Team Chat" },
  { label: "Recruitment" },
  { label: "Reports" },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            className={`sidebar-link ${link.active ? "sidebar-link--active" : ""}`}
          >
            <span className="sidebar-link-label">{link.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">OJ</div>
        <div>
          <p className="sidebar-user-name">Ovie Joshua</p>
          <p className="sidebar-user-role">HR Manager</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
