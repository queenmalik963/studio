
"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, ArrowLeft, Mic, MoreVertical, UserX, Trash2, BellOff, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { getMockMessages, getMockPartner, type ChatMessage, type ConversationPartner } from "@/services/chatService";
import { useAuth } from "@/contexts/AuthContext";


const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);


export default function ChatRoomPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const conversationId = params.id as string;
    
    const { currentUser } = useAuth();
    const [messages, setMessages] = useState<ChatMessage[]>(getMockMessages(conversationId));
    const [partner, setPartner] = useState<ConversationPartner>(getMockPartner(conversationId));
    const [newMessage, setNewMessage] = useState("");
    
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        toast({ title: "Message Sent (Mock)", description: "In a live app, this would send your message." });
        setNewMessage("");
    };
    
    const handleClearChat = () => {
        toast({
            title: "Action Not Available",
            description: "Clearing chat history is a mock action.",
        });
    }

    if (!partner || !currentUser) {
        return (
            <div className="flex flex-col h-screen bg-gradient-to-br from-background via-primary/10 to-background text-foreground">
                <header className="p-4 border-b flex items-center justify-between gap-4 bg-card">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.back()}>
                            <ArrowLeft />
                        </Button>
                        <Loader2 className="animate-spin" />
                    </div>
                </header>
                 <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary"/>
                 </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-background via-primary/10 to-background text-foreground">
            <header className="p-4 border-b flex items-center justify-between gap-4 bg-card">
                 <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                     <Avatar className="h-10 w-10">
                        <AvatarImage src={partner.avatar} alt={partner.name} data-ai-hint="person face" />
                        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-xl font-bold font-headline">{partner.name}</h1>
                        <p className="text-sm text-green-400">Online</p>
                    </div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" size="icon">
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <UserX className="mr-2 h-4 w-4" />
                            <span>Block User</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <BellOff className="mr-2 h-4 w-4" />
                            <span>Mute Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={handleClearChat}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Clear Chat</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.length > 0 ? messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex items-end gap-2",
                            msg.senderId === currentUser.uid ? "justify-end" : "justify-start"
                        )}
                    >
                        {msg.senderId !== currentUser.uid && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={partner.avatar} alt={partner.name} />
                                <AvatarFallback>{partner.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={cn(
                                "rounded-lg px-3 py-2 max-w-xs lg:max-w-md",
                                msg.senderId === currentUser.uid
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            {msg.type === 'text' ? (
                                <p className="text-sm">{msg.text}</p>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className={cn("w-8 h-8 rounded-full", msg.senderId === currentUser.uid ? "bg-primary/50 hover:bg-primary/70" : "bg-muted-foreground/20 hover:bg-muted-foreground/40")}>
                                        <PlayIcon className={cn("w-4 h-4", msg.senderId === currentUser.uid ? "text-primary-foreground" : "text-foreground")} />
                                    </Button>
                                    <div className="w-32 h-1 bg-white/20 rounded-full">
                                        <div className="w-[70%] h-full bg-white/40 rounded-full"></div>
                                    </div>
                                    <span className="text-xs w-10">{msg.duration}</span>
                                </div>
                            )}
                            <p className={cn("text-xs mt-1 text-right", msg.senderId === currentUser.uid ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </p>
                        </div>
                    </div>
                )) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                        <MessageCircle className="w-16 h-16 mb-4" />
                        <h2 className="text-xl font-semibold">No Messages</h2>
                        <p className="text-sm">Send a message to start the conversation with {partner.name}.</p>
                    </div>
                )}
            </div>

            <footer className="p-4 border-t bg-background/50">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" type="button" onClick={() => toast({ title: "Coming Soon!", description: "File attachments are not yet available." })}>
                        <Paperclip />
                        <span className="sr-only">Attach file</span>
                    </Button>
                    <Input
                        ref={inputRef}
                        autoComplete="off"
                        name="message"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    {newMessage.trim() ? (
                        <Button type="submit" size="icon">
                            <Send />
                            <span className="sr-only">Send message</span>
                        </Button>
                    ) : (
                         <Button type="button" size="icon" onClick={() => toast({ title: "Coming Soon!", description: "Voice messages are not yet available." })}>
                            <Mic />
                            <span className="sr-only">Record voice message</span>
                        </Button>
                    )}
                </form>
            </footer>
        </div>
    );
}
