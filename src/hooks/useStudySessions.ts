import { useEffect, useState } from 'react'

import { sessionsAPI } from '../services/api'
import type { StudySession } from '../services/api'

export const useStudySessions = () => {
  const [sessions, setSessions] = useState<StudySession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSessions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await sessionsAPI.getAll()
      setSessions(data)
    } catch (err: any) {
      console.error('Error fetching study sessions:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch study sessions'
      )
    } finally {
      setLoading(false)
    }
  }

  const createSession = async (sessionData: Omit<StudySession, 'id'>) => {
    try {
      const newSession = await sessionsAPI.create(sessionData)
      setSessions(prev => [newSession, ...prev])
      return newSession
    } catch (err: any) {
      console.error('Error creating session:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to create session'
      )
    }
  }

  const updateSession = async (id: string, updates: Partial<StudySession>) => {
    try {
      const updatedSession = await sessionsAPI.update(id, updates)
      setSessions(prev =>
        prev.map(session => (session.id === id ? updatedSession : session))
      )
      return updatedSession
    } catch (err: any) {
      console.error('Error updating session:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to update session'
      )
    }
  }

  const deleteSession = async (id: string) => {
    try {
      await sessionsAPI.delete(id)
      setSessions(prev => prev.filter(session => session.id !== id))
    } catch (err: any) {
      console.error('Error deleting session:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to delete session'
      )
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  return {
    sessions,
    loading,
    error,
    refetch: fetchSessions,
    createSession,
    updateSession,
    deleteSession
  }
}
