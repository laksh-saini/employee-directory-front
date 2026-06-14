import { useState } from "react"
import Header from "./components/Header/Header"
import Sidebar from "./components/Sidebar/Sidebar"
import SearchBar from "./components/SearchBar/SearchBar"
import EmployeeCard from "./components/EmployeeCard/EmployeeCard"
import EmployeeDetailsPanel from "./components/EmployeeDetailsPanel/EmployeeDetailsPanel"
import employees from "./data/employees"
import "./App.css"

function App() {
  const [query, setQuery] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filtered = employees.filter((emp) => {
    const q = query.toLowerCase()
    return (
      emp.name.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q)
    )
  })

  return (
    <div className="app">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="content">
          <div className="content-top">
            <div>
              <h1 className="page-title">Employee Directory</h1>
              <p className="page-subtitle">Browse and manage all employee records in one place</p>
            </div>
            <SearchBar value={query} onChange={setQuery} />
          </div>

          <p className="results-count">
            Showing {filtered.length} of {employees.length} employees
          </p>

          {filtered.length > 0 ? (
            <div className="card-grid">
              {filtered.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onSelect={setSelectedEmployee}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No employees found for "{query}"</p>
            </div>
          )}
        </div>
      </div>

      <EmployeeDetailsPanel
        employee={selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  )
}

export default App
