import { useCallback, useEffect, useState } from 'react'

import { TIMER_CONFIG } from '../constants/timer'
import type {
  TimerActions,
  TimerConfig,
  TimerState,
  TimerStatus,
  SessionType
} from '../typescript/timer'

interface UseTimerReturn extends TimerState, TimerActions {
  status: TimerStatus
}

export const useTimer = (config: TimerConfig): UseTimerReturn => {
  const [timeLeft, setTimeLeft] = useState(config.duration)
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState<SessionType>('focus')
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  const isCompleted = timeLeft === 0
  const status: TimerStatus = isCompleted
    ? 'completed'
    : isRunning
      ? 'running'
      : timeLeft === config.duration
        ? 'idle'
        : 'paused'

  useEffect(() => {
    setTimeLeft(config.duration)
    setSessionType('focus')
  }, [config.duration])

  // Timer effect
  useEffect(() => {
    let timerId: number | undefined

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          config.onTick?.(newTime)

          if (newTime === 0) {
            setIsRunning(false)
            
            if (sessionType === 'focus') {
              // Focus session completed, start break
              const newPomodoros = completedPomodoros + 1
              setCompletedPomodoros(newPomodoros)
              
              // Long break every 4 pomodoros (after 3 short breaks)
              if (newPomodoros % 4 === 0) {
                setSessionType('long-break')
                setTimeLeft(config.longBreak)
              } else {
                setSessionType('short-break')
                setTimeLeft(config.shortBreak)
              }
            } else {
              // Break completed, start focus session
              setSessionType('focus')
              setTimeLeft(config.duration)
            }
            
            config.onComplete?.()
          }

          return newTime
        })
      }, TIMER_CONFIG.TICK_INTERVAL)
    }

    return () => clearInterval(timerId)
  }, [isRunning, timeLeft, sessionType, completedPomodoros, config])

  // START TIMER
  const start = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true)
    }
  }, [timeLeft])

  // PAUSE TIMER
  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])

  // RESET TIMER
  const reset = useCallback(() => {
    setIsRunning(false)
    setSessionType('focus')
    setTimeLeft(config.duration)
  }, [config.duration])

  const toggle = useCallback(() => {
    if (isRunning) {
      pause()
    } else {
      start()
    }
  }, [isRunning, start, pause])

  return {
    timeLeft,
    isRunning,
    isCompleted,
    sessionType,
    completedPomodoros,
    status,
    start,
    pause,
    reset,
    toggle
  }
}
