import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import NavbarContext from '@/contexts/NavbarContext'

import HeaderStats from './HeaderStats'
import Sidebar from './Sidebar'

export default function Layout() {
  const [navbarOpen, setNavbarOpen] = useState(false)

  function toggleNavbar() {
    setNavbarOpen(!navbarOpen)
  }

  return (
    <NavbarContext value={{ isOpen: navbarOpen, toggleNavbar }}>
      <main className="flex h-screen w-full">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <HeaderStats />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </NavbarContext>
  )
}
