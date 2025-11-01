import { Icon } from '@iconify/react'
import { useState } from 'react'

const getFeatureIcon = (feature: string) => {
  switch (feature) {
    case 'silent':
      return 'material-symbols:volume-off'
    case 'video':
      return 'material-symbols:videocam'
    case 'chat':
      return 'material-symbols:chat'
    case 'voice':
      return 'material-symbols:mic'
    case 'screen-share':
      return 'material-symbols:screen-share'
    default:
      return 'material-symbols:check'
  }
}

function RoomItem({
  room
}: {
  room: {
    id: number
    name: string
    type: string
    participants: string
    duration: string
    features: string[]
    image: string
  }
}) {
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleJoinRoom = () => {
    setShowComingSoon(true)
  }

  return (
    <>
      {/* Coming Soon Dialog */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                <Icon
                  className="text-3xl text-orange-500"
                  icon="material-symbols:construction"
                />
              </div>
            </div>
            <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
              Feature Coming Soon!
            </h3>
            <p className="mb-6 text-center text-gray-600">
              Study rooms are currently under development. Stay tuned for this exciting feature!
            </p>
            <button
              className="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600"
              onClick={() => setShowComingSoon(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <div
        key={room.id}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
      >
      {/* Room Image */}
      <div className="relative isolate h-40 bg-gray-100">
        <div className="absolute inset-0 z-[-1] flex items-center justify-center overflow-hidden">
          <Icon
            className="text-6xl text-gray-300"
            icon="material-symbols:book-2-outline-rounded"
          />
        </div>
        {room.image && (
          <img alt="" className="size-full object-cover" src={room.image} />
        )}
        {/* Room Stats Overlay */}
        <div className="absolute bottom-3 left-3 flex space-x-2">
          <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
            <Icon className="text-sm" icon="material-symbols:person" />
            <span>{room.participants.split(',').length}</span>
          </div>
          <div className="flex items-center space-x-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
            <Icon className="text-sm" icon="material-symbols:schedule" />
            <span>{room.duration}</span>
          </div>
          {room.features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center rounded bg-black/70 px-2 py-1 text-xs text-white"
            >
              <Icon className="text-sm" icon={getFeatureIcon(feature)} />
            </div>
          ))}
        </div>
      </div>

        {/* Room Info */}
        <div className="p-4">
          <h3 className="mb-1 font-semibold text-gray-900">{room.name}</h3>
          <p className="mb-4 text-sm text-gray-500">{room.type}</p>

          <button
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600"
            onClick={handleJoinRoom}
          >
            <Icon className="text-lg" icon="material-symbols:login" />
            <span>Join Room</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default RoomItem
