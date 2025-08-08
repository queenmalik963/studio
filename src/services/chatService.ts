
// This file provides types and mock data generation for the chat UI.
import { add, sub } from 'date-fns';

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

// --- Mock Data Generation ---

const mockPartners: ConversationPartner[] = [
    { id: 'ayesha_khan', name: 'Ayesha', avatar: 'https://placehold.co/100x100/f87171/ffffff.png?text=A' },
    { id: 'zainab_ali', name: 'Zainab', avatar: 'https://placehold.co/100x100/60a5fa/ffffff.png?text=Z' },
    { id: 'ali_raza', name: 'Ali Raza', avatar: 'https://placehold.co/100x100/34d399/ffffff.png?text=A' },
];

const mockMessages: Record<string, ChatMessage[]> = {
    'ayesha_khan': [
        { id: 'msg1', text: 'Hey, how have you been?', type: 'text', senderId: 'ayesha_khan', timestamp: sub(new Date(), { minutes: 10 }) },
        { id: 'msg2', text: 'I am good, wbu?', type: 'text', senderId: 'mock_user_123', timestamp: sub(new Date(), { minutes: 9 }) },
        { id: 'msg3', text: "Just chilling! Planning to watch a movie tonight.", type: 'text', senderId: 'ayesha_khan', timestamp: sub(new Date(), { minutes: 5 }) },
        { id: 'msg4', text: "Nice! Which one?", type: 'text', senderId: 'mock_user_123', timestamp: sub(new Date(), { minutes: 4 }) },
        { id: 'msg5', text: "Thinking about that new sci-fi movie everyone's talking about.", type: 'text', senderId: 'ayesha_khan', timestamp: sub(new Date(), { minutes: 2 }) },
    ],
    'zainab_ali': [
        { id: 'msg6', text: 'Did you see the match yesterday?', type: 'text', senderId: 'zainab_ali', timestamp: sub(new Date(), { hours: 2 }) },
        { id: 'msg7', text: "Of course! It was a nail-biter.", type: 'text', senderId: 'mock_user_123', timestamp: sub(new Date(), { hours: 1, minutes: 58 }) },
    ],
    'ali_raza': [
        { id: 'msg8', text: 'Hi! Are we still on for lunch tomorrow?', type: 'text', senderId: 'ali_raza', timestamp: sub(new Date(), { days: 1 }) },
    ]
}


export const getMockConversations = (): ConversationSummary[] => {
    return mockPartners.map(partner => {
        const conversationMessages = mockMessages[partner.id] || [];
        const lastMessage = conversationMessages[conversationMessages.length - 1];
        return {
            id: partner.id,
            partnerId: partner.id,
            partnerName: partner.name,
            partnerAvatar: partner.avatar,
            lastMessage: lastMessage ? lastMessage.text : "No messages yet.",
            lastMessageTimestamp: lastMessage ? lastMessage.timestamp : new Date(),
            unreadCount: partner.name === 'Ayesha' ? 2 : 0,
        }
    }).sort((a, b) => b.lastMessageTimestamp.getTime() - a.lastMessageTimestamp.getTime());
}

export const getMockPartner = (partnerId: string): ConversationPartner => {
    return mockPartners.find(p => p.id === partnerId) || mockPartners[0];
}

export const getMockMessages = (partnerId: string): ChatMessage[] => {
    return mockMessages[partnerId] || [];
}
