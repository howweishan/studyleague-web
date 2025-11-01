import { useEffect, useState } from 'react'
import { targetsAPI } from '../services/api'
import type { StudyTarget } from '../services/api'

export const useStudyTargets = () => {
  const [targets, setTargets] = useState<StudyTarget | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTargets = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await targetsAPI.getAll()
      // If data is an array, take the first item, otherwise use as is
      const target = Array.isArray(data) ? data[0] || null : data
      
      // Map 'id' to 'record_id' if it exists
      if (target && target.id && !target.record_id) {
        target.record_id = target.id
      }
      
      setTargets(target)
    } catch (err: any) {
      console.error('Error fetching study targets:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch study targets'
      )
    } finally {
      setLoading(false)
    }
  }

  const createOrUpdateTarget = async (
    targetData: Omit<StudyTarget, 'id' | 'created' | 'updated'>
  ) => {
    try {
      const result = await targetsAPI.createOrUpdate(targetData)
      setTargets(result) // Just set the result directly
      return result
    } catch (err: any) {
      console.error('Error creating/updating target:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to save study target'
      )
    }
  }

  const updateTarget = async (
    id: string,
    targetData: Partial<Omit<StudyTarget, 'id' | 'created' | 'updated'>>
  ) => {
    try {
      const result = await targetsAPI.update(id, targetData)
      
      // Map 'id' to 'record_id' in the result
      if (result && result.id && !result.record_id) {
        result.record_id = result.id
      }
      
      setTargets(result) // Just set the result directly, not as an array operation
      return result
    } catch (err: any) {
      console.error('Error updating target:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to update study target'
      )
    }
  }

  useEffect(() => {
    fetchTargets()
  }, [])

  return {
    targets,
    loading,
    error,
    refetch: fetchTargets,
    createOrUpdateTarget,
    updateTarget
  }
}
