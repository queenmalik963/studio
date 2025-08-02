
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Settings, Send, Mic, Gift, Gamepad2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialMessages = [
  {
    id: 1,
    author: "David",
    avatar: "https://placehold.co/40x40.png",
    text: "Hey",
    type: "chat"
  },
  {
    id: 2,
    author: "Cristian",
    avatar: "https://placehold.co/40x40.png",
    text: "Her new album is so good",
    type: "chat"
  },
    {
    id: 5,
    author: "Cristian",
    gift: "🌹",
    text: "sent a Rose",
    type: "gift"
  },
  {
    id: 3,
    author: "David",
    avatar: "https://placehold.co/40x40.png",
    text: "Idk I like Sweetener better",
    type: "chat"
  },
  {
    id: 4,
    author: "You",
    avatar: "https://placehold.co/40x40.png",
    text: "For sure! Wouldn't miss it. Who's playing?",
    type: "chat"
  },
];

const roomUsers = [
    { name: "David", avatar: "https://placehold.co/40x40.png" },
    { name: "Cristian", avatar: "https://placehold.co/40x40.png" },
    { name: "You", avatar: "https://placehold.co/40x40.png" },
    { name: "Alex", avatar: "https://placehold.co/40x40.png" },
    { name: "Maria", avatar: "https://placehold.co/40x40.png" },
]

const gifts = [
    { name: "Rose", icon: "🌹", price: 10 },
    { name: "Diamond", icon: "💎", price: 100 },
    { name: "Heart", icon: "❤️", price: 50 },
    { name: "Crown", icon: "👑", price: 500 },
    { name: "Star", icon: "⭐", price: 20 },
    { name: "Fire", icon: "🔥", price: 75 },
]

const games = [
    { name: "Ludo", description: "Classic board game", icon: "🎲" },
    { name: "Bingo", description: "Fun number game", icon: "🔢" },
    { name: "Tic-Tac-Toe", description: "Simple X's and O's", icon: "⭕" }
]

export default function VideoRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);

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
                    avatar: "https://placehold.co/40x40.png",
                    text: newMessage,
                    type: "chat"
                },
            ]);
            setNewMessage("");
        }
    };
    
    const sendGift = (gift: {name: string, icon: string}) => {
         setMessages([
            ...messages,
            {
                id: messages.length + 1,
                author: "You",
                gift: gift.icon,
                text: `sent a ${gift.name}`,
                type: 'gift'
            },
        ]);
        setIsGiftPanelOpen(false);
    }
    
    const startGame = (game: {name: string}) => {
         setMessages([
            ...messages,
            {
                id: messages.length + 1,
                author: "You",
                text: `started a game of ${game.name}!`,
                type: 'game'
            },
        ]);
        setIsGamePanelOpen(false);
    }


    return (
        <div className="flex flex-col h-screen bg-background text-foreground">
            <header className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <div>
                        <h1 className="text-lg font-bold font-headline">Amrinder Gill - Paigaam</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Users />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Users in Room ({roomUsers.length})</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {roomUsers.map(user => (
                                    <div key={user.name} className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <p className="font-semibold">{user.name}</p>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                    
                    <Button variant="ghost" size="icon">
                        <Settings />
                    </Button>
                </div>
            </header>

            <div className="relative aspect-video bg-muted">
                 <Image src="https://placehold.co/1920x1080.png" alt="Video stream" fill objectFit="cover" data-ai-hint="music video" />
            </div>

            <div className="flex-1 flex flex-col p-4 overflow-hidden">
                 <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
                    {messages.map((msg) => (
                        <Fragment key={msg.id}>
                            {msg.type === 'chat' && (
                                <div className={cn("flex items-start gap-3", msg.author === "You" ? "justify-end" : "justify-start")}>
                                    {msg.author !== "You" && (
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={msg.avatar} alt={msg.author} />
                                            <AvatarFallback>{msg.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className="flex flex-col items-start">
                                        {msg.author !== "You" && <p className="text-xs text-primary font-semibold mb-1">{msg.author}</p>}
                                        <div className={cn("rounded-lg px-4 py-2 max-w-xs lg:max-w-md", msg.author === "You" ? "bg-primary text-primary-foreground self-end" : "bg-muted")}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(msg.type === 'gift' || msg.type === 'game') && (
                                <div className="text-center py-1">
                                    <p className="text-xs text-muted-foreground bg-muted/50 rounded-full inline-block px-3 py-1">
                                        <span className="font-bold text-primary">{msg.author}</span> {msg.text} <span className="text-lg">{msg.gift}</span>
                                    </p>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>

                <footer className="pt-4">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Dialog open={isGamePanelOpen} onOpenChange={setIsGamePanelOpen}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="ghost" size="icon"><Gamepad2 /></Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Start a Game</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-2 gap-4 py-4">
                                {games.map(game => (
                                    <Card key={game.name} className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-accent" onClick={() => startGame(game)}>
                                        <p className="text-4xl">{game.icon}</p>
                                        <p className="font-semibold mt-2">{game.name}</p>
                                        <p className="text-xs text-muted-foreground">{game.description}</p>
                                    </Card>
                                ))}
                                </div>
                            </DialogContent>
                        </Dialog>

                         <Dialog open={isGiftPanelOpen} onOpenChange={setIsGiftPanelOpen}>
                            <DialogTrigger asChild>
                                <Button type="button" variant="ghost" size="icon"><Gift className="text-yellow-500"/></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Send a Gift</DialogTitle>
                                </DialogHeader>
                                <div className="grid grid-cols-3 gap-4 py-4">
                                {gifts.map(gift => (
                                    <Card key={gift.name} className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-accent" onClick={() => sendGift(gift)}>
                                        <p className="text-4xl">{gift.icon}</p>
                                        <p className="font-semibold mt-2">{gift.name}</p>
                                        <p className="text-xs text-muted-foreground">{gift.price} coins</p>
                                    </Card>
                                ))}
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                        <Button type="button" variant="ghost" size="icon"><Mic /></Button>

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

    