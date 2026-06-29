import { useState, useEffect, useMemo, useCallback } from "react"
import { getAllEmployees, addEmployee, editEmployee, deleteEmployee } from "../services/employeeApi"
import { normalizeUser, getAvatarColor } from "../utils/normalizeUser"
import { getLocalData, saveLocalData } from "../utils/localStorage"
import useDebounce from "./useDebounce"

function useEmployees() {
  const [allEmployees, setAllEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState("")

  const debouncedQuery = useDebounce(query, 400)

  useEffect(() => {
    load()
  }, [])

  const employees = useMemo(() => {
    if (!debouncedQuery.trim()) return allEmployees
    const q = debouncedQuery.toLowerCase()
    return allEmployees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.location.toLowerCase().includes(q)
    )
  }, [allEmployees, debouncedQuery])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await getAllEmployees()
      const local = getLocalData()

      const apiEmployees = res.data.users
        .map(normalizeUser)
        .filter((e) => !local.deleted.includes(e.id))
        .map((e) => (local.edited[e.id] ? { ...e, ...local.edited[e.id] } : e))

      setAllEmployees([...local.added, ...apiEmployees])
    } catch (err) {
      setError("Failed to load employees. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  const createEmployee = useCallback(async (formData) => {
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

    const local = getLocalData()
    local.added = [newEmployee, ...local.added]
    saveLocalData(local)

    setAllEmployees((prev) => [newEmployee, ...prev])
  }, [])

  const updateEmployee = useCallback(async (id, formData) => {
    const local = getLocalData()
    const wasLocallyAdded = local.added.some((e) => e.id === id)

    if (!wasLocallyAdded) {
      await editEmployee(id, formData)
    }

    const updatedFields = {
      name: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.jobTitle,
      department: formData.department,
      status: formData.status,
      location: formData.location,
      email: formData.email,
      phone: formData.phone,
      avatar: (formData.firstName[0] + formData.lastName[0]).toUpperCase(),
      avatarColor: getAvatarColor(formData.firstName),
      bio: `${formData.firstName} works as a ${formData.jobTitle} in the ${formData.department} department.`,
    }

    if (wasLocallyAdded) {
      local.added = local.added.map((e) => (e.id === id ? { ...e, ...updatedFields } : e))
    } else {
      local.edited[id] = updatedFields
    }
    saveLocalData(local)

    setAllEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedFields } : emp))
    )
  }, [])

  const removeEmployee = useCallback(async (id) => {
    const local = getLocalData()
    const wasLocallyAdded = local.added.some((e) => e.id === id)

    if (!wasLocallyAdded) {
      await deleteEmployee(id)
    }

    if (wasLocallyAdded) {
      local.added = local.added.filter((e) => e.id !== id)
    } else {
      local.deleted = [...local.deleted, id]
    }
    delete local.edited[id]
    saveLocalData(local)

    setAllEmployees((prev) => prev.filter((emp) => emp.id !== id))
  }, [])

  return {
    employees,
    allEmployees,
    loading,
    error,
    query,
    setQuery,
    createEmployee,
    updateEmployee,
    removeEmployee,
    refetch: load,
  }
}

export default useEmployees
