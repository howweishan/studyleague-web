import { Icon } from '@iconify/react'

interface TopicCardProps {
  topic: {
    id: string
    title: string
    content: string
    author: string
    authorAvatar: string
    timeAgo: string
    upvotes: number
    downvotes: number
    comments: number
  }
  onClick: () => void
}

export default function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <div className="flex items-start space-x-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2">
          <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 transition-colors">
            <Icon className="text-xl text-gray-600" icon="material-symbols:arrow-upward" />
          </button>
          <span className="text-sm font-semibold text-gray-900">{topic.upvotes}</span>
          <button className="flex h-8 w-8 items-center justify-center rounded hover:bg-gray-100 transition-colors">
            <Icon className="text-xl text-gray-600" icon="material-symbols:arrow-downward" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
            {topic.title}
          </h3>
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">
            {topic.content}
          </p>

          {/* Author and Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-600"></div>
              <div className="text-sm">
                <span className="font-medium text-gray-900">Posted by </span>
                <span className="font-semibold text-indigo-600">{topic.author}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">{topic.timeAgo}</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Icon className="text-lg" icon="material-symbols:comment-outline" />
              <span>{topic.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
