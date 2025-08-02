
"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowLeft, Users, Settings, Send } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const initialMessages = [
  {
    id: 1,
    author: "David",
    avatar: "https://placehold.co/40x40.png",
    text: "Hey",
  },
  {
    id: 2,
    author: "Cristian",
    avatar: "https://placehold.co/40x40.png",
    text: "Her new album is so good",
  },
  {
    id: 3,
    author: "David",
    avatar: "https://placehold.co/40x40.png",
    text: "Idk I like Sweetener better",
  },
  {
    id: 4,
    author: "You",
    avatar: "https://placehold.co/40x40.png",
    text: "For sure! Wouldn't miss it. Who's playing?",
  },
];

export default function VideoRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    author: "You",
                    text: newMessage,
                },
            ]);
            setNewMessage("");
        }
    };


    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold font-headline">Gaming Night: Among Us</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Users />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Settings />
                    </Button>
                </div>
            </header>

            <div className="relative aspect-video bg-muted">
                 <Image src="https://placehold.co/1920x1080.png" alt="Video stream" layout="fill" objectFit="cover" data-ai-hint="video placeholder" />
            </div>

            <div className="flex-1 flex flex-col p-4 overflow-hidden">
                 <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={cn(
                                "flex items-start gap-3",
                                msg.author === "You" ? "justify-end" : "justify-start"
                            )}
                        >
                            {msg.author !== "You" && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={msg.avatar} alt={msg.author} />
                                    <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div className="flex flex-col items-start">
                                {msg.author !== "You" && <p className="text-xs text-primary font-semibold mb-1">{msg.author}</p>}
                                <div
                                    className={cn(
                                        "rounded-lg px-4 py-2 max-w-xs lg:max-w-md",
                                         msg.author === "You"
                                            ? "bg-primary text-primary-foreground self-end"
                                            : "bg-muted"
                                    )}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>

                <footer className="pt-4">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Input
                            autoComplete="off"
                            name="message"
                            placeholder="Send a message..."
                            className="bg-muted border-transparent focus:border-primary focus:ring-primary"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                            <Send />
                            <span className="sr-only">Send message</span>
                        </Button>
                    </form>
                </footer>
            </div>
        </div>
    );
}
