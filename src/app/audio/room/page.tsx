
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const initialMessages = [
  { id: 1, type: 'gift', author: 'Jodie', text: 'Sent a RedRose', giftIcon: 'https://placehold.co/100x100.png', avatar: "https://placehold.co/40x40.png" },
  { id: 2, type: 'game', author: 'Jodie', text: 'started playing Fruit!', game: 'Fruit!', avatar: "https://placehold.co/40x40.png" },
  { id: 3, type: 'game', author: 'Jodie', text: 'started playing Bingo!', game: 'Fruit!', avatar: "https://placehold.co/40x40.png" },
];

const roomSeats = [
    { id: 1, user: { name: "Jodie", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 2, user: { name: "Koko", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 3, isOccupied: false, isLocked: true },
    { id: 4, user: { name: "Lexa", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 5, user: { name: "mhay", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 6, user: { name: "saba", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 7, user: { name: "MR ISMAIL", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 8, isOccupied: false },
    { id: 9, isOccupied: false },
]

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-1.87c0-1-1-2.27-2-1.9-1 .36-1 2-2 2s-1.44-.91-1.44-2 1.44-2 1.44-2 .81-1.33 2.56-2.56S13.43 8 15 8s1.86 1.43 2 2-1 2-2 2-2-1-2-2"/><path d="M20 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


export default function AudioRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const owner = { name: "op_2", avatar: "https://placehold.co/40x40.png", isOwner: true };
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        // Sending logic would be here
    };

    return (
        <div className="flex flex-col h-screen bg-[#26242A] text-white font-body">
            <header className="flex-shrink-0 flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    {owner && (
                        <div className="flex items-center gap-2">
                             <Avatar className="h-10 w-10">
                                <AvatarImage src={owner.avatar} />
                                <AvatarFallback>{owner.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{owner.name}</p>
                                <p className="text-xs text-muted-foreground">ID: 66768</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="h-auto p-1 text-muted-foreground">
                        <Users className="w-5 h-5 mr-1" />
                        <span className="font-bold">{roomSeats.filter(s => s.isOccupied).length}</span>
                    </Button>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 overflow-hidden gap-4">
                <div className="grid grid-cols-5 gap-y-6 gap-x-4 justify-items-center">
                    {roomSeats.slice(0, 5).map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-1 w-16 text-center">
                            {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className="w-16 h-16 border-2" style={{ borderColor: '#BE29EC' }}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-0.5">
                                            <Mic className="w-3 h-3 text-green-400" />
                                        </div>
                                    </div>
                                    <p className="text-sm truncate w-full">{seat.user.name}</p>
                                </>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50"/> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-5 gap-y-6 gap-x-4 justify-items-center">
                     {roomSeats.slice(5, 7).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1 w-16 text-center col-start-2 col-span-1">
                             {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className="w-16 h-16 border-2" style={{ borderColor: '#BE29EC' }}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-0.5">
                                            <Mic className="w-3 h-3 text-green-400" />
                                        </div>
                                    </div>
                                    <p className="text-sm truncate w-full">{seat.user.name}</p>
                                </>
                            ) : null}
                         </div>
                    ))}
                     {roomSeats.slice(7).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1 w-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                <span className="text-lg font-bold text-white/50">{seat.id - 1}</span>
                            </div>
                         </div>
                     ))}
                </div>
                 <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2 mt-4">
                    {messages.map((msg) => (
                         <div key={msg.id} className="flex items-center gap-3">
                             <Avatar className="h-8 w-8 shrink-0 bg-primary">
                                <AvatarFallback className="bg-primary text-primary-foreground">{msg.author?.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div className="text-sm">
                                 {msg.type === 'gift' && (
                                     <div className="flex items-center gap-2">
                                         <p><span className="font-semibold">{msg.author}</span> {msg.text}</p>
                                         <div className="bg-black/20 p-1 rounded-md">
                                            <img src="https://em-content.zobj.net/source/apple/391/rose_1f339.png" alt="RedRose" className="w-5 h-5"/>
                                         </div>
                                     </div>
                                 )}
                                  {msg.type === 'game' && (
                                     <p><span className="font-semibold">{msg.author}</span> {msg.text} <span className="font-bold text-yellow-400">{msg.game}</span></p>
                                 )}
                             </div>
                         </div>
                    ))}
                </div>
            </main>
             <footer className="p-4 bg-transparent">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <Button type="button" size="icon" variant="ghost">
                        <MessageSquare />
                    </Button>
                    <div className="flex-grow relative">
                        <Input
                            autoComplete="off"
                            name="message"
                            placeholder="Hi..."
                            className="bg-black/30 border-0 rounded-full pl-4 pr-10 text-white"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                         <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white" disabled={!newMessage.trim()}>
                            <SendIcon />
                        </Button>
                    </div>
                </form>
                <div className="flex items-center justify-around mt-3">
                    <Button type="button" size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/30">
                         <span className="font-bold text-lg text-primary">N</span>
                    </Button>
                     <Button type="button" size="icon" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full"><Gamepad2 /></Button>
                    <Button type="button" size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    </Button>
                    <Button type="button" size="icon" className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                    </Button>
                    <Button type="button" size="icon" className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full">
                        <GiftIcon />
                    </Button>
                </div>
            </footer>
        </div>
    );

    