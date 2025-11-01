import { Icon } from '@iconify/react'
import { Navigate, useLocation } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useUser()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
              <Icon
                className="text-2xl text-white"
                icon="material-symbols:school"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Study</h1>
              <h1 className="-mt-1 text-2xl font-bold text-orange-500">
                League
              </h1>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Icon
              className="h-6 w-6 animate-spin text-orange-500"
              icon="material-symbols:progress-activity"
            />
            <span className="text-lg">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to="/login" />
  }

  // Render the protected content
  return <>{children}</>
}
