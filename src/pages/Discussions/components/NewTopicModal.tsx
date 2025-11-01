import { useState } from 'react'
import { Icon } from '@iconify/react'

interface NewTopicModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { title: string; content: string }) => Promise<void>
}

export default function NewTopicModal({ isOpen, onClose, onSubmit }: NewTopicModalProps) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    try {
      await onSubmit({ title, content })
      setTitle('')
      setContent('')
      onClose()
    } catch (error) {
      console.error('Failed to create topic:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-8 shadow-xl">
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <Icon className="text-xl text-gray-600" icon="material-symbols:close" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">Start a New Topic</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              id="title"
              placeholder="What's your question or topic?"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="content">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
              id="content"
              placeholder="Provide more details about your topic..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
              disabled={!title.trim() || !content.trim() || loading}
              type="submit"
            >
              {loading ? 'Creating...' : 'Create Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
