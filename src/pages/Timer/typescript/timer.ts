// Timer types and interfaces

export type SessionType = 'focus' | 'short-break' | 'long-break'

export interface TimerState {
  timeLeft: number
  isRunning: boolean
  isCompleted: boolean
  sessionType: SessionType
  completedPomodoros: number
}

export interface TimerActions {
  start: () => void
  pause: () => void
  reset: () => void
  toggle: () => void
}

export interface TimerConfig {
  duration: number // in seconds
  shortBreak: number // in seconds
  longBreak: number // in seconds
  onComplete?: () => void
  onTick?: (timeLeft: number) => void
}

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed'
