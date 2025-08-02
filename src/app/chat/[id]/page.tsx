
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, ArrowLeft, Mic, MoreVertical, Film, Star, Gift, Video, UserX, Trash2, BellOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const initialMessages = [
  {
    id: 1,
    author: "Jane Doe",
    avatar: "https://placehold.co/40x40.png",
    type: "text",
    text: "Hey, are you joining the live set tonight?",
    isSender: false,
    timestamp: "5:01 PM",
  },
  {
    id: 2,
    author: "You",
    avatar: "https://placehold.co/40x40.png",
    type: "text",
    text: "For sure! Wouldn't miss it. Who's playing?",
    isSender: true,
    timestamp: "5:02 PM",
  },
  {
    id: 3,
    author: "Jane Doe",
    avatar: "https://placehold.co/40x40.png",
    type: "text",
    text: "It's a surprise guest, but I heard it's going to be epic!",
    isSender: false,
    timestamp: "5:02 PM",
  },
  {
    id: 4,
    author: "You",
    avatar: "https://placehold.co/40x40.png",
    type: "voice",
    duration: "0:15",
    isSender: true,
    timestamp: "5:03 PM",
  },
];

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);


export default function ChatRoomPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    // In a real app, you'd fetch user data based on params.id
    const contactName = params.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    author: "You",
                    type: "text",
                    text: newMessage,
                    isSender: true,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                    avatar: "https://placehold.co/40x40.png",
                },
            ]);
            setNewMessage("");
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-10rem)] bg-card border rounded-lg">
                <header className="p-4 border-b flex items-center justify-between gap-4">
                     <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => router.push('/chat')}>
                            <ArrowLeft />
                        </Button>
                         <Avatar className="h-10 w-10">
                            <AvatarImage src="https://placehold.co/40x40.png" alt={contactName} />
                            <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-xl font-bold font-headline">{contactName}</h1>
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
                            <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Clear Chat</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex items-end gap-2",
                                msg.isSender ? "justify-end" : "justify-start"
                            )}
                        >
                            {!msg.isSender && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={msg.avatar} alt={msg.author} />
                                    <AvatarFallback>{msg.author?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={cn(
                                    "rounded-lg px-3 py-2 max-w-xs lg:max-w-md",
                                    msg.isSender
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                {msg.type === 'text' ? (
                                    <p className="text-sm">{msg.text}</p>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className={cn("w-8 h-8 rounded-full", msg.isSender ? "bg-primary/50 hover:bg-primary/70" : "bg-muted-foreground/20 hover:bg-muted-foreground/40")}>
                                            <PlayIcon className={cn("w-4 h-4", msg.isSender ? "text-primary-foreground" : "text-foreground")} />
                                        </Button>
                                        <div className="w-32 h-6 bg-white/20 rounded-full">
                                            <div className="w-[70%] h-full bg-white/40 rounded-full"></div>
                                        </div>
                                        <span className="text-xs w-10">{msg.duration}</span>
                                    </div>
                                )}
                                <p className={cn("text-xs mt-1 text-right", msg.isSender ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                                    {msg.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="p-4 border-t bg-background/50 rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" type="button">
                                    <Paperclip />
                                    <span className="sr-only">Attach file</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-2">
                                <div className="grid gap-1">
                                    <Button variant="ghost" className="justify-start">
                                        <Video className="mr-2 h-4 w-4" />
                                        Photo/Video
                                    </Button>
                                     <Button variant="ghost" className="justify-start">
                                        <Film className="mr-2 h-4 w-4" />
                                        Share Video Room
                                    </Button>
                                    <Button variant="ghost" className="justify-start">
                                        <Mic className="mr-2 h-4 w-4" />
                                        Share Audio Room
                                    </Button>
                                    <Button variant="ghost" className="justify-start">
                                        <Gift className="mr-2 h-4 w-4 text-yellow-500" />
                                        Send Gift
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Input
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
                             <Button type="button" size="icon">
                                <Mic />
                                <span className="sr-only">Record voice message</span>
                            </Button>
                        )}
                    </form>
                </footer>
            </div>
        </AppLayout>
    );
}

