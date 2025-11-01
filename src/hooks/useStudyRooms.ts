import { useEffect, useState } from 'react'

import { roomsAPI } from '../services/api'
import type { StudyRoom } from '../services/api'

export const useStudyRooms = () => {
  const [rooms, setRooms] = useState<StudyRoom[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  const fetchRooms = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await roomsAPI.getAll()
      setRooms(data)
    } catch (err: any) {
      console.error('Error fetching study rooms:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch study rooms'
      )
    } finally {
      setLoading(false)
    }
  }

  const createRoom = async (roomData: Omit<StudyRoom, 'id'>) => {
    try {
      const newRoom = await roomsAPI.create(roomData)
      setRooms(prev => [newRoom, ...prev])
      return newRoom
    } catch (err: any) {
      console.error('Error creating room:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to create room'
      )
    }
  }

  const updateRoom = async (id: string, updates: Partial<StudyRoom>) => {
    try {
      const updatedRoom = await roomsAPI.update(id, updates)
      setRooms(prev => prev.map(room => (room.id === id ? updatedRoom : room)))
      return updatedRoom
    } catch (err: any) {
      console.error('Error updating room:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to update room'
      )
    }
  }

  const deleteRoom = async (id: string) => {
    try {
      await roomsAPI.delete(id)
      setRooms(prev => prev.filter(room => room.id !== id))
    } catch (err: any) {
      console.error('Error deleting room:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to delete room'
      )
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return {
    rooms,
    loading,
    error,
    refetch: fetchRooms,
    createRoom,
    updateRoom,
    deleteRoom
  }
}
