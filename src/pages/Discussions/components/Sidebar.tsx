import { Icon } from '@iconify/react'

export default function Sidebar() {
  const menuItems = [
    { icon: 'material-symbols:home-outline', label: 'Home', active: true },
    { icon: 'material-symbols:explore-outline', label: 'Explore Topics', active: false },
    { icon: 'material-symbols:topic-outline', label: 'My Topics', active: false },
    { icon: 'material-symbols:help-outline', label: 'My Answers', active: false },
  ]

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <nav className="p-4">
        <div className="mb-8 px-4 py-2">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">MENU</h2>
        </div>
        
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                className={`flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                href="#"
              >
                <Icon className="text-xl" icon={item.icon} />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
