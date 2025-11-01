import { Icon } from '@iconify/react'
import RoomItem from './RoomItem'
import { useStudyRooms } from '../../../hooks/useStudyRooms'

import { POCKETBASE_URL } from '../../../constants/server'

function RoomList({
    searchQuery,
    rooms,
    loading: roomsLoading,
    error: roomsError
}: {
    searchQuery: string
    rooms: ReturnType<typeof useStudyRooms>['rooms']
    loading: ReturnType<typeof useStudyRooms>['loading']
    error: ReturnType<typeof useStudyRooms>['error']
}) {


    // Transform API rooms data for the UI
    const transformedRooms = rooms.map(room => ({
        id: parseInt(room.id),
        name: room.room_name,
        type: room.isPublic ? 'Public Room' : 'Private Room',
        participants: `${room.participants}/${room.max_participants}`, // Mock participant count for now
        duration: `${room.timing}m`, // Default duration for now
        features: ['chat', 'video'], // Default features for now
        image: room.thumbnail
            ? `${POCKETBASE_URL}/api/files/study_rooms/${room.id}/${room.thumbnail}`
            : 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        maxParticipants: room.maxParticipants,
        host: room.host
    }))

    const filteredRooms = transformedRooms.filter(
        room =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.type.toLowerCase().includes(searchQuery.toLowerCase())
    )

    if (roomsLoading) {
        return <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-600">Loading study rooms...</span>
        </div>
    }


    if (roomsError) {
        return <div className="py-12 text-center">
            <Icon
                className="mx-auto mb-4 text-4xl text-red-500"
                icon="material-symbols:error"
            />
            <p className="mb-4 text-red-600">{roomsError}</p>
            <button
                className="rounded-lg bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
                onClick={() => window.location.reload()}
            >
                Try Again
            </button>
        </div>
    }

    if (!filteredRooms || filteredRooms.length === 0) {
        return <div className="py-12 text-center">
            <Icon
                className="mx-auto mb-4 text-4xl text-gray-400"
                icon="material-symbols:meeting-room"
            />
            <p className="text-gray-600">No study rooms found</p>
            <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search or create a new room!
            </p>
        </div>
    }

    return <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map(room => (
            <RoomItem key={room.id} room={room} />
        ))}
    </div>
}

export default RoomList