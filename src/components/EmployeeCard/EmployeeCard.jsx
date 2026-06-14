import "./EmployeeCard.css"

function EmployeeCard({ employee, onSelect }) {
  const statusClass = {
    Active: "status--active",
    "On Leave": "status--onleave",
    Resigned: "status--resigned",
  }[employee.status]

  return (
    <div className="employee-card" onClick={() => onSelect(employee)}>
      <div className="card-top">
        <div
          className="card-avatar"
          style={{ backgroundColor: employee.avatarColor }}
        >
          {employee.avatar}
        </div>
        <span className={`card-status ${statusClass}`}>{employee.status}</span>
      </div>

      <div className="card-body">
        <h3 className="card-name">{employee.name}</h3>
        <p className="card-role">{employee.role}</p>
        <p className="card-department">{employee.department}</p>
      </div>

      <div className="card-footer">
        <span className="card-location">{employee.location}</span>
        <span className="card-view">View Profile</span>
      </div>
    </div>
  )
}

export default EmployeeCard
