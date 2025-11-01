import type { TimerStatus } from '../../pages/Timer/typescript/timer'

interface StatusIndicatorProps {
  status: TimerStatus
  className?: string
}

const statusConfig = {
  idle: {
    label: 'Ready',
    dotColor: 'bg-gray-400',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-600'
  },
  running: {
    label: 'Running',
    dotColor: 'bg-green-500 animate-pulse',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800'
  },
  paused: {
    label: 'Paused',
    dotColor: 'bg-yellow-500',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800'
  },
  completed: {
    label: "Time's up!",
    dotColor: 'bg-red-500',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800'
  }
}

export default function StatusIndicator({
  status,
  className = ''
}: StatusIndicatorProps) {
  const config = statusConfig[status]

  return (
    <div
      className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${config.bgColor} ${config.textColor} ${className}`}
    >
      <div className={`mr-2 h-2 w-2 rounded-full ${config.dotColor}`}></div>
      {config.label}
    </div>
  )
}
