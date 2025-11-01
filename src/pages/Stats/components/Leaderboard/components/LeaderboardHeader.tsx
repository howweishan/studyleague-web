function LeaderboardHeader({
  selectedPeriod,
  setSelectedPeriod
}: {
  selectedPeriod: 'day' | 'week' | 'month'
  setSelectedPeriod: (period: 'day' | 'week' | 'month') => void
}) {
  return (
    <header className="mb-6 flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
      <div className="w-full">
        <h3 className="text-lg font-semibold text-gray-900">Leaderboard</h3>
        <p className="text-sm text-gray-500">
          Top performers in the Study League
        </p>
      </div>
      {/* Period Selector */}
      <div className="flex w-full items-center space-x-1 rounded-lg bg-gray-100 p-1 sm:w-auto">
        {(['day', 'week', 'month'] as const).map(period => (
          <button
            key={period}
            className={`flex-1 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => setSelectedPeriod(period)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>
    </header>
  )
}

export default LeaderboardHeader
