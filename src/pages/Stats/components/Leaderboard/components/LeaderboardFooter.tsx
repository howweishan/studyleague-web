import { Icon } from '@iconify/react'

const PLACES = {
  '1st': {
    color: 'text-yellow-500',
    icon: 'material-symbols:trophy'
  },
  '2nd': {
    color: 'text-gray-400',
    icon: 'material-symbols:workspace-premium'
  },
  '3rd': {
    color: 'text-orange-600',
    icon: 'material-symbols:military-tech'
  }
}

function LeaderboardFooter() {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-4 text-sm text-gray-500 sm:flex-row">
      <span>Showing top 30 users</span>
      <div className="flex items-center space-x-4">
        {Object.entries(PLACES).map(([place, { color, icon }]) => (
          <div key={place} className="flex items-center space-x-2">
            <Icon className={color} icon={icon} />
            <span>{place} Place</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardFooter
