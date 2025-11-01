import axios from 'axios'

import { SERVER_HOST, SERVER_PORT } from '../constants/server'

const API_BASE_URL = `${SERVER_HOST}:${SERVER_PORT}/api`

// Types based on the API documentation
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  requiredHours: number
}

export interface UserAchievement {
  id: string
  user: string
  achievement: Achievement
  unlockedAt: string
}

export interface StudySession {
  id: string
  user: string
  room?: string
  durationMinutes: number
  active: boolean
  startedAt: string
  endedAt?: string
  integrityScore?: number
}

export interface StudyRoom {
  max_participants: any
  timing: number
  id: string
  room_name: string
  host: string
  participants: number
  maxParticipants: number
  isPublic: boolean
  thumbnail?: string
  webrtcSessionId?: string
}

export interface Discussion {
  id: string
  author: string
  title: string
  content: string
  created: string
}

export interface DiscussionReply {
  id: string
  author: string
  discussion: string
  body: string
  created: string
}

export interface StudyTarget {
  id: string
  record_id: string
  user: string
  dailyTarget: number
  weeklyTarget: number
  monthlyTarget: number
  daily_target: number
  weekly_target: number
  monthly_target: number
  created: string
  updated: string
}

export interface LeaderboardEntry {
  user_avatar: any
  userAvatar: string
  avatar: string
  user_name: string
  user_id: string
  id: string
  user: any // Will be expanded user object
  dayTotal: number
  monthTotal: number
  overallTotal: number
}

export interface Statistics {
  collection_id: string
  collection_name: string
  created: string
  expand: Record<string, unknown>
  id: string
  sessions_last_7_days: number
  study_streak_days: number
  total_month: number
  total_offwork_time: number
  total_overall: number
  total_study_last_7_days: number
  total_today: number
  total_week: number
  total_weekdays: number
  total_weekends: number
  total_work_time: number
  updated: string
  user_avatar: string
  user_id: string
  user_name: string
}

// Achievements API
export const achievementsAPI = {
  // Get all achievements
  getAll: async (): Promise<Achievement[]> => {
    const response = await axios.get(`${API_BASE_URL}/achievements/`)
    return response.data
  },

  // Get achievement by ID
  getById: async (id: string): Promise<Achievement> => {
    const response = await axios.get(`${API_BASE_URL}/achievements/${id}`)
    return response.data
  },

  // Get user achievements
  getUserAchievements: async (userId: string): Promise<UserAchievement[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/achievements/user/${userId}`
    )
    return response.data
  },

  // Unlock achievement
  unlockAchievement: async (
    userId: string,
    achievementId: string
  ): Promise<UserAchievement> => {
    const response = await axios.post(`${API_BASE_URL}/achievements/unlock`, {
      user: userId,
      achievement: achievementId
    })
    return response.data
  },

  // Admin: Create achievement
  create: async (
    achievement: Omit<Achievement, 'id'>
  ): Promise<Achievement> => {
    const response = await axios.post(
      `${API_BASE_URL}/achievements/`,
      achievement
    )
    return response.data
  },

  // Admin: Update achievement
  update: async (
    id: string,
    updates: Partial<Achievement>
  ): Promise<Achievement> => {
    const response = await axios.put(
      `${API_BASE_URL}/achievements/${id}`,
      updates
    )
    return response.data
  },

  // Admin: Delete achievement
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/achievements/${id}`)
  }
}

// Study Sessions API
export const sessionsAPI = {
  // Start a new study session
  startSession: async (timestamp: number): Promise<{ id: string; timestamp: number }> => {
    console.log('API: Starting session with timestamp:', timestamp)
    const response = await axios.post(`${API_BASE_URL}/study_sessions/start`, {
      timestamp
    })
    console.log('API: Session started:', response.data)
    return response.data
  },

  // Send heartbeat for active session
  heartbeat: async (sessionId: string, timestamp: number, isActive: boolean): Promise<{ message: string; duration: number }> => {
    console.log('API: Sending heartbeat request', { sessionId, timestamp, isActive })
    const payload = {
      session_id: sessionId,
      timestamp,
      is_active: isActive
    }
    console.log('API: Heartbeat payload:', payload)
    const response = await axios.post(`${API_BASE_URL}/study_sessions/heartbeat`, payload)
    console.log('API: Heartbeat response:', response.data)
    return response.data
  },

  // Stop a study session
  stopSession: async (sessionId: string, timestamp: number): Promise<{ message: string; session: any }> => {
    console.log('API: Sending stop session request', { sessionId, timestamp })
    const payload = {
      session_id: sessionId,
      timestamp
    }
    console.log('API: Stop session payload:', payload)
    const response = await axios.post(`${API_BASE_URL}/study_sessions/stop`, payload)
    console.log('API: Stop session response:', response.data)
    return response.data
  },

  // End session (alternative endpoint)
  endSession: async (sessionId: string): Promise<any> => {
    const response = await axios.post(`${API_BASE_URL}/study_sessions/${sessionId}/end`)
    return response.data
  },

  // Get all sessions for authenticated user
  getAll: async (): Promise<StudySession[]> => {
    const response = await axios.get(`${API_BASE_URL}/study_sessions/`)
    return response.data
  },

  // Get specific session by ID
  getById: async (sessionId: string): Promise<StudySession> => {
    const response = await axios.get(`${API_BASE_URL}/study_sessions/${sessionId}`)
    return response.data
  },

  // Create new session
  create: async (session: Omit<StudySession, 'id'>): Promise<StudySession> => {
    const response = await axios.post(`${API_BASE_URL}/study_sessions/`, session)
    return response.data
  },

  // Update session
  update: async (
    id: string,
    updates: Partial<StudySession>
  ): Promise<StudySession> => {
    const response = await axios.put(`${API_BASE_URL}/sessions/${id}`, updates)
    return response.data
  },

  // Delete session
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/sessions/${id}`)
  }
}

// Study Rooms API
export const roomsAPI = {
  // Get all rooms
  getAll: async (): Promise<StudyRoom[]> => {
    const response = await axios.get(`${API_BASE_URL}/rooms/`)
    return response.data
  },

  // Create new room
  create: async (room: Omit<StudyRoom, 'id'>): Promise<StudyRoom> => {
    const response = await axios.post(`${API_BASE_URL}/rooms/`, room)
    return response.data
  },

  // Update room
  update: async (
    id: string,
    updates: Partial<StudyRoom>
  ): Promise<StudyRoom> => {
    const response = await axios.put(`${API_BASE_URL}/rooms/${id}`, updates)
    return response.data
  },

  // Delete room
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/rooms/${id}`)
  }
}

