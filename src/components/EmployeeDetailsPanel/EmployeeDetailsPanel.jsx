import { useEffect } from "react"
import "./EmployeeDetailsPanel.css"

function EmployeeDetailsPanel({ employee, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!employee) return null

  const statusClass = {
    Active: "detail-status--active",
    "On Leave": "detail-status--onleave",
    Resigned: "detail-status--resigned",
  }[employee.status]

  return (
    <>
      <div className="panel-overlay" onClick={onClose} />

      <div className="details-panel">
        <button className="panel-close" onClick={onClose}>Close</button>

        <div className="panel-profile">
          <div
            className="panel-avatar"
            style={{ backgroundColor: employee.avatarColor }}
          >
            {employee.avatar}
          </div>
          <h2 className="panel-name">{employee.name}</h2>
          <p className="panel-role">{employee.role}</p>
          <span className={`detail-status ${statusClass}`}>{employee.status}</span>
        </div>

        <div className="panel-bio">
          <p>{employee.bio}</p>
        </div>

        <ul className="panel-details">
          <li>
            <span className="detail-label">Email</span>
            <span className="detail-value">{employee.email}</span>
          </li>
          <li>
            <span className="detail-label">Phone</span>
            <span className="detail-value">{employee.phone}</span>
          </li>
          <li>
            <span className="detail-label">Location</span>
            <span className="detail-value">{employee.location}</span>
          </li>
          <li>
            <span className="detail-label">Department</span>
            <span className="detail-value">{employee.department}</span>
          </li>
          <li>
            <span className="detail-label">Joined</span>
            <span className="detail-value">{employee.joinDate}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default EmployeeDetailsPanel
