import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { Link } from 'react-router'
import { useState } from 'react'

import { useUser } from '../../contexts/UserContext'
import { useStudySessions } from '../../hooks/useStudySessions'
import { useStudyTargets } from '../../hooks/useStudyTargets'
import { useStudyRooms } from '../../hooks/useStudyRooms'
import { useStatistics } from '../../hooks/useStatistics'
import RoomItem from '../StudyRooms/components/RoomItem'
import AdjustTargetModal from '../../components/AdjustTargetModal'
import { POCKETBASE_URL } from '@/constants/server'

export default function Home() {
  const { user } = useUser()
  const { sessions } = useStudySessions()
  const { targets, updateTarget } = useStudyTargets()
  const { rooms, loading: roomsLoading } = useStudyRooms()
  const { statistics, loading: statsLoading } = useStatistics(user?.user_id)
  const [showTargetModal, setShowTargetModal] = useState(false)

  // Get today's study time from statistics or fallback to 0
  const todayStudyTime = statistics?.total_today || 0

  // Get user's weekly target
  const userTarget = targets // targets is an array, get first item
  const weeklyTargetHours = userTarget?.weeklyTarget || userTarget?.weekly_target || 40 // Default 40 hours
  const weeklyTargetMinutes = weeklyTargetHours * 60

  const handleSaveTargets = async (newTargets: { daily: number; weekly: number; monthly: number }) => {
    if (!user) {
      console.error('User is null')
      alert('User not logged in. Please log in again.')
      return
    }
    
    if (!user.user_id) {
      console.error('User ID is missing from user object')
      alert('User ID is missing. Please log in again.')
      return
    }
    
    try {
      console.log('Current userTarget:', userTarget)
      console.log('User ID:', user.user_id)
      
      if (!userTarget?.record_id) {
        console.error('No record_id found in userTarget')
        alert('Unable to update targets. Please refresh the page and try again.')
        return
      }
      
      await updateTarget(userTarget.record_id, {
        user: user.user_id,
        record_id: userTarget.record_id,
        daily_target: newTargets.daily,
        weekly_target: newTargets.weekly,
        monthly_target: newTargets.monthly
      })
      
      setShowTargetModal(false)
    } catch (error) {
      console.error('=== Error updating targets ===', error)
      alert('Failed to update targets. Please try again.')
    }
  }

  // Get this week's study time from statistics or calculate from sessions
  const thisWeekStudyTime = statistics?.total_week || sessions
    .filter(session => {
      const sessionDate = new Date(session.startedAt)
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      return sessionDate >= weekStart && !session.active
    })
    .reduce((total, session) => total + session.durationMinutes, 0)

  const remainingWeeklyMinutes = Math.max(
    0,
    weeklyTargetMinutes - thisWeekStudyTime
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
		<div className="mb-8">
			<h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome!</h1>
			<p className="text-gray-600">Hope you have a great day ahead!</p>
      	</div>
      {/* Main Content Grid */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Today Stats Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-orange-400 to-orange-500 p-6 text-white lg:col-span-2">
          <div className="relative z-10">
            <div className="mb-2 text-sm font-medium">Today Stats</div>
            <div className={`mb-4 text-5xl font-bold ${statsLoading ? 'animate-pulse' : ''}`}>
              {statsLoading ? (
                <Icon className="animate-pulse text-4xl" icon="material-symbols:more-horiz" />
              ) : (
                dayjs.duration(todayStudyTime, 'minutes').format('H[h] mm[m]')
              )}
            </div>
            <div className="mb-6 text-sm">
              <div>
                &quot;Focus is not about ignoring everything else, it&apos;s
                about paying attention to what matters.&quot;
              </div>
              <div className="text-orange-200">--- Anonymous</div>
            </div>
            <Link
              className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-medium text-orange-500 transition-colors hover:bg-gray-50 w-fit"
              to="/timer"
            >
              <Icon className="text-lg" icon="material-symbols:play-arrow" />
              <span>Start Studying</span>
            </Link>
          </div>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 h-64 w-64 opacity-20">
            <div className="h-full w-full translate-x-16 -translate-y-16 transform rounded-full bg-linear-to-br from-white to-transparent"></div>
          </div>
        </div>
        {/* Weekly Goals Card */}
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-700 p-6 text-white">
          <div className="relative z-10 flex h-full flex-col">
            <div className="grow">
              <div className="mb-2 text-sm font-medium">Your Weekly Goals</div>
              <div className="mb-2 text-5xl font-bold">
                {dayjs
                  .duration(remainingWeeklyMinutes, 'minutes')
                  .format('D[d] H[h] mm[m]')}
              </div>
              <div className="mb-6 text-sm text-indigo-200">Remaining</div>
            </div>
            <button 
              className="flex items-center space-x-2 rounded-lg bg-white px-6 py-3 font-medium text-indigo-600 transition-colors hover:bg-gray-50 w-fit"
              onClick={() => setShowTargetModal(true)}
            >
              <Icon className="text-lg" icon="material-symbols:tune" />
              <span>Adjust your Target</span>
            </button>
          </div>
        </div>
      </div>

      {/* Study Rooms Section */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Explore Open Study Rooms
          </h2>
          <Link
            className="flex items-center space-x-2 text-sm font-medium text-orange-500 transition-colors hover:text-orange-600 "
            to="/study-rooms"
          >
            <span className='truncate'>View All</span>
            <Icon icon="material-symbols:arrow-forward" />
          </Link>
        </div>
        {roomsLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Icon
              className="animate-spin text-4xl text-gray-400"
              icon="material-symbols:progress-activity"
            />
          </div>
        ) : rooms.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <Icon
              className="mb-4 text-6xl text-gray-400"
              icon="material-symbols:meeting-room-outline"
            />
            <p className="mb-2 text-lg font-medium text-gray-900">
              No Study Rooms Available
            </p>
            <p className="mb-4 text-sm text-gray-500">
              Be the first to create a study room!
            </p>
            <Link
              className="flex items-center space-x-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white transition-colors hover:bg-orange-600"
              to="/study-rooms"
            >
              <Icon icon="material-symbols:add" />
              <span>Create Study Room</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.slice(0, 6).map((room) => (
              <RoomItem
                key={room.id}
                room={{
                  id: parseInt(room.id),
                  name: room.room_name,
                  duration: `${Math.floor(room.timing / 60)}h ${room.timing % 60}m`,
                  participants: `${room.participants} participant${room.participants !== 1 ? 's' : ''}`,
                  type: room.isPublic ? 'Public Room' : 'Private Room',
                  features: room.isPublic ? ['chat', 'video'] : ['silent'],
                  image: room.thumbnail
						? `${POCKETBASE_URL}/api/files/study_rooms/${room.id}/${room.thumbnail}`
						: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
				
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Adjust Target Modal */}
      <AdjustTargetModal
        currentTargets={{
          daily: userTarget?.dailyTarget || userTarget?.daily_target || 2,
          weekly: userTarget?.weeklyTarget || userTarget?.weekly_target || 14,
          monthly: userTarget?.monthlyTarget || userTarget?.monthly_target || 60
        }}
        isOpen={showTargetModal}
        onClose={() => setShowTargetModal(false)}
        onSave={handleSaveTargets}
      />
    </div>
  )
}
