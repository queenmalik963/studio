
import { Gift } from '@/components/room/GiftPanel';
// This file has been modified to remove all Firebase dependencies.
// The functions now return mocked success states or data to allow UI flow.

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
    // Audio/Video Playback State
    currentTrack?: string | null;
    isPlaying?: boolean;
    playbackTime?: number;
    // Game State
    activeGame?: string | null;
    gameHostId?: string | null;
}

// Mock function to create a new room
export const createRoom = async (roomDetails: Partial<Omit<Room, 'createdAt' | 'isLive' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'id' | 'seats'>> & { seats: number }): Promise<{ success: boolean; roomId: string | null; error: string | null; }> => {
    console.log("Mock creating room:", roomDetails);
    // Store seat count in local storage to pass to the room page
    localStorage.setItem('ravewave-room-seats', String(roomDetails.seats));
    return { success: true, roomId: `mock_room_${Date.now()}`, error: null };
}

// Mock function to send a message
export const sendMessage = async (roomId: string, message: Message): Promise<{ success: boolean; error: string | null; }> => {
    console.log(`Mock sending message to room ${roomId}:`, message);
    return { success: true, error: null };
};

// Mock function to listen to messages
export const listenToMessages = (roomId: string, callback: (messages: Message[]) => void) => {
    console.log(`Mock listening to messages in room ${roomId}`);
    const mockMessages: Message[] = [
        { id: '1', type: 'system', text: 'Welcome to the room!', timestamp: new Date() },
        { id: '2', type: 'text', authorId: 'user1', authorName: 'Alice', authorAvatar: 'https://placehold.co/50x50/F87171/ffffff.png?text=A', text: 'Hey everyone!', timestamp: new Date(Date.now() + 1000) },
        { id: '3', type: 'gift', authorId: 'user2', authorName: 'Bob', authorAvatar: 'https://placehold.co/50x50/34D399/ffffff.png?text=B', text: 'Sent a Heart to Alice', giftIcon: 'https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png', timestamp: new Date(Date.now() + 2000) },
    ];
    callback(mockMessages);
    // Return a dummy unsubscribe function
    return () => console.log(`Stopped listening to messages in room ${roomId}`);
};

// Mock function to listen to the room document
export const listenToRoom = (roomId: string, callback: (room: Room | null) => void) => {
    console.log(`Mock listening to room ${roomId}`);
    
    // Retrieve seat count from local storage, default to 8 if not found
    const numberOfSeats = parseInt(localStorage.getItem('ravewave-room-seats') || '8', 10);
    
    const mockRoom: Room = {
        id: roomId,
        name: 'Mock Audio Room',
        type: 'audio',
        ownerId: 'mock_owner',
        ownerName: 'The Owner',
        ownerAvatar: 'https://placehold.co/100x100/3b82f6/ffffff.png?text=O',
        isLive: true,
        createdAt: new Date(),
        currentTrack: 'https://placehold.co/1x1', // Placeholder to enable controls
        isPlaying: true,
        seats: Array.from({ length: numberOfSeats }, (_, i) => ({ id: i + 1, user: null, isLocked: false })),
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
    
    callback(mockRoom);
    return () => console.log(`Stopped listening to room ${roomId}`);
};

// Mock function to take a seat
export const takeSeat = async (roomId: string, seatId: number, user: SeatUser) => {
    console.log(`Mock user ${user.name} taking seat ${seatId} in room ${roomId}`);
    return { success: true };
};

// Mock function to leave a seat
export const leaveSeat = async (roomId: string, seatId: number) => {
    console.log(`Mock leaving seat ${seatId} in room ${roomId}`);
    return { success: true };
};

// Mock function to update a user's seat properties
export const updateSeatUser = async (roomId: string, seatId: number, updates: Partial<SeatUser>) => {
    console.log(`Mock updating seat ${seatId} in room ${roomId} with`, updates);
    return { success: true };
};

// Mock function for owner to manage seats
export const updateSeatAsOwner = async (roomId: string, seatId: number, updates: Partial<Pick<Seat, 'isLocked' | 'user'>>) => {
    console.log(`Mock owner updating seat ${seatId} in room ${roomId} with`, updates);
    return { success: true };
};

// Mock function to update the playback or game state
export const updatePlaybackState = async (roomId: string, state: Partial<Pick<Room, 'currentTrack' | 'isPlaying' | 'playbackTime' | 'activeGame' | 'gameHostId'>>) => {
    console.log(`Mock updating playback state for room ${roomId}:`, state);
    return { success: true };
};

export const endCurrentGame = async (roomId: string) => {
    console.log(`Mock ending game in room ${roomId}`);
    return { success: true };
};

// Mock function to send a gift
export const sendGift = async (
    roomId: string,
    sender: SeatUser,
    recipientId: string,
    recipientName: string,
    gift: Gift,
    quantity: number
): Promise<{ success: boolean; error?: string }> => {
    console.log(`Mock sending ${quantity}x ${gift.name} from ${sender.name} to ${recipientName} in room ${roomId}`);
    return { success: true };
};
