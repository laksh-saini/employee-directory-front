import "./SearchBar.css"

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, role or department..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-clear" onClick={() => onChange("")}>
          Clear
        </button>
      )}
    </div>
  )
}

export default SearchBar
