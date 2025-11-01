import { Icon } from '@iconify/react'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { TIMER_DURATIONS } from '../Timer/constants/timer'
import { useStudyRooms } from '../../hooks/useStudyRooms'
import RoomList from './components/RoomList'

export default function StudyRooms() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCustomDialog, setShowCustomDialog] = useState(false)
  const [customMinutes, setCustomMinutes] = useState(25)
  const { rooms, loading: roomsLoading, error: roomsError } = useStudyRooms()


  const soloStudyOptions = [
    {
      name: 'Pomodoro (25 min)',
      duration: TIMER_DURATIONS.POMODORO,
      icon: 'material-symbols:timer',
      preset: 'pomodoro'
    },
    {
      name: 'Short Session (15 min)',
      duration: 900,
      icon: 'material-symbols:schedule',
      preset: 'short'
    },
    {
      name: 'Long Session (50 min)',
      duration: 3000,
      icon: 'material-symbols:hourglass-full',
      preset: 'long'
    },
    { 
      name: 'Custom Timer', 
      duration: 0, 
      icon: 'material-symbols:edit',
      preset: null
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Custom Timer Dialog */}
      {showCustomDialog && (
        <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="animate-scale-in mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Icon
                  className="text-3xl text-orange-500"
                  icon="material-symbols:timer"
                />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
              Custom Timer
            </h3>
            <p className="mb-6 text-center text-gray-600">
              Set your desired study duration
            </p>
            
            {/* Minutes Input */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Duration (minutes)
              </label>
              <div className="flex items-center space-x-4">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300"
                  onClick={() => setCustomMinutes(Math.max(1, customMinutes - 5))}
                >
                  <Icon icon="material-symbols:remove" />
                </button>
                <input
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-2xl font-bold text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  max="180"
                  min="1"
                  type="number"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.max(1, Math.min(60, parseInt(e.target.value) || 1)))}
                />
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300"
                  onClick={() => setCustomMinutes(Math.min(60, customMinutes + 5))}
                >
                  <Icon icon="material-symbols:add" />
                </button>
              </div>
              <p className="mt-2 text-center text-sm text-gray-500">
                Range: 1 - 60 minutes
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
                onClick={() => setShowCustomDialog(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-all hover:scale-105 hover:bg-orange-600 active:scale-95"
                onClick={() => {
                  setShowCustomDialog(false)
                  navigate(`/timer?preset=custom&duration=${customMinutes * 60}`)
                }}
              >
                Start Timer
              </button>
            </div>
          </div>
        </div>
      )}

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
              onClick={() => {
                if (option.preset) {
                  navigate(`/timer?preset=${option.preset}`)
                } else if (option.duration > 0) {
                  navigate('/timer')
                } else {
                  // Custom timer - show dialog
                  setShowCustomDialog(true)
                }
              }}
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
