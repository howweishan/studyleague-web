import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useDiscussions } from '../../hooks/useDiscussions'
import TopicList from './components/TopicList'
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


      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">


          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Icon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                icon="material-symbols:search"
              />
              <input
                className="flex grow rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
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
			<div className="relative block sm:hidden">
              <Icon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800"
                icon="material-symbols:search"
              />
            </div>
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


      {/* New Topic Modal */}
      <NewTopicModal
        isOpen={showNewTopicModal}
        onClose={() => setShowNewTopicModal(false)}
        onSubmit={handleCreateTopic}
      />
    </div>
  )
}
