import { Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from "../components/common/ProtectedRoute/ProtectedRoute"
import LoginPage from "../pages/LoginPage/LoginPage"
import DashboardPage from "../pages/DashboardPage/DashboardPage"
import EmployeeDirectoryPage from "../pages/EmployeeDirectoryPage/EmployeeDirectoryPage"
import EmployeeDetailPage from "../pages/EmployeeDetailPage/EmployeeDetailPage"

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/employees" element={<EmployeeDirectoryPage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
