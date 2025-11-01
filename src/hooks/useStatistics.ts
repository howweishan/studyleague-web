import { useEffect, useState, useCallback } from 'react'
import { statisticsAPI, type Statistics } from '../services/api'

export const useStatistics = (userId?: string) => {
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = userId 
        ? await statisticsAPI.getByUserId(userId)
        : await statisticsAPI.getAll()
      // Take the first item from the array (most recent statistics)
      setStatistics(data[0] || null)
    } catch (err) {
      console.error('Error fetching statistics:', err)
      const error = err as { response?: { data?: { message?: string } }; message?: string }
      setError(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch statistics'
      )
      setStatistics(null)
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchStatistics()
  }, [fetchStatistics])

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics
  }
}
