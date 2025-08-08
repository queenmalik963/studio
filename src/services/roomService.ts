
// This file provides types and a simplified creator for the room UI.
// All mock data has been removed to prevent client-side errors and allow for dynamic content.

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
    currentTrack?: string | null;
    isPlaying?: boolean;
    playbackTime?: number;
    activeGame?: string | null;
    gameHostId?: string | null;
}

// Mock function to create a room. This no longer returns a full room object.
// It just simulates a successful creation and returns a new ID.
export const createRoom = async (roomData: Partial<Room>): Promise<{ success: boolean; roomId?: string; error?: string }> => {
    console.log('Static: Creating room with data:', roomData);
    const newRoomId = `room-${Date.now()}`;
    return { success: true, roomId: newRoomId };
};

// Mock function to send a message
export const sendMessage = async (roomId: string, message: Message): Promise<{ success: boolean; error?: string }> => {
    console.log(`Static: Sending message to room ${roomId}:`, message.text);
    // In a real app, this would send data to a backend.
    // Here, it does nothing but log and return success.
    return { success: true };
}
