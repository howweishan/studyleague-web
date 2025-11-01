import { useEffect, useRef } from 'react'

export const useAlarmSound = (timeLeft: number, isRunning: boolean) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const hasPlayedRef = useRef(false)

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      audioRef.current = new Audio('/alarm.opus')
      audioRef.current.preload = 'auto'
    }
  }, [])

  useEffect(() => {
    // Play alarm in the last 3 seconds
    if (isRunning && timeLeft <= 3 && timeLeft > 0 && !hasPlayedRef.current) {
      hasPlayedRef.current = true
      audioRef.current?.play().catch(error => {
        console.error('Failed to play alarm sound:', error)
      })
    }

    // Reset the flag when timer is reset or restarted
    if (timeLeft > 3) {
      hasPlayedRef.current = false
    }
  }, [timeLeft, isRunning])

  // Cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])
}
