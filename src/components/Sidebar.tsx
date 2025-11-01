import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useNavbar } from '@/contexts/NavbarContext'
import { useUser } from '@/contexts/UserContext'

import SettingsModal from './SettingsModal'

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: 'material-symbols:dashboard' },
  {
    path: '/study-rooms',
    label: 'Study Rooms',
    icon: 'material-symbols:meeting-room'
  },
  {
    path: '/discussions',
    label: 'Discussions',
    icon: 'material-symbols:forum'
  },
  { path: '/stats', label: 'Stats', icon: 'material-symbols:bar-chart' },
  {
    path: '/achievements',
    label: 'Achievements',
    icon: 'material-symbols:emoji-events'
  }
]

export default function Sidebar() {
  const location = useLocation()

  const { user, logout } = useUser()
  const navigate = useNavigate()

  const { isOpen: navOpen, toggleNavbar } = useNavbar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const openSettings = () => {
    setIsSettingsOpen(true)
    setIsDropdownOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={clsx(
        'fixed z-9999 flex h-full w-3/4 flex-col border-r border-gray-300 bg-white shadow-lg md:static md:w-96!',
        navOpen ? 'left-0' : '-left-3/4 md:-left-1/2',
        'transition-left duration-300 ease-in-out'
      )}
    >
      <div className="flex flex-1 flex-col p-4 md:p-6">
        {/* Branding */}
        <div className="mb-8 flex items-center justify-between space-x-3">
          <img
            alt="Study League Logo"
            className="w-24 md:w-full md:px-4"
            src="/logo.svg"
          />
          <button className="md:hidden" onClick={toggleNavbar}>
            <Icon
              className="text-2xl text-gray-300"
              icon="material-symbols:menu"
            />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 flex-col space-y-2">
          {NAV_ITEMS.map(item => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/' && location.pathname === '/')
            return (
              <Link
                key={item.path}
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                to={item.path}
                onClick={() => {
                  toggleNavbar()
                }}
              >
                <Icon className="text-lg" icon={item.icon} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
      <div className="p-2">
        <button
          className="flex w-full min-w-0 items-center space-x-3 rounded-lg py-2 pr-4 pl-3 transition-colors hover:bg-gray-100"
          onClick={toggleDropdown}
        >
          {/* Avatar */}
          <img
            
            alt={user?.username || 'User'}
            className="size-8 shrink-0 rounded-full object-cover"
            src={
              user?.avatar_url ||
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80'
            }
          />

          {/* User Info */}
          <div className="w-full min-w-0 text-left">
            <p className="text-sm font-medium text-gray-900">
              {user?.username || 'User'}
            </p>
            <p className="min-w-0 truncate text-xs text-gray-500">
              {user?.email || ''}
            </p>
          </div>

          {/* Dropdown Arrow */}
          <Icon
            className={`size-4 shrink-0 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            icon="material-symbols:keyboard-arrow-down"
          />
        </button>
      </div>
      <div className="relative">
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            ></div>
            {/* Dropdown Content */}
            <div className="absolute bottom-0 left-2 z-20 mt-2 w-full -translate-y-18 rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
              {/* Menu Items */}
              <div className="py-1">
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <Icon
                    className="mr-3 text-lg"
                    icon="material-symbols:person-outline"
                  />
                  Profile
                </button>

                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={openSettings}
                >
                  <Icon
                    className="mr-3 text-lg"
                    icon="material-symbols:settings-outline"
                  />
                  Settings
                </button>
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-gray-200"></div>

              {/* Sign Out */}
              <button
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <Icon className="mr-3 text-lg" icon="material-symbols:logout" />
                Sign Out
              </button>
            </div>
          </>
        )}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
      </div>
    </aside>
  )
}
