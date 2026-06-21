import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import "./EmployeeForm.css"

const departments = [
  "Engineering",
  "Design",
  "Marketing",
  "HR",
  "Legal",
  "Finance",
  "Operations",
  "IT",
]

const statuses = ["Active", "On Leave", "Resigned"]

function EmployeeForm({ employee, onSubmit, onClose }) {
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    reset(
      employee
        ? {
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            jobTitle: employee.role,
            location: employee.location,
            status: employee.status,
          }
        : { status: "Active" }
    )
  }, [employee, reset])

  async function onFormSubmit(data) {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await onSubmit(data)
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="form-overlay" onClick={onClose} />

      <div className="employee-form-panel">
        <div className="form-header">
          <h2 className="form-title">{employee ? "Edit Employee" : "Add Employee"}</h2>
          <button className="form-close" onClick={onClose}>Close</button>
        </div>

        <form className="form-body" onSubmit={handleSubmit(onFormSubmit)} noValidate>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                placeholder="John"
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
              {errors.firstName && (
                <span className="form-error">{errors.firstName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                placeholder="Doe"
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
              {errors.lastName && (
                <span className="form-error">{errors.lastName.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john@company.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                placeholder="+1 234 567 8900"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[+]?[\d\s\-(). ]{7,20}$/,
                    message: "Enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <span className="form-error">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Department</label>
              <select
                {...register("department", {
                  required: "Department is required",
                })}
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.department && (
                <span className="form-error">{errors.department.message}</span>
              )}
            </div>

            <div className="form-group">
              <label>Job Title</label>
              <input
                placeholder="Software Engineer"
                {...register("jobTitle", {
                  required: "Job title is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
              {errors.jobTitle && (
                <span className="form-error">{errors.jobTitle.message}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input
                placeholder="New York, NY"
                {...register("location")}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                {...register("status", {
                  required: "Status is required",
                })}
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.status && (
                <span className="form-error">{errors.status.message}</span>
              )}
            </div>
          </div>

          {submitError && <p className="submit-error">{submitError}</p>}

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Saving..." : employee ? "Save Changes" : "Add Employee"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default EmployeeForm
