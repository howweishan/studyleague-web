import { Icon } from '@iconify/react'
import dayjs from 'dayjs'

import Leaderboard from './components/Leaderboard'
import { useUser } from '../../contexts/UserContext'
import { useStatistics } from '../../hooks/useStatistics'

export default function Stats() {
  const { user } = useUser()
  const { statistics, loading } = useStatistics(user?.id)

  // Calculate metrics from statistics
  const todayMinutes = statistics?.total_today || 0
  const weekMinutes = statistics?.total_week || 0
  const monthMinutes = statistics?.total_month || 0
  const overallMinutes = statistics?.total_overall || 0

  // Calculate average duration (total / sessions in last 7 days)
  const avgDurationMinutes = statistics?.sessions_last_7_days 
    ? Math.round(statistics.total_study_last_7_days / statistics.sessions_last_7_days)
    : 0

  const dailyMetrics = [
    {
      label: 'Average Duration',
      value: dayjs.duration(avgDurationMinutes, 'minutes').format('H[h] m[m]'),
      trend: '',
      color: 'text-green-600'
    },
    {
      label: 'Total Sessions (7 days)',
      value: statistics?.sessions_last_7_days?.toString() || '0',
      trend: '',
      color: 'text-green-600'
    },
    {
      label: 'Current Streak',
      value: `${statistics?.study_streak_days || 0} days`,
      trend: '',
      color: 'text-green-600'
    },
    {
      label: 'Overall Total',
      value: dayjs.duration(overallMinutes, 'minutes').format('H[h] m[m]'),
      trend: '',
      color: 'text-green-600'
    }
  ]

  // Calculate time distribution percentages
  const workTime = statistics?.total_work_time || 0
  const offworkTime = statistics?.total_offwork_time || 0
  const weekdaysTime = statistics?.total_weekdays || 0
  const weekendsTime = statistics?.total_weekends || 0
  const totalTime = workTime + offworkTime || 1 // Avoid division by zero

  const timeData = [
    { 
      device: 'Work Time', 
      percentage: Math.round((workTime / totalTime) * 100), 
      color: 'bg-purple-400',
      minutes: workTime
    },
    { 
      device: 'Off-work Time', 
      percentage: Math.round((offworkTime / totalTime) * 100), 
      color: 'bg-green-400',
      minutes: offworkTime
    },
    { 
      device: 'Weekdays', 
      percentage: Math.round((weekdaysTime / totalTime) * 100), 
      color: 'bg-orange-400',
      minutes: weekdaysTime
    },
    { 
      device: 'Weekends', 
      percentage: Math.round((weekendsTime / totalTime) * 100), 
      color: 'bg-blue-400',
      minutes: weekendsTime
    }
  ]

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Icon className="animate-spin text-4xl text-gray-400" icon="material-symbols:progress-activity" />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Stats</h1>
        <p className="text-gray-600">Your Overall Performance in a Glance</p>
      </div>

      {/* Performance Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">Today</h3>
          <div className="mb-2 text-3xl font-bold text-gray-900">
            {dayjs.duration(todayMinutes, 'minutes').format('H[h] m[m]')}
          </div>
          <div className="text-sm text-gray-500">
            {todayMinutes} minutes total
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">This Week</h3>
          <div className="mb-2 text-3xl font-bold text-gray-900">
            {dayjs.duration(weekMinutes, 'minutes').format('H[h] m[m]')}
          </div>
          <div className="text-sm text-gray-500">
            {weekMinutes} minutes total
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">This Month</h3>
          <div className="mb-2 text-3xl font-bold text-gray-900">
            {dayjs.duration(monthMinutes, 'minutes').format('H[h] m[m]')}
          </div>
          <div className="text-sm text-gray-500">
            {monthMinutes} minutes total
          </div>
        </div>
      </div>

      {/* Bottom Row - Audience Metrics and Device Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Audience Metrics */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Daily Metrics
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Icon className="text-xl" icon="material-symbols:more-horiz" />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {dailyMetrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="mb-1 text-2xl font-bold text-gray-900">
                  {metric.value}
                  <span className={`ml-2 text-sm font-normal ${metric.color}`}>
                    {metric.trend}
                  </span>
                </div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics by Device Type */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Analytics by Time
            </h3>
            <button className="text-gray-400 hover:text-gray-600">
              <Icon className="text-xl" icon="material-symbols:more-horiz" />
            </button>
          </div>

          {/* Time Breakdown */}
          <div className="space-y-4">
            {timeData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.device}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({dayjs.duration(item.minutes, 'minutes').format('H[h] m[m]')})
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Leaderboard />
    </div>
  )
}
