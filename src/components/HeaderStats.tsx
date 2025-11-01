import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { useNavbar } from '@/contexts/NavbarContext'
import { useUser } from '@/contexts/UserContext'
import { useStatistics } from '@/hooks/useStatistics'
import { useStudyTargets } from '@/hooks/useStudyTargets'
import { useLeaderboard } from '@/hooks/useLeaderboard'

dayjs.extend(duration)

export default function HeaderStats() {
  const { toggleNavbar } = useNavbar()
  const { user } = useUser()
  const { statistics, loading: statsLoading } = useStatistics(user?.user_id)
  const { targets, loading: targetsLoading } = useStudyTargets()
  const { leaderboard, loading: leaderboardLoading } = useLeaderboard()

  // Calculate remaining time for daily target
  const dailyTargetMinutes = (targets?.dailyTarget || targets?.daily_target || 2) * 60
  const todayMinutes = statistics?.total_today || 0
  const remainingMinutes = Math.max(0, dailyTargetMinutes - todayMinutes)
  const remainingTime = dayjs.duration(remainingMinutes, 'minutes').format('H [Hr] mm [min]')

  // Get user's rank from leaderboard
  const userRank = leaderboard.findIndex(entry => entry.user_id === user?.user_id) + 1
  const totalUsers = leaderboard.length

  // Get weekly and monthly totals (convert minutes to hours for display)
  const weeklyHours = Math.floor((statistics?.total_week || 0) / 60)
  const monthlyTime = dayjs.duration(statistics?.total_month || 0, 'minutes').format('H [Hr] mm [min]')

  return (
    <>
      <nav className="flex w-full items-center justify-between gap-8 border-b border-gray-200 bg-white px-6 py-4">
        {/* Left side - Daily Goal */}
        <div className="flex min-w-0 items-center gap-4">
          <button className="md:hidden" onClick={toggleNavbar}>
            <Icon
              className="text-2xl text-gray-300"
              icon="material-symbols:menu"
            />
          </button>
          <img
            alt="Study League Logo"
            className="h-12 md:hidden"
            src="/logo.svg"
          />
          <div className="hidden min-w-0 items-center space-x-2 rounded-lg bg-orange-100 px-4 py-2 md:flex">
            <Icon
              className="shrink-0 text-lg text-orange-500"
              icon="material-symbols:star"
            />
            <span className="min-w-0 truncate text-sm font-medium text-orange-700">
              {statsLoading || targetsLoading ? 'Loading...' : 
                remainingMinutes > 0 ? `${remainingTime} to go today!` : 'Daily goal completed! 🎉'}
            </span>
          </div>
        </div>

        <div className="hidden min-w-0 items-center space-x-2 rounded-lg bg-orange-100 px-4 py-2 sm:flex md:hidden">
          <Icon
            className="shrink-0 text-lg text-orange-500"
            icon="material-symbols:star"
          />
          <span className="min-w-0 truncate text-sm font-medium text-orange-700">
            {statsLoading || targetsLoading ? 'Loading...' : 
              remainingMinutes > 0 ? `${remainingTime} to go today!` : '🎉 Daily goal completed!'}
          </span>
        </div>

        <div className="hidden shrink-0 items-center space-x-8 md:flex">
          {/* Global Rank */}
          <div className="hidden items-center space-x-2 lg:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <Icon
                className="text-lg text-yellow-600"
                icon="material-symbols:trophy"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {leaderboardLoading ? '...' : userRank > 0 ? `${userRank} / ${totalUsers}` : 'N/A'}
              </div>
              <div className="text-xs text-gray-500">Global Rank</div>
            </div>
          </div>

          {/* This Week */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Icon
                className="text-lg text-blue-600"
                icon="material-symbols:schedule"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {statsLoading ? '...' : `${weeklyHours} Hr`}
              </div>
              <div className="text-xs text-gray-500">This week</div>
            </div>
          </div>

          {/* This Month */}
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
              <Icon
                className="text-lg text-purple-600"
                icon="material-symbols:calendar-month"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900">
                {statsLoading ? '...' : monthlyTime}
              </div>
              <div className="text-xs text-gray-500">This month</div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
