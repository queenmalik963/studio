
// This file provides types for the chat UI.
// All mock data has been removed to prevent client-side errors and allow for dynamic content.

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
