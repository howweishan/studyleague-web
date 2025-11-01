import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useUser } from '../../contexts/UserContext'
import Header from './components/Header'
import Hero from './components/Hero'
import LoginForm from './components/LoginForm'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isAuthenticated } = useUser()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, location.state])

  return (
    <div className="flex min-h-screen">
      <Hero />
      <div className="flex w-full items-center justify-center bg-gray-50 p-8 text-gray-700 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <Header />
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
