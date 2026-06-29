import { STORAGE_KEY_EMPLOYEES } from "../constants"

export function getLocalData() {
  try {
    return (
      JSON.parse(localStorage.getItem(STORAGE_KEY_EMPLOYEES)) || {
        added: [],
        deleted: [],
        edited: {},
      }
    )
  } catch {
    return { added: [], deleted: [], edited: {} }
  }
}

export function saveLocalData(data) {
  localStorage.setItem(STORAGE_KEY_EMPLOYEES, JSON.stringify(data))
}
