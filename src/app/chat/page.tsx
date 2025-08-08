
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatDistanceToNow } from 'date-fns';

interface ConversationSummary {
    id: string;
    partnerId: string;
    partnerName: string;
    partnerAvatar: string;
    lastMessage: string;
    lastMessageTimestamp: Date;
    unreadCount: number;
}

const mockConversations: ConversationSummary[] = [
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
    {
        id: "chat-3",
        partnerId: "user-4",
        partnerName: "Zara",
        partnerAvatar: "https://placehold.co/100x100/34d399/ffffff.png?text=Z",
        lastMessage: "Are you going to the event tonight?",
        lastMessageTimestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        unreadCount: 0,
    }
];

export default function ChatListPage() {
    const [conversations] = useState<ConversationSummary[]>(mockConversations);

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-10rem)]">
                 <header className="mb-4">
                    <h1 className="text-3xl font-bold font-headline">Messages</h1>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="bg-card/80 pl-10" />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto -mx-4 px-4">
                    {conversations.length > 0 ? (
                        <div className="space-y-1">
                            {conversations.map((chat) => (
                               <Link href={`/chat/${chat.id}`} key={chat.id} className="block">
                                 <Card className="bg-card/50 hover:bg-card/80 transition-colors border-transparent hover:border-primary/20">
                                     <CardContent className="p-3 flex items-center gap-4">
                                         <Avatar className="h-12 w-12 border-2 border-primary/50">
                                            <AvatarImage src={chat.partnerAvatar} alt={chat.partnerName} />
                                            <AvatarFallback>{chat.partnerName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold truncate">{chat.partnerName}</p>
                                                {chat.lastMessageTimestamp && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {formatDistanceToNow(chat.lastMessageTimestamp, { addSuffix: true })}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex justify-between items-start mt-1">
                                                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                                                 {chat.unreadCount > 0 && (
                                                    <span className="flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 ml-2">
                                                        {chat.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                     </CardContent>
                                 </Card>
                               </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                            <MessageCircle className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-semibold">No Messages Yet</h2>
                            <p className="text-sm">Start a conversation to see it here.</p>
                        </div>
                    )}
                </div>

            </div>
        </AppLayout>
    );
}
