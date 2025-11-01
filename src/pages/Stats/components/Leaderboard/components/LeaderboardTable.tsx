import { Icon } from '@iconify/react'

import { POCKETBASE_URL } from '@/constants/server'
import { useUser } from '@/contexts/UserContext'
import { useLeaderboard } from '@/hooks'

function LeaderboardTable({
  selectedPeriod
}: {
  selectedPeriod: 'day' | 'week' | 'month'
}) {
  const { user } = useUser()
  const {
    leaderboard,
    loading: leaderboardLoading,
    error: leaderboardError
  } = useLeaderboard()

  // Transform API leaderboard data for the UI
  const transformLeaderboardData = () => {
    if (!leaderboard || leaderboard.length === 0) {
      return []
    }

    const transformedData = leaderboard.map((entry, index) => ({
      rank: index + 1,
      id: entry.user_id,
      name: entry.user_name,
      avatar: `${POCKETBASE_URL}/api/files/users/${entry.user_id}/${entry.user_avatar}`,
      durations: {
        day: entry.total_day || 0,
        week: entry.total_month * 7 || 0, // Approximate weekly total
        month: entry.total_overall || 0
      }
    }))

    // Sort based on selected period (except for 'day' which uses original order)
    if (selectedPeriod === 'week') {
      return transformedData
        .sort((a, b) => b.durations.week - a.durations.week)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1
        }))
    } else if (selectedPeriod === 'month') {
      return transformedData
        .sort((a, b) => b.durations.month - a.durations.month)
        .map((entry, index) => ({
          ...entry,
          rank: index + 1
        }))
    }

    // For 'day' period, return original order
    return transformedData
  }

  const leaderboardData = transformLeaderboardData()

  // Find current user's position in leaderboard
  const currentUserPosition = leaderboard
    ? leaderboard.findIndex(entry => entry.avatar === user?.avatar)
    : -1
  // User rank
  const currentUserRank = currentUserPosition >= 0 ? currentUserPosition + 1 : 45 // Default to 45 if not found

  // Current user data
  const currentUserData =
    currentUserPosition >= 0
      ? {
          rank: currentUserRank,
          id: user?.user_id || '',
          name: user?.username || 'You',
          avatar:
            `${POCKETBASE_URL}/api/files/users/${user?.user_id}/${user?.user_avatar}` ,
          durations: {
            day: leaderboard[currentUserPosition].total_day || 166,
            week: leaderboard[currentUserPosition].total_month * 7 || 1162,
            month: leaderboard[currentUserPosition].total_overall || 4648
          }
        }
      : {
          rank: currentUserRank,
          id: user?.id || '',
          name: user?.name || 'You',
          avatar:
            user?.avatar ||
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          durations: {
            day: 166,
            week: 1162,
            month: 4648
          }
        }

  // Check if current user is in top 30
  const isUserInTop30 = currentUserRank <= 30

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}m`
    return `${hours}h ${mins}m`
  }

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'day':
        return 'Today'
      case 'week':
        return 'This Week'
      case 'month':
        return 'This Month'
      default:
        return 'Today'
    }
  }

  return (
    <div className="overflow-x-auto">
      {leaderboardLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
          <span className="ml-3 text-gray-600">Loading leaderboard...</span>
        </div>
      ) : leaderboardError ? (
        <div className="py-12 text-center">
          <Icon
            className="mx-auto mb-4 text-4xl text-red-500"
            icon="material-symbols:error"
          />
          <p className="mb-4 text-red-600">{leaderboardError}</p>
          <button
            className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : leaderboardData.length === 0 ? (
        <div className="py-12 text-center">
          <Icon
            className="mx-auto mb-4 text-4xl text-gray-400"
            icon="material-symbols:leaderboard"
          />
          <p className="text-gray-600">No leaderboard data available yet</p>
          <p className="mt-2 text-sm text-gray-500">
            Start studying to see your ranking!
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                Rank
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                User
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                {getPeriodLabel()}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Top 30 Users */}
            {leaderboardData.map(leaderboardUser => {
              const isCurrentUser = leaderboardUser.name === user?.username
              return (
                <tr
                  key={leaderboardUser.rank}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                    isCurrentUser ? 'border-orange-200 bg-orange-50' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-sm font-bold ${
                          isCurrentUser ? 'text-orange-600' : 'text-gray-900'
                        }`}
                      >
                        #{leaderboardUser.rank}
                      </span>
                      {leaderboardUser.rank <= 3 && (
                        <Icon
                          className={`text-lg ${
                            leaderboardUser.rank === 1
                              ? 'text-yellow-500'
                              : leaderboardUser.rank === 2
                                ? 'text-gray-400'
                                : 'text-orange-600'
                          }`}
                          icon={
                            leaderboardUser.rank === 1
                              ? 'material-symbols:trophy'
                              : leaderboardUser.rank === 2
                                ? 'material-symbols:workspace-premium'
                                : 'material-symbols:military-tech'
                          }
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      {leaderboardUser.avatar.split('/').pop() ? (
                        <img
                          alt={leaderboardUser.name}
                          className="h-8 w-8 rounded-full object-cover"
                          src={leaderboardUser.avatar}
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                          <Icon
                            className="text-gray-400"
                            icon="material-symbols:person"
                          />
                        </div>
                      )}
                      <span
                        className={`font-medium ${
                          isCurrentUser ? 'text-orange-900' : 'text-gray-900'
                        }`}
                      >
                        {leaderboardUser.name}
                        {isCurrentUser && (
                          <span className="ml-2 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-800">
                            You
                          </span>
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-medium ${
                        isCurrentUser ? 'text-orange-600' : 'text-gray-900'
                      }`}
                    >
                      {formatDuration(
                        leaderboardUser.durations[
                          selectedPeriod as keyof typeof leaderboardUser.durations
                        ]
                      )}
                    </span>
                  </td>
                </tr>
              )
            })}

            {/* Current User (if not in top 30) */}
            {!isUserInTop30 && (
              <>
                {/* Separator */}
                <tr>
                  <td className="py-2" colSpan={3}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 border-t border-gray-300"></div>
                      <span className="rounded-full bg-gray-50 px-3 py-1 text-sm text-gray-500">
                        Your Position
                      </span>
                      <div className="flex-1 border-t border-gray-300"></div>
                    </div>
                  </td>
                </tr>

                {/* Current User Row */}
                <tr className="border-2 border-orange-200 bg-orange-50 transition-colors hover:bg-orange-100">
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-orange-600">
                      #{currentUserRank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-orange-300"
                        src={currentUserData.avatar}
                      />
                      <span className="font-medium text-orange-900">
                        {currentUserData.name}
                        <span className="ml-2 rounded-full bg-orange-200 px-2 py-0.5 text-xs text-orange-800">
                          You
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-orange-600">
                      {formatDuration(
                        currentUserData.durations[
                          selectedPeriod as keyof typeof currentUserData.durations
                        ]
                      )}
                    </span>
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default LeaderboardTable