// Discussions API
export const discussionsAPI = {
  // Get all discussions
  getAll: async (): Promise<Discussion[]> => {
    const response = await axios.get(`${API_BASE_URL}/discussions/`)
    return response.data
  },

  // Get discussion by ID
  getById: async (id: string): Promise<Discussion> => {
    const response = await axios.get(`${API_BASE_URL}/discussions/${id}`)
    return response.data
  },

  // Create new discussion
  create: async (
    discussion: Omit<Discussion, 'id' | 'created'>
  ): Promise<Discussion> => {
    const response = await axios.post(
      `${API_BASE_URL}/discussions/`,
      discussion
    )
    return response.data
  },

  // Update discussion
  update: async (
    id: string,
    updates: Partial<Discussion>
  ): Promise<Discussion> => {
    const response = await axios.put(
      `${API_BASE_URL}/discussions/${id}`,
      updates
    )
    return response.data
  },

  // Delete discussion
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/discussions/${id}`)
  },

  // Get replies for discussion
  getReplies: async (discussionId: string): Promise<DiscussionReply[]> => {
    const response = await axios.get(
      `${API_BASE_URL}/discussions/${discussionId}/replies`
    )
    return response.data
  },

  // Add reply to discussion
  addReply: async (
    discussionId: string,
    reply: { author: string; body: string }
  ): Promise<DiscussionReply> => {
    const response = await axios.post(
      `${API_BASE_URL}/discussions/${discussionId}/replies`,
      reply
    )
    return response.data
  }
}

// Study Targets API
export const targetsAPI = {
  // Get all targets for authenticated user
  getAll: async (): Promise<StudyTarget[]> => {
    const response = await axios.get(`${API_BASE_URL}/targets/`)
    return response.data
  },

  // Create or update target (POST)
  createOrUpdate: async (
	id: string,
    target: Partial<Omit<StudyTarget, 'id' | 'created' | 'updated' >>
  ): Promise<StudyTarget> => {
    const response = await axios.put(`${API_BASE_URL}/targets/${id}`, target)
    return response.data
  },

  // Update target (PUT)
  update: async (
    id: string,
    target: Partial<Omit<StudyTarget, 'id' | 'created' | 'updated'>>
  ): Promise<StudyTarget> => {
    const response = await axios.put(`${API_BASE_URL}/targets/${id}`, target)
    return response.data
  }
}

// Statistics API
export const statisticsAPI = {
  // Get statistics
  getAll: async (): Promise<Statistics[]> => {
    const response = await axios.get(`${API_BASE_URL}/statistics/`)
    return response.data
  },

  // Get user statistics by user ID
  getByUserId: async (userId: string): Promise<Statistics[]> => {
    const response = await axios.get(`${API_BASE_URL}/statistics/?user_id=${userId}`)
    return response.data
  }
}

// Leaderboard API
export const leaderboardAPI = {
  // Get leaderboard
  get: async (): Promise<LeaderboardEntry[]> => {
    const response = await axios.get(`${API_BASE_URL}/leaderboard/`)
    return response.data
  }
}

// Auth API
export const authAPI = {
  // Login
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    })
    return response.data
  },

  // Logout
  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`)
    return response.data
  }
}

// Users API
export const usersAPI = {
  // Get all users (may be restricted)
  getAll: async () => {
    const response = await axios.get(`${API_BASE_URL}/users/`)
    return response.data
  },

  // Get user by ID
  getById: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`)
    return response.data
  },

  // Register new user
  register: async (userData: {
    email: string
    password: string
    name: string
    avatar?: string
  }) => {
    const response = await axios.post(`${API_BASE_URL}/users/`, userData)
    return response.data
  },

  // Login (alternative endpoint)
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password
    })
    return response.data
  },

  // Logout (alternative endpoint)
  logout: async () => {
    const response = await axios.post(`${API_BASE_URL}/users/logout`)
    return response.data
  }
}
