import { Icon } from '@iconify/react'

import type { TimerStatus } from '../typescript/timer'

interface TimerControlsProps {
  toggle: () => void
  reset: () => void
  status: TimerStatus
  className?: string
}

export default function TimerControls({
  toggle,
  reset,
  status,
  className = ''
}: TimerControlsProps) {
  const isRunning = status === 'running'

  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      {/* Start/Pause Button */}
      <button
        className={`flex h-20 w-20 transform items-center justify-center rounded-full transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
          isRunning
            ? 'bg-red-600 shadow-lg shadow-red-600/25 hover:bg-red-700'
            : 'bg-orange-500 shadow-lg shadow-orange-500/25 hover:bg-orange-600'
        }`}
        disabled={status === 'completed'}
        onClick={toggle}
      >
        <Icon
          className="text-3xl text-white"
          icon={
            isRunning ? 'material-symbols:pause' : 'material-symbols:play-arrow'
          }
        />
      </button>

      {/* Reset Button */}
      <button
        className="flex h-20 w-20 transform items-center justify-center rounded-full bg-gray-700 shadow-lg shadow-gray-700/25 transition-all hover:scale-105 hover:bg-gray-600"
        onClick={reset}
      >
        <Icon className="text-3xl text-white" icon="material-symbols:refresh" />
      </button>
    </div>
  )
}
