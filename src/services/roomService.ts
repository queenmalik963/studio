
import { 
    db 
} from '@/lib/firebase';
import { 
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    limit,
    DocumentData,
    FirestoreError,
    Unsubscribe
} from 'firebase/firestore';

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

// Function to send a message to a specific room
export const sendMessage = async (roomId: string, message: Message): Promise<{ success: boolean; error: string | null; }> => {
    if (!message.text && !message.giftIcon) {
        return { success: false, error: "Message text cannot be empty." };
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
    const q = query(messagesColRef, orderBy('timestamp', 'asc'), limit(100));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messages: Message[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data() as DocumentData;
            messages.push({
                id: doc.id,
                ...data,
                timestamp: data.timestamp?.toDate(),
            } as Message);
        });
        callback(messages);
    }, (error) => {
        console.error("Error listening to messages:", error);
    });

    return unsubscribe;
};
