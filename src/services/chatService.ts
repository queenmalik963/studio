
// This file provides static, hardcoded data for the chat UI.
// It does not connect to any backend or perform real operations.

export interface ChatMessage {
    id: string;
    text: string;
    type: "text" | "voice";
    senderId: string;
    timestamp: Date;
    duration?: string;
}

export interface ConversationSummary {
    id: string;
    partnerId: string;
    partnerName: string;
    partnerAvatar: string;
    lastMessage: string;
    lastMessageTimestamp: Date;
    unreadCount: number;
}

export interface ConversationPartner {
    id: string;
    name: string;
    avatar: string;
}

// Mock function to get conversations
export const getMockConversations = (): ConversationSummary[] => {
    return [
        {
            id: "chat-1",
            partnerId: "user-2",
            partnerName: "Ayesha",
            partnerAvatar: "https://placehold.co/100x100/f87171/ffffff.png?text=A",
            lastMessage: "Haha, that's hilarious! See you there.",
            lastMessageTimestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            unreadCount: 2,
        },
        {
            id: "chat-2",
            partnerId: "user-3",
            partnerName: "DJ Spark",
            partnerAvatar: "https://placehold.co/100x100/fbbf24/ffffff.png?text=S",
            lastMessage: "Yeah, I can play that track next. No problem.",
            lastMessageTimestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            unreadCount: 0,
        },
    ];
};

// Mock function to get messages for a specific conversation
export const getMockMessages = (conversationId: string): ChatMessage[] => {
    return [
        { id: '1', senderId: 'partner-id', text: 'Hey, how are you?', type: 'text', timestamp: new Date(Date.now() - 5 * 60000) },
        { id: '2', senderId: 'mock_user_123', text: 'I am good, thanks for asking!', type: 'text', timestamp: new Date(Date.now() - 4 * 60000) },
        { id: '3', senderId: 'partner-id', text: 'Are you coming to the event tonight?', type: 'text', timestamp: new Date(Date.now() - 3 * 60000) },
        { id: '4', senderId: 'mock_user_123', text: 'Yes, definitely! Can\'t wait. It\'s going to be epic.', type: 'text', timestamp: new Date(Date.now() - 2 * 60000) },
    ];
};

// Mock function to get the other user in the conversation
export const getMockPartner = (conversationId: string): ConversationPartner => {
     return {
        id: 'partner-id',
        name: 'Ayesha',
        avatar: 'https://placehold.co/100x100/f87171/ffffff.png?text=A'
    };
};

// Mock send message function
export const sendMessage = async (conversationId: string, senderId: string, text: string) => {
    console.log(`Mock: Sending message "${text}" to ${conversationId}`);
    return { success: true };
};

// Mock listen to messages function
export const listenToMessages = (conversationId: string, callback: (messages: ChatMessage[]) => void) => {
    console.log(`Mock: Listening to messages for ${conversationId}`);
    const mockMessages = getMockMessages(conversationId);
    callback(mockMessages);
    return () => console.log(`Mock: Unsubscribed from ${conversationId}`); // Return an unsubscribe function
};

// Mock get conversation partner
export const getConversationPartner = async (conversationId: string, currentUserId: string): Promise<ConversationPartner | null> => {
    console.log(`Mock: getting partner for ${conversationId}`);
    return getMockPartner(conversationId);
}
