import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Input from '@/components/ui/Input'
import MessageBox from '@/components/ui/MessageBox'
import { useUser } from '@/contexts/UserContext'

import LoginButton from './LoginButton'

function LoginForm() {
  const { login } = useUser()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Submission Logic Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      // Navigation will be handled by the useEffect above
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            required
            autoComplete="email"
            icon="material-symbols:mail-outline"
            id="email"
            label="Email address"
            placeholder="Enter your email"
            setValue={setEmail}
            type="email"
            value={email}
          />
          <Input
            required
            autoComplete="current-password"
            icon="material-symbols:lock-outline"
            id="password"
            label="Password"
            placeholder="••••••••••••"
            setValue={setPassword}
            type="password"
            value={password}
          />
        </div>
        <Link
          className="-mt-4 flex justify-end text-sm font-medium underline transition-colors"
          to="/forgot-password"
        >
          Forgot your password?
        </Link>
        <LoginButton isLoading={isLoading} />
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link
              className="font-medium text-orange-600 underline transition-colors hover:text-orange-500"
              to="/signup"
            >
              Sign up for free
            </Link>
          </span>
        </div>
      </form>
      {error && <MessageBox title={error} type="ERROR" />}
    </>
  )
}

export default LoginForm
