import { useState } from 'react'

import LeaderboardFooter from './components/LeaderboardFooter'
import LeaderboardHeader from './components/LeaderboardHeader'
import LeaderboardTable from './components/LeaderboardTable'

function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    'day' | 'week' | 'month'
  >('day')

  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
      <LeaderboardHeader
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
      />
      <LeaderboardTable selectedPeriod={selectedPeriod} />
      <LeaderboardFooter />
    </div>
  )
}

export default Leaderboard
