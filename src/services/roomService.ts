
import { collection, doc, setDoc, getDoc, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface Message {
    id?: string;
    text: string;
    type: 'text' | 'gift' | 'game' | 'system';
    authorId?: string;
    authorName?: string;
    authorAvatar?: string;
    timestamp?: any; // Can be Date or FieldValue
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
    seats: number;
    ownerId: string;
    ownerName: string;
    ownerAvatar?: string;
    isLive: boolean;
    currentTrackUrl?: string | null;
    isPlaying?: boolean;
    playbackTime?: number;
    activeGame?: string | null;
    gameHostId?: string | null;
    // These fields are for listing and not stored in the main room doc
    thumbnail?: string;
    thumbnailHint?: string;
    users?: SeatUser[]; 
    progress?: number;
}


// --- REALTIME FIREBASE FUNCTIONS ---

export const createRoom = async (roomData: Pick<Room, 'name' | 'type' | 'seats' | 'ownerId' | 'ownerName' | 'ownerAvatar'>): Promise<{ success: boolean; roomId?: string; error?: string }> => {
    try {
        const newRoomRef = doc(collection(db, "rooms"));
        const newRoom: Omit<Room, 'id'> = {
            name: roomData.name,
            type: roomData.type,
            seats: roomData.seats,
            ownerId: roomData.ownerId,
            ownerName: roomData.ownerName,
            ownerAvatar: roomData.ownerAvatar,
            isLive: true,
            currentTrackUrl: null,
            isPlaying: false,
            playbackTime: 0,
            activeGame: null,
            gameHostId: null,
        };
        await setDoc(newRoomRef, newRoom);
        console.log("Room created with ID: ", newRoomRef.id);
        return { success: true, roomId: newRoomRef.id };
    } catch (error: any) {
        console.error("Error creating room: ", error);
        return { success: false, error: error.message };
    }
};

export const getRoomById = async (roomId: string): Promise<Room | null> => {
    try {
        const roomRef = doc(db, 'rooms', roomId);
        const roomSnap = await getDoc(roomRef);
        if (roomSnap.exists()) {
            return { id: roomSnap.id, ...roomSnap.data() } as Room;
        } else {
            console.log("No such room document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching room: ", error);
        return null;
    }
};

export const sendMessage = async (roomId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<{ success: boolean; error?: string }> => {
    try {
        const messagesRef = collection(db, 'rooms', roomId, 'messages');
        await addDoc(messagesRef, {
            ...message,
            timestamp: serverTimestamp(),
        });
        return { success: true };
    } catch (error: any) {
        console.error("Error sending message: ", error);
        return { success: false, error: error.message };
    }
}

// This function will now be handled inside the components with real-time listeners.
// Leaving this structure for reference and potential future use if needed.
export const getInitialSeats = async (roomId: string, count: number): Promise<Seat[]> => {
     // In a real app, you'd fetch seat state from Firestore.
     // For now, we return empty seats and let the component populate it.
    return Array.from({ length: count }, (_, i) => ({ id: i + 1, user: null, isLocked: false }));
};


// --- MOCK DATA FOR LISTING PAGES (Can be replaced with real backend calls) ---
const mockUsersList: SeatUser[] = [
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


const mockAudioRooms: (Room & { thumbnail: string, thumbnailHint: string, users: SeatUser[], progress: number })[] = [
    { 
        id: 'audio1', 
        name: 'Lofi Beats to Relax/Study to', 
        type: 'audio', 
        seats: 16,
        thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
        thumbnailHint: 'lofi anime girl',
        isPlaying: true, 
        progress: 70, 
        ownerId: 'mock_user_123', 
        ownerName: 'Rave King', 
        ownerAvatar: 'https://placehold.co/100x100/8b5cf6/ffffff.png?text=RK',
        isLive: true,
        users: mockUsersList.slice(0, 4),
    },
    { 
        id: 'audio2', 
        name: 'Late Night Ghazals', 
        type: 'audio',
        seats: 16, 
        thumbnail: 'https://placehold.co/600x400/1e293b/ffffff.png',
        thumbnailHint: 'moonlit night',
        isPlaying: true, 
        progress: 40, 
        ownerId: 'owner2', 
        ownerName: 'Ghazal Maestro', 
        isLive: true,
        users: mockUsersList.slice(4, 8),
    },
];

const mockVideoRooms: (Room & { thumbnail: string, thumbnailHint: string, users: SeatUser[], progress: number })[] = [
     { 
        id: 'video1', 
        name: 'Chill Vibes & Funny Clips', 
        type: 'video', 
        seats: 8,
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', // A classic
        thumbnailHint: 'man singing',
        isPlaying: true, 
        progress: 25, 
        ownerId: 'mock_user_123', 
        ownerName: 'Rave King',
        ownerAvatar: 'https://placehold.co/100x100/8b5cf6/ffffff.png?text=RK',
        isLive: true,
        users: mockUsersList,
    },
     { 
        id: 'video2', 
        name: 'Movie Night: Interstellar', 
        type: 'video', 
        seats: 8,
        thumbnail: 'https://i.ytimg.com/vi/zSWdZVtXT7E/maxresdefault.jpg',
        thumbnailHint: 'space galaxy',
        isPlaying: false, 
        progress: 80, 
        ownerId: 'owner4', 
        ownerName: 'Cinema Club', 
        isLive: true,
        users: mockUsersList.slice(0, 5),
    },
];


export const getMockAudioRooms = () => mockAudioRooms;
export const getMockVideoRooms = () => mockVideoRooms;

export const getMockUsers = () => mockUsersList;
