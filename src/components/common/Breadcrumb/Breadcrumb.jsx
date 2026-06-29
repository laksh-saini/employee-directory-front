import { Link, useLocation } from "react-router-dom"
import "./Breadcrumb.css"

const segmentLabels = {
  employees: "Employee Directory",
}

function Breadcrumb({ customLabel }) {
  const { pathname } = useLocation()
  const segments = pathname.split("/").filter(Boolean)

  const crumbs = [
    { label: "Dashboard", path: "/" },
    ...segments.map((seg, idx) => ({
      label: segmentLabels[seg] || customLabel || seg,
      path: "/" + segments.slice(0, idx + 1).join("/"),
    })),
  ]

  if (crumbs.length <= 1) return null

  return (
    <nav className="breadcrumb">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1
        return (
          <span key={crumb.path} className="breadcrumb-item">
            {isLast ? (
              <span className="breadcrumb-current">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="breadcrumb-link">{crumb.label}</Link>
            )}
            {!isLast && <span className="breadcrumb-sep">/</span>}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
