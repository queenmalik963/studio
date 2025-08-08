
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
    nameColor?: string;
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
    { id: 'user1', name: 'Qurban', avatar: 'https://i.imgur.com/pULAwYc.jpeg', isMuted: false, frame: 'gold', nameColor: 'text-yellow-300' },
    { id: 'user2', name: 'Relax DS', avatar: 'https://i.imgur.com/UQJVxdD.jpeg', isMuted: true, frame: 'blue', nameColor: 'text-sky-400' },
    { id: 'user3', name: 'Enzo DS', avatar: 'https://i.imgur.com/7F1cQNN.jpeg', isMuted: false, frame: 'red', nameColor: 'text-red-400' },
    { id: 'user4', name: 'Malik DS', avatar: 'https://i.imgur.com/4oX3QKg.jpeg', isMuted: false, frame: 'green', nameColor: 'text-green-400' },
    { id: 'user5', name: 'Queen DS', avatar: 'https://i.imgur.com/HJuL35g.jpeg', isMuted: false, frame: 'purple', nameColor: 'text-fuchsia-400' },
    { id: 'user6', name: 'Stylish', avatar: 'https://i.imgur.com/5rDea4p.jpeg', isMuted: false, frame: 'pink', nameColor: 'text-pink-400' },
    { id: 'user7', name: 'Jannat', avatar: 'https://i.imgur.com/mq7Lhkh.jpeg', isMuted: false, frame: 'cyan', nameColor: 'text-cyan-400' },
    { id: 'user8', name: 'Alphabet', avatar: 'https://i.imgur.com/49YdWPX.jpeg', isMuted: false, frame: 'teal', nameColor: 'text-teal-300' },
    { id: 'user9', name: 'Hania', avatar: 'https://i.imgur.com/gpr9VWo.jpeg', isMuted: false, frame: 'orange', nameColor: 'text-orange-400' },
    { id: 'user10', name: 'Angel', avatar: 'https://i.imgur.com/04Gxemy.jpeg', isMuted: false, frame: 'rose', nameColor: 'text-rose-400' },
    { id: 'user11', name: 'Bela', avatar: 'https://i.imgur.com/kGVBSwW.jpeg', isMuted: false, frame: 'amber', nameColor: 'text-amber-400' },
    { id: 'user12', name: 'Phocki', avatar: 'https://i.imgur.com/pK3YSUK.jpeg', isMuted: false, frame: 'lime', nameColor: 'text-lime-400' },
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
        ownerId: 'mock_user_123', 
        ownerName: 'Rave King', 
        ownerAvatar: 'https://placehold.co/100x100/8b5cf6/ffffff.png?text=RK',
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
        users: mockUsers.slice(4, 8),
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
        ownerId: 'mock_user_123', 
        ownerName: 'Rave King',
        ownerAvatar: 'https://placehold.co/100x100/8b5cf6/ffffff.png?text=RK',
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
        users: mockUsers.slice(0, 5),
        seats: [],
    },
];


export const getMockAudioRooms = () => mockAudioRooms;
export const getMockVideoRooms = () => mockVideoRooms;

export const getRoomById = (roomId: string): Room | undefined => {
    return [...mockAudioRooms, ...mockVideoRooms].find(room => room.id === roomId);
}

export const getInitialSeats = (count: number): Seat[] => {
    const seats = Array.from({ length: count }, (_, i) => ({ id: i + 1, user: null, isLocked: false }));
    
    // Distribute users: Boys in the first row (assuming 4 seats per row), Girls after.
    const boys = mockUsers.filter(u => ['Qurban', 'Relax DS', 'Enzo DS', 'Malik DS'].includes(u.name));
    const girls = mockUsers.filter(u => !boys.some(b => b.id === u.id));

    let seatIndex = 0;

    // Place boys, up to the seat count
    for (const user of boys) {
        if (seatIndex < count) {
            seats[seatIndex].user = user;
            seatIndex++;
        }
    }
    
    // To ensure girls are on the next row, we can skip seats if needed.
    // This logic is simple and might need adjustment for different row sizes.
    // For now, it will just fill seats sequentially.
    let girlStartIndex = 4; // Start girls on the 5th seat for Audio room (next row)
    if (count === 8) { // For video room, start on the 5th seat
        girlStartIndex = 4;
    }
    
    seatIndex = girlStartIndex;

    // Place girls, up to the seat count
    for (const user of girls) {
        if (seatIndex < count) {
            seats[seatIndex].user = user;
            seatIndex++;
        }
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
