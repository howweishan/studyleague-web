import { Icon } from '@iconify/react'
import type { Discussion } from '../../../services/api'

interface TopicDetailProps {
  topic: Discussion
  onClose: () => void
}

export default function TopicDetail({ topic, onClose }: TopicDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
        {/* Close button */}
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <Icon className="text-xl text-gray-600" icon="material-symbols:close" />
        </button>

        {/* Content */}
        <div className="p-8">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{topic.title}</h1>
          <div className="mb-6 flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-600"></div>
            <div>
              <p className="font-medium text-gray-900">{topic.author}</p>
              <p className="text-sm text-gray-500">{new Date(topic.created).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p>{topic.content}</p>
          </div>

          {/* Replies section would go here */}
        </div>
      </div>
    </div>
  )
}
