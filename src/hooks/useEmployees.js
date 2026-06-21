import { useState, useEffect } from "react"
import {
  getAllEmployees,
  searchEmployees,
  addEmployee,
  editEmployee,
  deleteEmployee,
} from "../api/employeeApi"
import { normalizeUser, getAvatarColor } from "../utils/normalizeUser"

function useEmployees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const delay = setTimeout(() => {
      load(query)
    }, query ? 400 : 0)

    return () => clearTimeout(delay)
  }, [query])

  async function load(searchQuery) {
    setLoading(true)
    setError(null)
    try {
      const res = searchQuery
        ? await searchEmployees(searchQuery)
        : await getAllEmployees()
      setEmployees(res.data.users.map(normalizeUser))
    } catch (err) {
      setError("Failed to load employees. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  async function createEmployee(formData) {
    await addEmployee(formData)
    const newEmployee = {
      id: Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.jobTitle,
      department: formData.department,
      status: formData.status,
      location: formData.location || "Remote",
      email: formData.email,
      phone: formData.phone,
      avatar: (formData.firstName[0] + formData.lastName[0]).toUpperCase(),
      avatarColor: getAvatarColor(formData.firstName),
      bio: `${formData.firstName} works as a ${formData.jobTitle} in the ${formData.department} department.`,
      joinDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }
    setEmployees((prev) => [newEmployee, ...prev])
  }

  async function updateEmployee(id, formData) {
    await editEmployee(id, formData)
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id !== id) return emp
        return {
          ...emp,
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.jobTitle,
          department: formData.department,
          status: formData.status,
          location: formData.location || emp.location,
          email: formData.email,
          phone: formData.phone,
          avatar: (formData.firstName[0] + formData.lastName[0]).toUpperCase(),
          avatarColor: getAvatarColor(formData.firstName),
          bio: `${formData.firstName} works as a ${formData.jobTitle} in the ${formData.department} department.`,
        }
      })
    )
  }

  async function removeEmployee(id) {
    await deleteEmployee(id)
    setEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }

  return {
    employees,
    loading,
    error,
    query,
    setQuery,
    createEmployee,
    updateEmployee,
    removeEmployee,
    refetch: () => load(query),
  }
}

export default useEmployees
