
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getConversations, type ConversationSummary } from "@/services/chatService";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ChatListPage() {
    const router = useRouter();
    const { currentUser, loading: authLoading } = useAuth();
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !currentUser) {
            router.push('/');
            return;
        }

        if (currentUser) {
            const unsubscribeConversations = getConversations(currentUser.uid, (newConversations) => {
                setConversations(newConversations);
                setDataLoading(false);
            });
    
            return () => unsubscribeConversations();
        }
    }, [currentUser, authLoading, router]);

    const isLoading = authLoading || dataLoading;

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
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                        </div>
                    ) : conversations.length > 0 ? (
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
                                                        {formatDistanceToNow(new Date(chat.lastMessageTimestamp.seconds * 1000), { addSuffix: true })}
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
