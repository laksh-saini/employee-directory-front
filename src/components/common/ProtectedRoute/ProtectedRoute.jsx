import { Navigate } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import Layout from "../../layout/Layout/Layout"

function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) return <Navigate to="/login" replace />

  return <Layout />
}

export default ProtectedRoute
