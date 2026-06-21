import { useState } from "react"
import useEmployees from "./hooks/useEmployees"
import Sidebar from "./components/Sidebar/Sidebar"
import Header from "./components/Header/Header"
import SearchBar from "./components/SearchBar/SearchBar"
import EmployeeCard from "./components/EmployeeCard/EmployeeCard"
import EmployeeDetailsPanel from "./components/EmployeeDetailsPanel/EmployeeDetailsPanel"
import EmployeeForm from "./components/EmployeeForm/EmployeeForm"
import ConfirmDialog from "./components/ConfirmDialog/ConfirmDialog"
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner"
import "./App.css"

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  async function handleFormSubmit(data) {
    if (formEmployee === null) {
      await createEmployee(data)
    } else {
      await updateEmployee(formEmployee.id, data)
      if (selectedEmployee?.id === formEmployee.id) {
        setSelectedEmployee(null)
      }
    }
    setFormEmployee(undefined)
  }

  async function handleDeleteConfirm() {
    await removeEmployee(deleteTarget.id)
    if (selectedEmployee?.id === deleteTarget.id) {
      setSelectedEmployee(null)
    }
    setDeleteTarget(null)
  }

  function handleEditFromPanel() {
    setFormEmployee(selectedEmployee)
    setSelectedEmployee(null)
  }

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="content">
          <div className="content-top">
            <div>
              <h1 className="page-title">Employee Directory</h1>
              <p className="page-subtitle">
                Browse and manage all employee records in one place
              </p>
            </div>
            <div className="content-actions">
              <SearchBar value={query} onChange={setQuery} />
              <button
                className="btn-add"
                onClick={() => setFormEmployee(null)}
              >
                Add Employee
              </button>
            </div>
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
                  onSelect={setSelectedEmployee}
                  onEdit={setFormEmployee}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </div>
      </div>

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

export default App
