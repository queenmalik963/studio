
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
    where,
    getDocs,
    doc,
    getDoc,
    writeBatch
} from 'firebase/firestore';
import type { Unsubscribe, Timestamp } from 'firebase/firestore';

export interface ChatMessage {
    id: string;
    text: string;
    type: "text" | "voice";
    senderId: string;
    timestamp: Timestamp;
    duration?: string;
}

export interface ConversationSummary {
    id: string;
    partnerId: string;
    partnerName: string;
    partnerAvatar: string;
    lastMessage: string;
    lastMessageTimestamp: Timestamp;
    unreadCount: number;
}

export interface ConversationPartner {
    id: string;
    name: string;
    avatar: string;
}

// Listen to all conversations for a user
export const getConversations = (userId: string, callback: (conversations: ConversationSummary[]) => void): Unsubscribe => {
    const conversationsRef = collection(db, 'conversations');
    const q = query(conversationsRef, where('participants', 'array-contains', userId));

    return onSnapshot(q, async (querySnapshot) => {
        const conversations: ConversationSummary[] = [];

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const partnerId = data.participants.find((p: string) => p !== userId);
            
            if (partnerId) {
                const userDocRef = doc(db, 'users', partnerId);
                const userDocSnap = await getDoc(userDocRef);
                const partnerData = userDocSnap.data();

                conversations.push({
                    id: doc.id,
                    partnerId: partnerId,
                    partnerName: partnerData?.name || 'User',
                    partnerAvatar: partnerData?.avatar || 'https://placehold.co/100x100.png',
                    lastMessage: data.lastMessage?.text || 'No messages yet...',
                    lastMessageTimestamp: data.lastMessage?.timestamp,
                    unreadCount: data.unreadCounts?.[userId] || 0,
                });
            }
        }
        
        // Sort by most recent message
        conversations.sort((a, b) => {
            const timeA = a.lastMessageTimestamp?.toMillis() || 0;
            const timeB = b.lastMessageTimestamp?.toMillis() || 0;
            return timeB - timeA;
        });

        callback(conversations);
    });
};

// Listen to messages in a specific conversation
export const listenToMessages = (conversationId: string, callback: (messages: ChatMessage[]) => void): Unsubscribe => {
    const messagesRef = collection(db, 'conversations', conversationId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    return onSnapshot(q, (querySnapshot) => {
        const messages: ChatMessage[] = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...doc.data() } as ChatMessage);
        });
        callback(messages);
    });
};


// Send a message
export const sendMessage = async (conversationId: string, senderId: string, text: string) => {
    const conversationRef = doc(db, 'conversations', conversationId);
    const messagesRef = collection(conversationRef, 'messages');
    const partnerId = (await getDoc(conversationRef)).data()?.participants.find((p: string) => p !== senderId);

    const batch = writeBatch(db);

    // Add new message
    const newMessageRef = doc(messagesRef); // create a new doc ref to get ID
    const messageData = {
        text: text,
        senderId: senderId,
        timestamp: serverTimestamp(),
        type: 'text'
    };
    batch.set(newMessageRef, messageData);

    // Update conversation summary
    batch.update(conversationRef, {
        lastMessage: messageData,
        [`unreadCounts.${partnerId}`]: 1 // A more robust implementation would use increment
    });

    await batch.commit();
};

// Get the other user in the conversation
export const getConversationPartner = async (conversationId: string, currentUserId: string): Promise<ConversationPartner | null> => {
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationSnap = await getDoc(conversationRef);

    if (!conversationSnap.exists()) return null;

    const partnerId = conversationSnap.data().participants.find((p: string) => p !== currentUserId);
    if (!partnerId) return null;

    const userRef = doc(db, 'users', partnerId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return null;

    return {
        id: userSnap.id,
        name: userSnap.data().name || 'User',
        avatar: userSnap.data().avatar || 'https://placehold.co/100x100.png'
    };
};
