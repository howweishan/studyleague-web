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
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      iconBg: 'bg-green-500',
      icon: 'material-symbols:avg-time'
    },
    {
      label: 'Total Sessions (7 days)',
      value: statistics?.sessions_last_7_days?.toString() || '0',
      trend: '',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      iconBg: 'bg-blue-500',
      icon: 'material-symbols:counter-1'
    },
    {
      label: 'Current Streak',
      value: `${statistics?.study_streak_days || 0} days`,
      trend: '',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      iconBg: 'bg-orange-500',
      icon: 'material-symbols:local-fire-department'
    },
    {
      label: 'Overall Total',
      value: dayjs.duration(overallMinutes, 'minutes').format('H[h] m[m]'),
      trend: '',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      iconBg: 'bg-purple-500',
      icon: 'material-symbols:query-stats'
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
        <div className="group relative overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-orange-200 opacity-50"></div>
          <div className="relative">
            <div className="mb-3 flex items-center space-x-2">
              <div className="rounded-lg bg-orange-500 p-2">
                <Icon className="text-xl text-white" icon="material-symbols:today" />
              </div>
              <h3 className="text-sm font-semibold text-orange-700">Today</h3>
            </div>
            <div className="mb-2 text-3xl font-bold text-orange-900">
              {dayjs.duration(todayMinutes, 'minutes').format('H[h] m[m]')}
            </div>
            <div className="text-sm text-orange-600">
              {todayMinutes} minutes total
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-200 opacity-50"></div>
          <div className="relative">
            <div className="mb-3 flex items-center space-x-2">
              <div className="rounded-lg bg-blue-500 p-2">
                <Icon className="text-xl text-white" icon="material-symbols:view-week" />
              </div>
              <h3 className="text-sm font-semibold text-blue-700">This Week</h3>
            </div>
            <div className="mb-2 text-3xl font-bold text-blue-900">
              {dayjs.duration(weekMinutes, 'minutes').format('H[h] m[m]')}
            </div>
            <div className="text-sm text-blue-600">
              {weekMinutes} minutes total
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-200 opacity-50"></div>
          <div className="relative">
            <div className="mb-3 flex items-center space-x-2">
              <div className="rounded-lg bg-purple-500 p-2">
                <Icon className="text-xl text-white" icon="material-symbols:calendar-month" />
              </div>
              <h3 className="text-sm font-semibold text-purple-700">This Month</h3>
            </div>
            <div className="mb-2 text-3xl font-bold text-purple-900">
              {dayjs.duration(monthMinutes, 'minutes').format('H[h] m[m]')}
            </div>
            <div className="text-sm text-purple-600">
              {monthMinutes} minutes total
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row - Audience Metrics and Device Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Audience Metrics */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 p-2">
                <Icon className="text-2xl text-white" icon="material-symbols:analytics" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Daily Metrics
              </h3>
            </div>
            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Icon className="text-xl" icon="material-symbols:more-horiz" />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dailyMetrics.map((metric, index) => (
              <div key={index} className={`group rounded-xl ${metric.bgColor} p-4 transition-all hover:scale-105 hover:shadow-md`}>
                <div className="mb-3 flex items-center justify-between">
                  <div className={`rounded-lg ${metric.iconBg} p-2`}>
                    <Icon className="text-lg text-white" icon={metric.icon} />
                  </div>
                  <span className={`text-xs font-medium ${metric.color}`}>
                    {metric.trend}
                  </span>
                </div>
                <div className={`mb-1 text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-600">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics by Device Type */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 p-2">
                <Icon className="text-2xl text-white" icon="material-symbols:schedule" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Analytics by Time
              </h3>
            </div>
            <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <Icon className="text-xl" icon="material-symbols:more-horiz" />
            </button>
          </div>

          {/* Time Breakdown */}
          <div className="space-y-4">
            {timeData.map((item, index) => (
              <div key={index} className="space-y-2 rounded-lg bg-gray-50 p-3 transition-all hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-3 w-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-semibold text-gray-700">
                      {item.device}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      {item.percentage}%
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      ({dayjs.duration(item.minutes, 'minutes').format('H[h] m[m]')})
                    </span>
                  </div>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`${item.color} h-3 rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${item.percentage}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
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
