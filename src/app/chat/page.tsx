"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const initialMessages = [
  {
    id: 1,
    author: "Jane Doe",
    avatar: "https://placehold.co/40x40.png",
    text: "Hey, are you joining the live set tonight?",
    isSender: false,
    timestamp: "5:01 PM",
  },
  {
    id: 2,
    author: "You",
    avatar: "https://placehold.co/40x40.png",
    text: "For sure! Wouldn't miss it. Who's playing?",
    isSender: true,
    timestamp: "5:02 PM",
  },
  {
    id: 3,
    author: "Jane Doe",
    avatar: "https://placehold.co/40x40.png",
    text: "It's a surprise guest, but I heard it's going to be epic!",
    isSender: false,
    timestamp: "5:02 PM",
  },
];

export default function ChatPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    author: "You",
                    text: newMessage,
                    isSender: true,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
                },
            ]);
            setNewMessage("");
        }
    };

    return (
        <AppLayout>
            <div className="flex flex-col h-[calc(100vh-10rem)] bg-card border rounded-lg">
                <header className="p-4 border-b">
                    <h1 className="text-xl font-bold font-headline">Global Chat</h1>
                    <p className="text-sm text-muted-foreground">Chat with everyone in the RaveWave community.</p>
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
                                    <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                                </Avatar>
                            )}
                            <div
                                className={cn(
                                    "rounded-lg px-4 py-2 max-w-xs lg:max-w-md",
                                    msg.isSender
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                )}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className={cn("text-xs mt-1", msg.isSender ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                                    {msg.timestamp}
                                </p>
                            </div>
                            {msg.isSender && (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={msg.avatar} alt={msg.author} />
                                    <AvatarFallback>Y</AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                </div>

                <footer className="p-4 border-t bg-background/50 rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" type="button">
                            <Paperclip />
                            <span className="sr-only">Attach file</span>
                        </Button>
                        <Input
                            autoComplete="off"
                            name="message"
                            placeholder="Type your message..."
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
        </AppLayout>
    );
}
