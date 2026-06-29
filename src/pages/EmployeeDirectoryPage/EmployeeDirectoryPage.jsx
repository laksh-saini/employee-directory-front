import { useState, useCallback } from "react"
import useEmployees from "../../hooks/useEmployees"
import SearchBar from "../../components/SearchBar/SearchBar"
import EmployeeCard from "../../components/EmployeeCard/EmployeeCard"
import EmployeeDetailsPanel from "../../components/EmployeeDetailsPanel/EmployeeDetailsPanel"
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm"
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./EmployeeDirectoryPage.css"

function EmployeeDirectoryPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [formEmployee, setFormEmployee] = useState(undefined)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const {
    employees,
    loading,
    error,
    query,
    setQuery,
    createEmployee,
    updateEmployee,
    removeEmployee,
    refetch,
  } = useEmployees()

  const handleFormSubmit = useCallback(async (data) => {
    if (formEmployee === null) {
      await createEmployee(data)
    } else {
      await updateEmployee(formEmployee.id, data)
      if (selectedEmployee?.id === formEmployee.id) {
        setSelectedEmployee(null)
      }
    }
    setFormEmployee(undefined)
  }, [formEmployee, selectedEmployee, createEmployee, updateEmployee])

  const handleDeleteConfirm = useCallback(async () => {
    await removeEmployee(deleteTarget.id)
    if (selectedEmployee?.id === deleteTarget.id) {
      setSelectedEmployee(null)
    }
    setDeleteTarget(null)
  }, [deleteTarget, selectedEmployee, removeEmployee])

  const handleEditFromPanel = useCallback(() => {
    setFormEmployee(selectedEmployee)
    setSelectedEmployee(null)
  }, [selectedEmployee])

  const handleSelect = useCallback((emp) => setSelectedEmployee(emp), [])
  const handleEdit = useCallback((emp) => setFormEmployee(emp), [])
  const handleDelete = useCallback((emp) => setDeleteTarget(emp), [])

  return (
    <div className="directory-page">
      <div className="content-top">
        <div className="content-title-row">
          <div>
            <h1 className="page-title">Employee Directory</h1>
            <p className="page-subtitle">
              Browse and manage all employee records in one place
            </p>
          </div>
          <button className="btn-add" onClick={() => setFormEmployee(null)}>
            Add Employee
          </button>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="error-state">
          <p className="error-message">{error}</p>
          <button className="btn-retry" onClick={refetch}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && employees.length === 0 && (
        <div className="empty-state">
          <p>
            {query
              ? `No results found for "${query}"`
              : "No employees found."}
          </p>
        </div>
      )}

      {!loading && !error && employees.length > 0 && (
        <div className="card-grid">
          {employees.map((emp) => (
            <EmployeeCard
              key={emp.id}
              employee={emp}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <EmployeeDetailsPanel
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        onEdit={handleEditFromPanel}
      />

      {formEmployee !== undefined && (
        <EmployeeForm
          employee={formEmployee}
          onSubmit={handleFormSubmit}
          onClose={() => setFormEmployee(undefined)}
        />
      )}

      <ConfirmDialog
        employee={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  )
}

export default EmployeeDirectoryPage
