import "./LoadingSpinner.css"

function LoadingSpinner() {
  return (
    <div className="spinner-wrapper">
      <div className="spinner" />
      <p className="spinner-text">Loading employees...</p>
    </div>
  )
}

export default LoadingSpinner
