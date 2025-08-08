
// This file provides static, hardcoded data for the room UI.
// It does not connect to any backend or perform real operations.

export interface Message {
    id?: string;
    text: string;
    type: 'text' | 'gift' | 'game' | 'system';
    authorId?: string;
    authorName?: string;
    authorAvatar?: string;
    timestamp?: Date;
    giftIcon?: string;
    game?: string;
}

export interface SeatUser {
    id: string;
    name: string;
    avatar: string;
    isMuted: boolean;
    frame?: string;
}

export interface Seat {
    id: number;
    user: SeatUser | null;
    isLocked: boolean;
}

export interface Room {
    id?: string;
    name: string;
    type: 'audio' | 'video';
    seats: Seat[];
    ownerId: string;
    ownerName: string;
    ownerAvatar?: string;
    isLive: boolean;
    createdAt: any;
    youtubeVideoId?: string;
    thumbnail?: string;
    currentTrack?: string | null;
    isPlaying?: boolean;
    playbackTime?: number;
    activeGame?: string | null;
    gameHostId?: string | null;
}

export const getMockMessages = (): Message[] => {
    return [
        { id: '1', type: 'system', text: 'Welcome to the room!', timestamp: new Date() },
        { id: '2', type: 'text', authorId: 'user1', authorName: 'Alice', authorAvatar: 'https://placehold.co/50x50/F87171/ffffff.png?text=A', text: 'Hey everyone!', timestamp: new Date(Date.now() + 1000) },
        { id: '3', type: 'gift', authorId: 'user2', authorName: 'Bob', authorAvatar: 'https://placehold.co/50x50/34D399/ffffff.png?text=B', text: 'Sent a Heart to Alice', giftIcon: 'https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png', timestamp: new Date(Date.now() + 2000) },
    ];
};

export const getMockRoom = (roomId: string, type: 'audio' | 'video' = 'audio'): Room => {
    const seatCount = type === 'video' ? 8 : (parseInt(localStorage.getItem('ravewave-room-seats') || '16', 10));

    const mockRoom: Room = {
        id: roomId,
        name: type === 'audio' ? 'Mock Audio Room' : 'Mock Video Room',
        type: type,
        ownerId: 'mock_user_123', // Match the static user ID
        ownerName: 'The Owner',
        ownerAvatar: 'https://placehold.co/100x100/3b82f6/ffffff.png?text=O',
        isLive: true,
        createdAt: new Date(),
        currentTrack: 'https://placehold.co/1x1',
        isPlaying: true,
        youtubeVideoId: 'jfKfPfyJRdk', // Lofi Girl video for the mock room
        seats: Array.from({ length: seatCount }, (_, i) => ({ id: i + 1, user: null, isLocked: false })),
    };
    
    // Populate some seats for demonstration
    if (mockRoom.seats.length > 0) {
      mockRoom.seats[0].user = { id: 'user1', name: 'Alice', avatar: 'https://placehold.co/50x50/F87171/ffffff.png?text=A', isMuted: true, frame: 'gold' };
    }
    if (mockRoom.seats.length > 1) {
      mockRoom.seats[1].user = { id: 'user2', name: 'Bob', avatar: 'https://placehold.co/50x50/34D399/ffffff.png?text=B', isMuted: false, frame: 'purple' };
    }
    if (mockRoom.seats.length > 4) {
      mockRoom.seats[4].isLocked = true;
    }

    return mockRoom;
};
