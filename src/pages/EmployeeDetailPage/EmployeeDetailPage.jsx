import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getEmployeeById } from "../../services/employeeApi"
import { getLocalData } from "../../utils/localStorage"
import { normalizeUser, getAvatarColor } from "../../utils/normalizeUser"
import Breadcrumb from "../../components/common/Breadcrumb/Breadcrumb"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import "./EmployeeDetailPage.css"

function EmployeeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEmployee() {
      setLoading(true)
      setError(null)

      const local = getLocalData()

      const numericId = Number(id)
      const localEmployee =
        local.added.find((e) => e.id === numericId) ||
        (local.edited[numericId] ? null : null)

      if (local.added.some((e) => e.id === numericId)) {
        const found = local.added.find((e) => e.id === numericId)
        setEmployee(found)
        setLoading(false)
        return
      }

      if (local.deleted.includes(numericId)) {
        setError("This employee has been removed.")
        setLoading(false)
        return
      }

      try {
        const res = await getEmployeeById(id)
        let emp = normalizeUser(res.data)
        if (local.edited[numericId]) {
          emp = { ...emp, ...local.edited[numericId] }
        }
        setEmployee(emp)
      } catch (err) {
        setError("Employee not found or failed to load.")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  const statusClass = {
    Active: "detail-badge--active",
    "On Leave": "detail-badge--leave",
    Resigned: "detail-badge--resigned",
  }[employee?.status] || ""

  return (
    <div className="detail-page">
      <Breadcrumb customLabel={employee?.name} />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <div className="detail-error">
          <p>{error}</p>
          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      )}

      {!loading && !error && employee && (
        <div className="detail-content">
          <div className="detail-card">
            <div className="detail-profile">
              <div
                className="detail-avatar"
                style={{ backgroundColor: employee.avatarColor }}
              >
                {employee.avatar}
              </div>
              <div className="detail-identity">
                <h1 className="detail-name">{employee.name}</h1>
                <p className="detail-role">{employee.role}</p>
                <span className={`detail-badge ${statusClass}`}>
                  {employee.status}
                </span>
              </div>
            </div>

            {employee.bio && (
              <div className="detail-bio">
                <p>{employee.bio}</p>
              </div>
            )}
          </div>

          <div className="detail-info-grid">
            <div className="detail-section">
              <h2 className="detail-section-title">Contact</h2>
              <ul className="detail-list">
                <li>
                  <span className="detail-key">Email</span>
                  <span className="detail-val">{employee.email}</span>
                </li>
                <li>
                  <span className="detail-key">Phone</span>
                  <span className="detail-val">{employee.phone}</span>
                </li>
                <li>
                  <span className="detail-key">Location</span>
                  <span className="detail-val">{employee.location}</span>
                </li>
              </ul>
            </div>

            <div className="detail-section">
              <h2 className="detail-section-title">Employment</h2>
              <ul className="detail-list">
                <li>
                  <span className="detail-key">Department</span>
                  <span className="detail-val">{employee.department}</span>
                </li>
                <li>
                  <span className="detail-key">Job Title</span>
                  <span className="detail-val">{employee.role}</span>
                </li>
                <li>
                  <span className="detail-key">Joined</span>
                  <span className="detail-val">{employee.joinDate}</span>
                </li>
              </ul>
            </div>
          </div>

          <button className="detail-back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      )}
    </div>
  )
}

export default EmployeeDetailPage
