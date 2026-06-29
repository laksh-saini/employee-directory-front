import { useMemo } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import useEmployees from "../../hooks/useEmployees"
import "./DashboardPage.css"

function DashboardPage() {
  const { user } = useAuth()
  const { allEmployees, loading } = useEmployees()

  const stats = useMemo(() => {
    const total = allEmployees.length
    const active = allEmployees.filter((e) => e.status === "Active").length
    const onLeave = allEmployees.filter((e) => e.status === "On Leave").length
    const resigned = allEmployees.filter((e) => e.status === "Resigned").length

    const deptMap = {}
    allEmployees.forEach((e) => {
      deptMap[e.department] = (deptMap[e.department] || 0) + 1
    })
    const topDept = Object.entries(deptMap).sort((a, b) => b[1] - a[1])[0]

    return { total, active, onLeave, resigned, topDept }
  }, [allEmployees])

  const recentEmployees = useMemo(() => {
    return allEmployees.slice(0, 6)
  }, [allEmployees])

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-welcome">Welcome back, {user?.name}</p>
        </div>
        <Link to="/employees" className="dashboard-link-btn">
          View All Employees
        </Link>
      </div>

      {loading ? (
        <p className="dashboard-loading">Loading stats...</p>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Total Employees</p>
              <p className="stat-value">{stats.total}</p>
            </div>
            <div className="stat-card stat-card--active">
              <p className="stat-label">Active</p>
              <p className="stat-value">{stats.active}</p>
            </div>
            <div className="stat-card stat-card--leave">
              <p className="stat-label">On Leave</p>
              <p className="stat-value">{stats.onLeave}</p>
            </div>
            <div className="stat-card stat-card--resigned">
              <p className="stat-label">Resigned</p>
              <p className="stat-value">{stats.resigned}</p>
            </div>
          </div>

          {stats.topDept && (
            <div className="dashboard-insight">
              <span className="insight-label">Largest Department</span>
              <span className="insight-value">
                {stats.topDept[0]} &mdash; {stats.topDept[1]} employees
              </span>
            </div>
          )}

          <div className="recent-section">
            <h2 className="recent-title">Recent Employees</h2>
            <div className="recent-grid">
              {recentEmployees.map((emp) => (
                <Link
                  key={emp.id}
                  to={`/employees/${emp.id}`}
                  className="recent-card"
                >
                  <div
                    className="recent-avatar"
                    style={{ backgroundColor: emp.avatarColor }}
                  >
                    {emp.avatar}
                  </div>
                  <div className="recent-info">
                    <p className="recent-name">{emp.name}</p>
                    <p className="recent-role">{emp.role}</p>
                    <p className="recent-dept">{emp.department}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage
