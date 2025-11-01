import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useDiscussions } from '../../hooks/useDiscussions'
import TopicList from './components/TopicList'
import Sidebar from './components/Sidebar'
import TopUsers from './components/TopUsers'
import NewTopicModal from './components/NewTopicModal'
import type { Discussion } from '../../services/api'

export default function Discussions() {
  const { discussions, loading, createDiscussion } = useDiscussions()
  const [_selectedTopic, setSelectedTopic] = useState<Discussion | null>(null)
  const [showNewTopicModal, setShowNewTopicModal] = useState(false)

  const handleCreateTopic = async (data: { title: string; content: string }) => {
    await createDiscussion({
      author: 'Current User', // Replace with actual user
      title: data.title,
      content: data.content,
    })
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <Icon className="text-xl text-white" icon="material-symbols:forum" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">forume</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Icon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                icon="material-symbols:search"
              />
              <input
                className="w-80 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                placeholder="Search for Topics"
                type="text"
              />
            </div>
            
            <button 
              className="flex items-center space-x-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              onClick={() => setShowNewTopicModal(true)}
            >
              <Icon icon="material-symbols:add" />
              <span>Start a New Topic</span>
            </button>

            <button className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
              <Icon className="text-xl text-gray-600" icon="material-symbols:notifications-outline" />
            </button>

            <div className="h-10 w-10 rounded-full bg-linear-to-br from-pink-400 to-purple-600"></div>
          </div>
        </header>

        {/* Topics List */}
        <main className="flex-1 overflow-y-auto">
          <TopicList 
            discussions={discussions} 
            loading={loading}
            onSelectTopic={setSelectedTopic}
          />
        </main>
      </div>

      {/* Right Sidebar */}
      <TopUsers />

      {/* New Topic Modal */}
      <NewTopicModal
        isOpen={showNewTopicModal}
        onClose={() => setShowNewTopicModal(false)}
        onSubmit={handleCreateTopic}
      />
    </div>
  )
}
