import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthContext"
import "./LoginPage.css"

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [loginError, setLoginError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (user) return <Navigate to="/" replace />

  async function onSubmit(data) {
    setSubmitting(true)
    setLoginError(null)
    const success = login(data.username, data.password)
    if (success) {
      navigate("/", { replace: true })
    } else {
      setLoginError("Invalid username or password.")
      setSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo">Z</div>
          <h1 className="login-title">ZentrixHR</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="login-group">
            <label>Username</label>
            <input
              placeholder="admin"
              autoComplete="username"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="login-error">{errors.username.message}</span>
            )}
          </div>

          <div className="login-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="login-error">{errors.password.message}</span>
            )}
          </div>

          {loginError && <p className="login-auth-error">{loginError}</p>}

          <button type="submit" className="login-submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-hint">Use: admin / admin123</p>
      </div>
    </div>
  )
}

export default LoginPage
