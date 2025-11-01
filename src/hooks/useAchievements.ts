import { useEffect, useState } from 'react'

import { achievementsAPI } from '../services/api'
import type { Achievement, UserAchievement } from '../services/api'

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await achievementsAPI.getAll()
      setAchievements(data)
    } catch (err: any) {
      console.error('Error fetching achievements:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch achievements'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [])

  return {
    achievements,
    loading,
    error,
    refetch: fetchAchievements
  }
}

export const useUserAchievements = (userId: string | null) => {
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>(
    []
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserAchievements = async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await achievementsAPI.getUserAchievements(userId)
      setUserAchievements(data)
    } catch (err: any) {
      console.error('Error fetching user achievements:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch user achievements'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserAchievements()
  }, [userId])

  const unlockAchievement = async (achievementId: string) => {
    if (!userId) return

    try {
      const newAchievement = await achievementsAPI.unlockAchievement(
        userId,
        achievementId
      )
      setUserAchievements(prev => [...prev, newAchievement])
      return newAchievement
    } catch (err: any) {
      console.error('Error unlocking achievement:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to unlock achievement'
      )
    }
  }

  return {
    userAchievements,
    loading,
    error,
    refetch: fetchUserAchievements,
    unlockAchievement
  }
}
