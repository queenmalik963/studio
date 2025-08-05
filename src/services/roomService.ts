
import { 
    auth,
    db 
} from '@/lib/firebase';
import { 
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    DocumentData,
    FirestoreError,
    Unsubscribe,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    runTransaction,
    increment
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { Gift } from '@/components/room/GiftPanel';

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
    createdAt: any; // serverTimestamp
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

// Function to get details for a single room
export const getRoomDetails = async (roomId: string): Promise<Room | null> => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDocSnap = await getDoc(roomDocRef);

        if (roomDocSnap.exists()) {
            return {
                id: roomDocSnap.id,
                ...roomDocSnap.data()
            } as Room;
        }
        return null;
    } catch (e) {
        console.error("Error fetching room details:", e);
        return null;
    }
}


// Function to create a new room in Firestore
export const createRoom = async (roomDetails: Partial<Omit<Room, 'createdAt' | 'isLive' | 'ownerId' | 'ownerName' | 'id' | 'seats'>> & { seats: number }): Promise<{ success: boolean; roomId: string | null; error: string | null; }> => {
    const user = auth.currentUser;
    if (!user) {
        return { success: false, roomId: null, error: "You must be logged in to create a room." };
    }

    try {
        const roomsColRef = collection(db, 'rooms');
        const initialSeats = Array.from({ length: roomDetails.seats }, (_, i) => ({
            id: i + 1,
            user: null,
            isLocked: false,
        }));

        const newRoomDoc = await addDoc(roomsColRef, {
            ...roomDetails,
            seats: initialSeats,
            ownerId: user.uid,
            ownerName: user.displayName || user.email,
            ownerAvatar: user.photoURL,
            isLive: true,
            createdAt: serverTimestamp(),
            // Initialize playback state for audio rooms
            currentTrack: null,
            isPlaying: false,
            playbackTime: 0,
        });
        return { success: true, roomId: newRoomDoc.id, error: null };
    } catch (e) {
        const error = e as FirestoreError;
        console.error("Error creating room:", error);
        return { success: false, roomId: null, error: error.message };
    }
}


// Function to send a message to a specific room
export const sendMessage = async (roomId: string, message: Message): Promise<{ success: boolean; error: string | null; }> => {
    if (!message.text && !message.giftIcon && !message.game) {
        return { success: false, error: "Message cannot be empty." };
    }

    try {
        const messagesColRef = collection(db, 'rooms', roomId, 'messages');
        await addDoc(messagesColRef, {
            ...message,
            timestamp: serverTimestamp(),
        });
        return { success: true, error: null };
    } catch (e) {
        const error = e as FirestoreError;
        console.error("Error sending message:", error);
        return { success: false, error: error.message };
    }
};

// Function to listen to real-time messages in a room
export const listenToMessages = (roomId: string, callback: (messages: Message[]) => void): Unsubscribe => {
    const messagesColRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesColRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() } as Message);
        });
        callback(messages);
    }, (error) => {
        console.error("Error listening to messages:", error);
    });
};

// Function to listen to the entire room document for real-time updates (including seats and playback)
export const listenToRoom = (roomId: string, callback: (room: Room | null) => void): Unsubscribe => {
    const roomDocRef = doc(db, 'rooms', roomId);
    return onSnapshot(roomDocRef, (docSnap) => {
        if (docSnap.exists()) {
            callback({ id: docSnap.id, ...docSnap.data() } as Room);
        } else {
            callback(null);
        }
    }, (error) => {
        console.error("Error listening to room:", error);
        callback(null);
    });
}

// Function to take a seat
export const takeSeat = async (roomId: string, seatId: number, user: SeatUser) => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
            const roomData = roomDoc.data() as Room;
            const seats = roomData.seats.map(seat => 
                seat.id === seatId ? { ...seat, user: { ...user, isMuted: true } } : seat
            );
            await updateDoc(roomDocRef, { seats });
            
            await sendMessage(roomId, {
                type: 'system',
                text: `${user.name} has taken a seat.`
            });

            return { success: true };
        }
        return { success: false, error: "Room not found." };
    } catch (e) {
        console.error("Error taking seat:", e);
        return { success: false, error: (e as Error).message };
    }
};

