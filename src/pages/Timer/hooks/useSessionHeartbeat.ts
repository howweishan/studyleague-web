import { useEffect, useRef, useCallback } from 'react'
import { sessionsAPI } from '../../../services/api'

interface UseSessionHeartbeatProps {
  isRunning: boolean
  isResting: boolean
  onSessionStart?: (sessionId: string) => void
  onSessionStop?: () => void
  onError?: (error: Error) => void
}

export const useSessionHeartbeat = ({
  isRunning,
  isResting,
  onSessionStart,
  onSessionStop,
  onError
}: UseSessionHeartbeatProps) => {
  const sessionIdRef = useRef<string | null>(null)
  const heartbeatIntervalRef = useRef<number | null>(null)
  const hasStartedRef = useRef(false) // Track if session has been started before

  // Start session (only on first start)
  const startSession = useCallback(async () => {
    try {
      const timestamp = Math.floor(Date.now() / 1000) // UNIX timestamp
      const response = await sessionsAPI.startSession(timestamp)
      sessionIdRef.current = response.id
      hasStartedRef.current = true
      onSessionStart?.(response.id)
      console.log('Session started:', response.id)
    } catch (error) {
      console.error('Failed to start session:', error)
      onError?.(error as Error)
    }
  }, [onSessionStart, onError])

  // Stop session
  const stopSession = useCallback(async () => {
    if (sessionIdRef.current) {
      try {
        const timestamp = Math.floor(Date.now() / 1000)
        await sessionsAPI.stopSession(sessionIdRef.current, timestamp)
        console.log('Session stopped:', sessionIdRef.current)
        
        // Clear all refs
        sessionIdRef.current = null
        hasStartedRef.current = false
        
        // Clear heartbeat interval
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current)
          heartbeatIntervalRef.current = null
        }
        
        onSessionStop?.()
      } catch (error) {
        console.error('Failed to stop session:', error)
        onError?.(error as Error)
      }
    }
  }, [onSessionStop, onError])

  // Send heartbeat
  const sendHeartbeat = useCallback(async () => {
    console.log('=== sendHeartbeat called ===')
    console.log('sessionIdRef.current:', sessionIdRef.current)
    console.log('isRunning:', isRunning)
    console.log('isResting:', isResting)
    
    if (sessionIdRef.current) {
      try {
        const timestamp = Math.floor(Date.now() / 1000)
        const isActive = isRunning && !isResting
        console.log('Sending heartbeat with:', { sessionId: sessionIdRef.current, timestamp, isActive })
        await sessionsAPI.heartbeat(sessionIdRef.current, timestamp, isActive)
        console.log('Heartbeat sent successfully:', { sessionId: sessionIdRef.current, isActive })
      } catch (error) {
        console.error('Failed to send heartbeat:', error)
        onError?.(error as Error)
      }
    } else {
      console.log('No session ID, skipping heartbeat')
    }
  }, [isRunning, isResting, onError])

  // Start session when timer starts (only on first start, not on resume)
  useEffect(() => {
    console.log('=== Start/Resume Effect ===')
    console.log('isRunning:', isRunning)
    console.log('sessionIdRef.current:', sessionIdRef.current)
    console.log('hasStartedRef.current:', hasStartedRef.current)
    
    if (isRunning && !sessionIdRef.current && !hasStartedRef.current) {
      console.log('Starting new session...')
      startSession()
    } else if (isRunning && sessionIdRef.current) {
      console.log('Resuming session:', sessionIdRef.current)
      // Just send a heartbeat to indicate resume
      sendHeartbeat()
    }
  }, [isRunning, startSession, sendHeartbeat])

  // Set up heartbeat interval (every 1 minute) - runs even when paused
  useEffect(() => {
    console.log('=== Heartbeat Interval Effect ===')
    console.log('sessionIdRef.current:', sessionIdRef.current)
    console.log('isRunning:', isRunning)
    console.log('isResting:', isResting)
    
    if (sessionIdRef.current) {
      console.log('Setting up heartbeat interval for session:', sessionIdRef.current)
      
      // Send initial heartbeat immediately
      sendHeartbeat()

      // Then send every 60 seconds (60000ms)
      heartbeatIntervalRef.current = window.setInterval(() => {
        console.log('Heartbeat interval triggered')
        sendHeartbeat()
      }, 60000) // 60 seconds = 60000 milliseconds
      
      console.log('Heartbeat interval ID:', heartbeatIntervalRef.current)

      return () => {
        console.log('Cleaning up heartbeat interval:', heartbeatIntervalRef.current)
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current)
          heartbeatIntervalRef.current = null
        }
      }
    } else {
      console.log('No session ID, not setting up heartbeat interval')
    }
  }, [sessionIdRef.current, sendHeartbeat, isRunning, isResting])

  return {
    sessionId: sessionIdRef.current,
    startSession,
    stopSession
  }
}
