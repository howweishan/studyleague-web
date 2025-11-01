import { useEffect, useState } from 'react'

import { leaderboardAPI } from '../services/api'
import type { LeaderboardEntry } from '../services/api'

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await leaderboardAPI.get()
      setLeaderboard(data)
    } catch (err: any) {
      console.error('Error fetching leaderboard:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch leaderboard'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return {
    leaderboard,
    loading,
    error,
    refetch: fetchLeaderboard
  }
}