// Function to leave a seat
export const leaveSeat = async (roomId: string, seatId: number) => {
     try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
            const roomData = roomDoc.data() as Room;
            const seats = roomData.seats.map(seat => 
                seat.id === seatId ? { ...seat, user: null } : seat
            );
            await updateDoc(roomDocRef, { seats });
            return { success: true };
        }
        return { success: false, error: "Room not found." };
    } catch (e) {
        console.error("Error leaving seat:", e);
        return { success: false, error: (e as Error).message };
    }
};


// Function for a user to update their own seat properties (e.g., mute/unmute)
export const updateSeatUser = async (roomId: string, seatId: number, updates: Partial<SeatUser>) => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
            const roomData = roomDoc.data() as Room;
            const seats = roomData.seats.map(seat => {
                if (seat.id === seatId && seat.user) {
                    return { ...seat, user: { ...seat.user, ...updates }};
                }
                return seat;
            });
            await updateDoc(roomDocRef, { seats });
            return { success: true };
        }
        return { success: false, error: "Room not found." };
    } catch (e) {
        console.error("Error updating seat user:", e);
        return { success: false, error: (e as Error).message };
    }
};

// Function for owner to manage seats (lock/unlock, kick)
export const updateSeatAsOwner = async (roomId: string, seatId: number, updates: Partial<Pick<Seat, 'isLocked' | 'user'>>) => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
            const roomData = roomDoc.data() as Room;
            const seats = roomData.seats.map(seat => {
                if (seat.id === seatId) {
                    return { ...seat, ...updates };
                }
                return seat;
            });
            await updateDoc(roomDocRef, { seats });
            return { success: true };
        }
        return { success: false, error: "Room not found." };
    } catch (e) {
        console.error("Error updating seat:", e);
        return { success: false, error: (e as Error).message };
    }
};

// Function to update the playback or game state for a room
export const updatePlaybackState = async (roomId: string, state: Partial<Pick<Room, 'currentTrack' | 'isPlaying' | 'playbackTime' | 'activeGame' | 'gameHostId'>>) => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        await updateDoc(roomDocRef, state);
        return { success: true };
    } catch (e) {
        console.error("Error updating playback state:", e);
        return { success: false, error: (e as Error).message };
    }
};

export const endCurrentGame = async (roomId: string) => {
    try {
        const roomDocRef = doc(db, 'rooms', roomId);
        await updateDoc(roomDocRef, {
            activeGame: null,
            gameHostId: null,
        });
        return { success: true };
    } catch (e) {
        console.error("Error ending game:", e);
        return { success: false, error: (e as Error).message };
    }
};


// Function to send a gift, updating sender and receiver balances atomically.
export const sendGift = async (
    roomId: string,
    sender: SeatUser,
    recipientId: string,
    recipientName: string,
    gift: Gift,
    quantity: number
): Promise<{ success: boolean; error?: string }> => {
    const totalCost = gift.price * quantity;
    const diamondsToAward = totalCost; // 1 Coin = 1 Diamond for receiver

    const senderRef = doc(db, 'users', sender.id);
    const recipientRef = doc(db, 'users', recipientId);

    try {
        await runTransaction(db, async (transaction) => {
            const senderDoc = await transaction.get(senderRef);

            if (!senderDoc.exists()) {
                throw new Error("Sender or recipient not found.");
            }

            const senderCoins = senderDoc.data().coins || 0;
            if (senderCoins < totalCost) {
                throw new Error("Insufficient coins.");
            }

            // 1. Deduct coins from sender
            transaction.update(senderRef, { coins: increment(-totalCost) });

            // 2. Award diamonds to recipient
            transaction.update(recipientRef, { diamonds: increment(diamondsToAward) });
        });
        
        // 3. Send a message to the room chat (outside the transaction)
         await sendMessage(roomId, {
            authorId: sender.id,
            authorName: sender.name,
            authorAvatar: sender.avatar,
            text: `Sent ${quantity}x ${gift.name} to ${recipientName}`,
            giftIcon: gift.image,
            type: 'gift',
        });

        return { success: true };
    } catch (e) {
        console.error("Send gift transaction failed: ", e);
        return { success: false, error: (e as Error).message };
    }
};
