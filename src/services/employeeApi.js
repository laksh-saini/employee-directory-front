import axios from "axios"

const api = axios.create({
  baseURL: "https://dummyjson.com/users",
  timeout: 8000,
})

export const getAllEmployees = (limit = 20) => api.get(`?limit=${limit}`)

export const getEmployeeById = (id) => api.get(`/${id}`)

export const addEmployee = (data) => api.post("/add", data)

export const editEmployee = (id, data) => api.put(`/${id}`, data)

export const deleteEmployee = (id) => api.delete(`/${id}`)
