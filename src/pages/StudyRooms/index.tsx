import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { TIMER_DURATIONS } from '../Timer/constants/timer'
import { useStudyRooms } from '../../hooks/useStudyRooms'
import RoomList from './components/RoomList'

export default function StudyRooms() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const { rooms, loading: roomsLoading, error: roomsError } = useStudyRooms()


  const soloStudyOptions = [
    {
      name: 'Pomodoro (25 min)',
      duration: TIMER_DURATIONS.POMODORO,
      icon: 'material-symbols:timer'
    },
    {
      name: 'Short Session (15 min)',
      duration: 900,
      icon: 'material-symbols:schedule'
    },
    {
      name: 'Long Session (50 min)',
      duration: 3000,
      icon: 'material-symbols:hourglass-full'
    },
    { name: 'Custom Timer', duration: 0, icon: 'material-symbols:edit' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Study Rooms</h1>
        <p className="text-gray-600">
          Join a study room or start a solo session
        </p>
      </div>

      {/* Solo Study Options */}
      <div className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Solo Study</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {soloStudyOptions.map((option, index) => (
            <button
              key={index}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-orange-300 hover:shadow-lg"
              onClick={() => option.duration > 0 && navigate('/timer')}
            >
              <div className="mb-3 flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 transition-colors group-hover:bg-orange-200">
                  <Icon
                    className="text-xl text-orange-600"
                    icon={option.icon}
                  />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{option.name}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Start a focused solo study session
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 w-full">
        <div className="relative">
          <Icon
            className="absolute top-1/2 left-3 -translate-y-1/2 transform text-lg text-gray-400"
            icon="material-symbols:search"
          />
          <input
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-gray-900 placeholder-gray-500 focus:border-transparent focus:ring-2 focus:ring-orange-500 focus:outline-none"
            placeholder="Search study rooms..."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Study Rooms Grid */}
      <div className="mb-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Available Study Rooms
        </h2>
        <RoomList
          rooms={rooms}
          loading={roomsLoading}
          error={roomsError}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  )
}
