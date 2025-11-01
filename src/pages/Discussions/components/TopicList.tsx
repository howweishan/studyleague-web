import { Icon } from '@iconify/react'
import type { Discussion } from '../../../services/api'
import TopicCard from './TopicCard'

interface TopicListProps {
  discussions: Discussion[]
  loading: boolean
  onSelectTopic: (discussion: Discussion) => void
}

export default function TopicList({ discussions: _discussions, loading, onSelectTopic }: TopicListProps) {
  // Mock data for demonstration - replace with real data
  const topics = [
    {
      id: '1',
      title: 'What does the fox say?',
      content: 'Guys! So I was in the shower last day and it just popped in my head. What does the fox say? Like really. How do they sound when they speak. I know about dogs, cats, moos, cow, etc but I Never heard of it. Anyway, if any of you guys have any idea. Let me know in the comments. Thanks in advance.',
      author: 'Aakash Raj Dahal',
      authorAvatar: '',
      timeAgo: '69h ago',
      upvotes: 56,
      downvotes: 0,
      comments: 58,
    },
    {
      id: '2',
      title: 'Who was the first guy to land on the moon?',
      content: 'Okay. This is embarrassing but I forgot the name of the guy who landed on the moon the first time. Sorry if this sounds silly.',
      author: 'Siris Mahajan',
      authorAvatar: '',
      timeAgo: '028h ago',
      upvotes: 102,
      downvotes: 0,
      comments: 96,
    },
    {
      id: '3',
      title: 'COVID-19 Mega Thread Apr 2020',
      content: 'Post all the news, spoofs and everything related to the COVID Virus in this topic. This allows others to quickly go through all the information related to the virus in an much easier manner.',
      author: 'Rajen Noqueni',
      authorAvatar: '',
      timeAgo: '088h ago',
      upvotes: 125,
      downvotes: 0,
      comments: 96,
    },
  ]

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <Icon className="mx-auto mb-4 text-4xl text-gray-400 animate-spin" icon="material-symbols:progress-activity" />
          <p className="text-gray-600">Loading discussions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {topics.map((topic) => (
          <TopicCard 
            key={topic.id} 
            topic={topic}
            onClick={() => onSelectTopic(topic as unknown as Discussion)}
          />
        ))}
      </div>
    </div>
  )
}
