export const TIMER_DURATIONS = {
  POMODORO: 25 * 60, // 25 minutes
  SHORT_BREAK: 5 * 60, // 5 minutes
  LONG_BREAK: 15 * 60, // 15 minutes
  TEST: 5 // 5 seconds for testing
} as const

export const TIMER_CONFIG = {
//   TICK_INTERVAL: 1000, // 1 second
  // debug only
  TICK_INTERVAL: 1000 // 0.1 second for testing
} as const

export const PROGRESS_RING = {
  RADIUS: 80,
  STROKE_WIDTH: 12
} as const
