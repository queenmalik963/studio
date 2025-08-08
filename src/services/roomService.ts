
// This file provides types and mock data for the room UI.
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
    id: string;
    name: string;
    type: 'audio' | 'video';
    thumbnail: string;
    thumbnailHint: string;
    isPlaying: boolean;
    progress: number;
    seats: Seat[];
    ownerId: string;
    ownerName: string;
    ownerAvatar?: string;
    isLive: boolean;
    youtubeVideoId?: string;
    currentTrack?: string | null;
    playbackTime?: number;
    activeGame?: string | null;
    gameHostId?: string | null;
    users: SeatUser[]; // Added to simplify homepage card
}


// --- Mock Data Generation ---

const mockUsers: SeatUser[] = [
    { id: 'user1', name: 'Amara', avatar: 'https://placehold.co/100x100/f472b6/ffffff.png?text=A', isMuted: false, frame: 'pink' },
    { id: 'user2', name: 'Bilal', avatar: 'https://placehold.co/100x100/60a5fa/ffffff.png?text=B', isMuted: true, frame: 'blue' },
    { id: 'user3', name: 'Fatima', avatar: 'https://placehold.co/100x100/34d399/ffffff.png?text=F', isMuted: false, frame: 'green' },
    { id: 'user4', name: 'Daniyal', avatar: 'https://placehold.co/100x100/f97316/ffffff.png?text=D', isMuted: false, frame: 'orange' },
    { id: 'user5', name: 'Sana', avatar: 'https://placehold.co/100x100/8b5cf6/ffffff.png?text=S', isMuted: false, frame: 'purple' },
];

const mockAudioRooms: Room[] = [
    { 
        id: 'audio1', 
        name: 'Lofi Beats to Relax/Study to', 
        type: 'audio', 
        thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
        thumbnailHint: 'lofi anime girl',
        isPlaying: true, 
        progress: 70, 
        ownerId: 'owner1', 
        ownerName: 'Lofi Girl', 
        isLive: true,
        users: mockUsers.slice(0, 4),
        seats: [],
    },
    { 
        id: 'audio2', 
        name: 'Late Night Ghazals', 
        type: 'audio', 
        thumbnail: 'https://placehold.co/600x400/1e293b/ffffff.png',
        thumbnailHint: 'moonlit night',
        isPlaying: true, 
        progress: 40, 
        ownerId: 'owner2', 
        ownerName: 'Ghazal Maestro', 
        isLive: true,
        users: mockUsers.slice(2, 5),
        seats: [],
    },
];

const mockVideoRooms: Room[] = [
     { 
        id: 'video1', 
        name: 'Chill Vibes & Funny Clips', 
        type: 'video', 
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', // A classic
        thumbnailHint: 'man singing',
        isPlaying: true, 
        progress: 25, 
        ownerId: 'owner3', 
        ownerName: 'Meme Lord', 
        isLive: true,
        users: mockUsers,
        seats: [],
    },
     { 
        id: 'video2', 
        name: 'Movie Night: Interstellar', 
        type: 'video', 
        thumbnail: 'https://i.ytimg.com/vi/zSWdZVtXT7E/maxresdefault.jpg',
        thumbnailHint: 'space galaxy',
        isPlaying: false, 
        progress: 80, 
        ownerId: 'owner4', 
        ownerName: 'Cinema Club', 
        isLive: true,
        users: mockUsers.slice(0, 2),
        seats: [],
    },
];


export const getMockAudioRooms = () => mockAudioRooms;
export const getMockVideoRooms = () => mockVideoRooms;

export const getInitialSeats = (count: number): Seat[] => {
    const seats = Array.from({ length: count }, (_, i) => ({ id: i + 1, user: null, isLocked: false }));
    // Populate some seats with mock users
    for (let i = 0; i < mockUsers.length && i < count; i++) {
        seats[i].user = mockUsers[i];
    }
    return seats;
};


export const createRoom = async (roomData: Partial<Room>): Promise<{ success: boolean; roomId?: string; error?: string }> => {
    console.log('Static: Creating room with data:', roomData);
    const newRoomId = `room-${Date.now()}`;
    return { success: true, roomId: newRoomId };
};

export const sendMessage = async (roomId: string, message: Message): Promise<{ success: boolean; error?: string }> => {
    console.log(`Static: Sending message to room ${roomId}:`, message.text);
    return { success: true };
}
