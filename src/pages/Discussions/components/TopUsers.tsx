import { Icon } from '@iconify/react'

interface TopUser {
  id: string
  name: string
  points: string
  avatar: string
  trend: 'up' | 'down'
}

export default function TopUsers() {
  const topUsers: TopUser[] = [
    { id: '1', name: 'Rajan H', points: '16.5k', avatar: '', trend: 'up' },
    { id: '2', name: 'Siris M', points: '12.8k', avatar: '', trend: 'up' },
    { id: '3', name: 'Aakash D', points: '2.5k', avatar: '', trend: 'up' },
    { id: '4', name: 'Nitschel K', points: '2.2k', avatar: '', trend: 'up' },
    { id: '5', name: 'Kishor K', points: '1.3k', avatar: '', trend: 'up' },
    { id: '6', name: 'You (s50)', points: '57', avatar: '', trend: 'up' },
  ]

  const links = [
    { label: 'Help', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Forume Pro', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Topics', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Top Topics', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Advertise', href: '#' },
  ]

  return (
    <aside className="flex w-80 flex-col border-l border-gray-200 bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Top Users</h2>
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-400 to-indigo-600"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.points}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {user.trend === 'up' && (
                  <Icon className="text-green-500" icon="material-symbols:trending-up" />
                )}
                {index < 3 && (
                  <span className="text-xs font-semibold text-gray-400">#{index + 1}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Merch Banner */}
        <div className="mt-8 rounded-lg bg-linear-to-br from-blue-50 to-indigo-50 p-6">
          <div className="mb-4 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
              <div className="text-6xl">📚</div>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900">New Merch Available</h3>
            <p className="mb-4 text-sm text-gray-600">
              Check out our new merchandise collection
            </p>
          </div>
          <button className="w-full rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600">
            <div className="flex items-center justify-center space-x-2">
              <Icon icon="material-symbols:shopping-bag-outline" />
              <span>Go to Store</span>
            </div>
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-500">
          {links.map((link, index) => (
            <span key={index}>
              <a className="hover:text-indigo-600 transition-colors" href={link.href}>
                {link.label}
              </a>
              {index < links.length - 1 && <span className="ml-3 text-gray-300">•</span>}
            </span>
          ))}
        </div>
      </div>
    </aside>
  )
}
