import { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'react-router-dom'

import TimerControls from './components/TimerControls'
import TimerProgress from './components/TimerProgress'
import { useTimer } from './hooks/useTimer'
import TimerDisplay from './components/TimerDisplay'
import { usePreferredDurations } from './providers/PreferredDurationProvider'
import { useSessionHeartbeat } from './hooks/useSessionHeartbeat'
import { useAlarmSound } from './hooks/useAlarmSound'
import { TIMER_DURATIONS } from './constants/timer'

export default function Timer() {
  const { durations } = usePreferredDurations()
  const [searchParams] = useSearchParams()
  
  // Check if using a preset from StudyRooms
  const preset = searchParams.get('preset')
  const customDuration = searchParams.get('duration')

  // Determine initial durations based on preset or user preferences
  const getInitialDurations = () => {
    if (preset === 'custom' && customDuration) {
      return {
        pomodoro: parseInt(customDuration),
        shortBreak: TIMER_DURATIONS.SHORT_BREAK,
        longBreak: TIMER_DURATIONS.LONG_BREAK
      }
    } else if (preset === 'pomodoro') {
      return {
        pomodoro: TIMER_DURATIONS.POMODORO,
        shortBreak: TIMER_DURATIONS.SHORT_BREAK,
        longBreak: TIMER_DURATIONS.LONG_BREAK
      }
    } else if (preset === 'short') {
      return {
        pomodoro: 900, // 15 minutes
        shortBreak: TIMER_DURATIONS.SHORT_BREAK,
        longBreak: TIMER_DURATIONS.LONG_BREAK
      }
    } else if (preset === 'long') {
      return {
        pomodoro: 3000, // 50 minutes
        shortBreak: TIMER_DURATIONS.SHORT_BREAK,
        longBreak: TIMER_DURATIONS.LONG_BREAK
      }
    }
    return durations
  }

  const initialDurations = getInitialDurations()

  const [currentSelectedDuration, setCurrentSelectedDuration] = useState(initialDurations.pomodoro)
  const [currentSelectedShortBreak, setCurrentSelectedShortBreak] = useState(initialDurations.shortBreak)
  const [currentSelectedLongBreak, setCurrentSelectedLongBreak] = useState(initialDurations.longBreak)

  const timer = useTimer({ 
    duration: currentSelectedDuration, 
    shortBreak: currentSelectedShortBreak,
    longBreak: currentSelectedLongBreak,
    onComplete: () => { }, 
    onTick: () => { } 
  })

  // Session heartbeat management
  const { stopSession } = useSessionHeartbeat({
    isRunning: timer.isRunning,
    isResting: timer.sessionType !== 'focus',
    onSessionStart: (sessionId) => {
      console.log('Study session started:', sessionId)
    },
    onSessionStop: () => {
      console.log('Study session stopped')
    },
    onError: (error) => {
      console.error('Session error:', error)
    }
  })

  // Alarm sound for last 3 seconds
  useAlarmSound(timer.timeLeft, timer.isRunning)

  // Handle reset with session stop
  const handleReset = () => {
    stopSession()
    timer.reset()
  }

  // Handle exit (stop session and navigate away)
  const handleExit = () => {
    stopSession()
    // Add navigation logic here if needed
    window.history.back()
  }

  // Calculate elapsed minutes properly
  const totalDuration = timer.sessionType === 'focus' 
    ? currentSelectedDuration 
    : timer.sessionType === 'short-break'
      ? currentSelectedShortBreak
      : currentSelectedLongBreak
  
  const elapsedSeconds = totalDuration - timer.timeLeft
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  const totalMinutes = Math.floor(totalDuration / 60)

  // Get current time and date
  const now = new Date()
  const currentTime = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  const currentDate = now.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long'
  })
  
  // Only update durations from settings if NOT using a preset
  useEffect(() => {
    if (!preset) {
      setCurrentSelectedDuration(durations.pomodoro)
      setCurrentSelectedShortBreak(durations.shortBreak)
      setCurrentSelectedLongBreak(durations.longBreak)
    }
  }, [durations, preset])

  return (
    <div className="relative flex w-full flex-col items-center justify-center h-screen bg-linear-to-br from-orange-50 to-amber-50">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Solo Study
      </h1>
      {/* Timer Circle */}
      <div className="relative md:mb-12 mb-2">
        <TimerProgress
          className="mb-0"
          sessionType={timer.sessionType}
          timeLeft={timer.timeLeft}
          totalTime={totalDuration}
        />

        {/* Timer Display in Center */}
        <TimerDisplay sessionType={timer.sessionType} timeLeft={timer.timeLeft} />
      </div>

      {/* Stats */}
      <div className="mb-8 flex items-center space-x-8 text-gray-800">
        <div className="flex items-center space-x-2">
          <Icon
            className="text-lg text-orange-500"
            icon="material-symbols:timer"
          />
          <span className="text-sm font-medium">
            {elapsedMinutes}/{totalMinutes} MINS
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon
            className="text-lg text-orange-500"
            icon="material-symbols:refresh"
          />
          <span className="text-sm font-medium">
            {timer.completedPomodoros}/4 Pomodoros
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-8">
        <h3 className="mb-6 text-center text-lg font-semibold text-gray-700">
          MORE ACTIONS
        </h3>
        <div className="flex items-center space-x-4">
          {/* Music Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:music-note"
            />
          </button>

          {/* Skip to Rest Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:skip-next"
            />
          </button>

          {/* Change Timing Button */}
          <button className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-700 transition-colors hover:bg-gray-600">
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:schedule"
            />
          </button>

          {/* Exit Button */}
          <button 
            className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-600 transition-colors hover:bg-red-700"
            onClick={handleExit}
          >
            <Icon
              className="text-2xl text-white"
              icon="material-symbols:logout"
            />
          </button>
        </div>
      </div>

      {/* Main Control Buttons */}
      <TimerControls
        className="mb-0"
        reset={handleReset}
        status={timer.status}
        toggle={timer.toggle}
      />

      {/* Top right info */}
      <div className="absolute top-8 right-8 text-right  md:block hidden">
        <div className="mb-1 text-2xl font-bold text-gray-800">{currentTime}</div>
        <div className="mb-4 text-sm text-gray-600">{currentDate}</div>
      </div>
    </div>
  )
}