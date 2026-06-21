import "./ConfirmDialog.css"

function ConfirmDialog({ employee, onConfirm, onCancel }) {
  if (!employee) return null

  return (
    <>
      <div className="dialog-overlay" onClick={onCancel} />

      <div className="confirm-dialog">
        <h3 className="dialog-title">Delete Employee</h3>
        <p className="dialog-message">
          Are you sure you want to remove <strong>{employee.name}</strong> from
          the directory? This action cannot be undone.
        </p>
        <div className="dialog-actions">
          <button className="dialog-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="dialog-btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default ConfirmDialog
