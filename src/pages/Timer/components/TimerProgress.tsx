import ProgressRing from './ProgressRing'
import type { SessionType } from '../typescript/timer'

interface TimerProgressProps {
  timeLeft: number
  totalTime: number
  sessionType: SessionType
  className?: string
}

export default function TimerProgress({
  timeLeft,
  totalTime,
  sessionType,
  className = ''
}: TimerProgressProps) {

  // Ensure totalTime is never 0 to avoid division by zero
  const safeTotalTime = totalTime > 0 ? totalTime : 1
  
  // Calculate progress, ensuring it stays between 0 and 100
  let progress = ((safeTotalTime - timeLeft) / safeTotalTime) * 100
  
  // Clamp progress between 0 and 100
  progress = Math.max(0, Math.min(100, progress))
  
  // Handle edge case when timer completes
  if (timeLeft === 0) {
    progress = 100
  }
  
  // Different colors for different session types
  const ringColor = sessionType === 'focus' 
    ? '#f97316' // orange-500
    : sessionType === 'short-break'
      ? '#16a34a' // green-600
      : '#2563eb' // blue-600

  return <ProgressRing className={className} color={ringColor} progress={progress}  />
}
