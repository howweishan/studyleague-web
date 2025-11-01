import { useEffect, useState } from 'react'

import { discussionsAPI } from '../services/api'
import type { Discussion, DiscussionReply } from '../services/api'

export const useDiscussions = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchDiscussions = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await discussionsAPI.getAll()
      setDiscussions(data)
    } catch (err: any) {
      console.error('Error fetching discussions:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch discussions'
      )
    } finally {
      setLoading(false)
    }
  }

  const createDiscussion = async (
    discussionData: Omit<Discussion, 'id' | 'created'>
  ) => {
    try {
      const newDiscussion = await discussionsAPI.create(discussionData)
      setDiscussions(prev => [newDiscussion, ...prev])
      return newDiscussion
    } catch (err: any) {
      console.error('Error creating discussion:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to create discussion'
      )
    }
  }

  const updateDiscussion = async (id: string, updates: Partial<Discussion>) => {
    try {
      const updatedDiscussion = await discussionsAPI.update(id, updates)
      setDiscussions(prev =>
        prev.map(discussion =>
          discussion.id === id ? updatedDiscussion : discussion
        )
      )
      return updatedDiscussion
    } catch (err: any) {
      console.error('Error updating discussion:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to update discussion'
      )
    }
  }

  const deleteDiscussion = async (id: string) => {
    try {
      await discussionsAPI.delete(id)
      setDiscussions(prev => prev.filter(discussion => discussion.id !== id))
    } catch (err: any) {
      console.error('Error deleting discussion:', err)
      throw new Error(
        err.response?.data?.message ||
          err.message ||
          'Failed to delete discussion'
      )
    }
  }

  useEffect(() => {
    fetchDiscussions()
  }, [])

  return {
    discussions,
    loading,
    error,
    refetch: fetchDiscussions,
    createDiscussion,
    updateDiscussion,
    deleteDiscussion
  }
}

export const useDiscussionReplies = (discussionId: string | null) => {
  const [replies, setReplies] = useState<DiscussionReply[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchReplies = async () => {
    if (!discussionId) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await discussionsAPI.getReplies(discussionId)
      setReplies(data)
    } catch (err: any) {
      console.error('Error fetching discussion replies:', err)
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to fetch discussion replies'
      )
    } finally {
      setLoading(false)
    }
  }

  const addReply = async (replyData: { author: string; body: string }) => {
    if (!discussionId) return

    try {
      const newReply = await discussionsAPI.addReply(discussionId, replyData)
      setReplies(prev => [...prev, newReply])
      return newReply
    } catch (err: any) {
      console.error('Error adding reply:', err)
      throw new Error(
        err.response?.data?.message || err.message || 'Failed to add reply'
      )
    }
  }

  useEffect(() => {
    fetchReplies()
  }, [discussionId])

  return {
    replies,
    loading,
    error,
    refetch: fetchReplies,
    addReply
  }
}
