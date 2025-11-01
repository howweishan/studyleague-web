import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import type { SessionType } from '../typescript/timer'

dayjs.extend(duration)

interface TimerDisplayProps {
  timeLeft: number
  sessionType: SessionType
}

const sessionLabels: Record<SessionType, string> = {
  'focus': 'Focus Time',
  'short-break': 'Short Break',
  'long-break': 'Long Break'
}

const sessionColors: Record<SessionType, string> = {
  'focus': 'text-gray-700',
  'short-break': 'text-green-600',
  'long-break': 'text-blue-600'
}

export default function TimerDisplay({
  timeLeft,
  sessionType
}: TimerDisplayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className={`mb-2 text-6xl font-bold ${sessionColors[sessionType]}`}>	
        {dayjs.duration(timeLeft, 'seconds').format('mm:ss')}
      </div>
      <div className={`text-lg font-medium ${sessionColors[sessionType]}`}>
        {sessionLabels[sessionType]}
      </div>
    </div>
  )
}
