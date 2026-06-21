import "./EmployeeCard.css"

function EmployeeCard({ employee, onSelect, onEdit, onDelete }) {
  const statusClass = {
    Active: "status--active",
    "On Leave": "status--onleave",
    Resigned: "status--resigned",
  }[employee.status]

  function handleEdit(e) {
    e.stopPropagation()
    onEdit(employee)
  }

  function handleDelete(e) {
    e.stopPropagation()
    onDelete(employee)
  }

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
        <div className="card-actions">
          <button className="card-btn card-btn--edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="card-btn card-btn--delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeCard
