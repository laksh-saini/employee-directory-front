import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../../Sidebar/Sidebar"
import Header from "../../Header/Header"
import "./Layout.css"

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="layout-body">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
