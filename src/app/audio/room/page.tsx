
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Send, Mic, Gift, Gamepad2, X, ShieldCheck, Lock, MicOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const initialMessages = [
  { id: 1, type: 'gift', author: 'Jodie', text: 'Sent a RedRose', giftIcon: 'https://placehold.co/100x100.png' },
  { id: 2, type: 'game', author: 'Jodie', text: 'started playing Fruit!' },
  { id: 3, type: 'game', author: 'Jodie', text: 'started playing Bingo!' },
  { id: 4, type: 'chat', author: 'Saba', text: 'Hi...', avatar: "https://placehold.co/40x40.png" },
];

const CrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/>
    </svg>
);


const roomSeats = [
    { id: 1, user: { name: "Jodie", avatar: "https://placehold.co/80x80.png", isMuted: false, hasCrown: true, frameColor: "gold" }, isOccupied: true },
    { id: 2, user: { name: "Koko", avatar: "https://placehold.co/80x80.png", isMuted: false, hasShield: true, frameColor: "fuchsia" }, isOccupied: true },
    { id: 3, user: { name: "Lexa", avatar: "https://placehold.co/80x80.png", isMuted: true, frameColor: "cyan" }, isOccupied: true },
    { id: 4, user: { name: "mhay", avatar: "https://placehold.co/80x80.png", isMuted: true }, isOccupied: true },
    { id: 5, user: { name: "op_2", avatar: "https://placehold.co/40x40.png", isMuted: false, isOwner: true }, isOccupied: true },
    { id: 6, isOccupied: false },
    { id: 7, isOccupied: false },
    { id: 8, isLocked: true, isOccupied: false },
    { id: 9, isOccupied: false },
    { id: 10, isOccupied: false },
    { id: 11, user: { name: "saba", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
    { id: 12, user: { name: "MR ISMAIL", avatar: "https://placehold.co/80x80.png", isMuted: false }, isOccupied: true },
]


export default function AudioRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");

    const owner = roomSeats.find(s => s.user?.isOwner)?.user;

    return (
        <div className="flex flex-col h-screen bg-[#26242A] text-white font-body">
            <header className="flex-shrink-0 flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    {owner && (
                        <div className="flex items-center gap-2">
                             <Avatar className="h-10 w-10 border-2 border-yellow-400">
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
                    {roomSeats.filter(s => s.id <= 10).map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-1 w-16">
                            {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className={`w-16 h-16 border-2 ${seat.user.isOwner ? 'border-transparent' : 'border-purple-500'}`} style={{
                                            boxShadow: seat.user.frameColor ? `0 0 12px 2px ${seat.user.frameColor}`: 'none'
                                        }}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-0.5">
                                            {seat.user.isMuted ? <MicOff className="w-3 h-3 text-red-500" /> : <Mic className="w-3 h-3 text-green-400" />}
                                        </div>
                                         {seat.user.hasCrown && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <CrownIcon className="w-5 h-5 text-yellow-400" fill="yellow"/>
                                            </div>
                                        )}
                                        {seat.user.hasShield && (
                                            <div className="absolute top-0 left-0 bg-black/50 rounded-full p-0.5">
                                                 <ShieldCheck className="w-4 h-4 text-cyan-400" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm truncate">{seat.user.name}</p>
                                </>
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-black/20 flex items-center justify-center">
                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50"/> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                     {roomSeats.filter(s => s.id > 10).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1 w-16 col-start-3">
                             {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className="w-16 h-16 border-2 border-transparent">
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-0.5">
                                            {seat.user.isMuted ? <MicOff className="w-3 h-3 text-red-500" /> : <Mic className="w-3 h-3 text-green-400" />}
                                        </div>
                                    </div>
                                    <p className="text-sm truncate">{seat.user.name}</p>
                                </>
                            ) : null}
                         </div>
                    ))}
                </div>
                 <div className="flex-1 overflow-y-auto space-y-4 pr-2 mt-4">
                    {messages.map((msg) => (
                         <div key={msg.id} className="flex items-start gap-3">
                             <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage src={msg.avatar} />
                                <AvatarFallback>{msg.author?.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div className="text-sm">
                                 {msg.type === 'gift' && (
                                     <>
                                         <p className="text-muted-foreground">{msg.author}</p>
                                         <div className="flex items-center gap-2">
                                             <p>Sent a RedRose</p>
                                             <img src={msg.giftIcon} alt="RedRose" className="w-6 h-6"/>
                                             <p>x1</p>
                                         </div>
                                     </>
                                 )}
                                 {msg.type === 'game' && (
                                     <p><span className="font-bold text-yellow-400">{msg.author}</span> {msg.text}</p>
                                 )}
                                 {msg.type === 'chat' && (
                                     <>
                                        <p className="text-primary font-semibold mb-1">{msg.author}</p>
                                        <div className="rounded-lg px-4 py-2 bg-black/20 max-w-xs lg:max-w-md">
                                            <p>{msg.text}</p>
                                        </div>
                                     </>
                                 )}
                             </div>
                         </div>
                    ))}
                </div>
            </main>
             <footer className="p-4 bg-transparent">
                <div className="flex items-center gap-2">
                    <div className="flex-grow relative">
                        <Input
                            autoComplete="off"
                            name="message"
                            placeholder="Hi..."
                            className="bg-black/30 border-0 rounded-full pl-10 pr-10"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                         <p className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg text-primary">N</p>
                    </div>
                     <Button type="submit" size="icon" variant="ghost" disabled={!newMessage.trim()}>
                        <Send />
                    </Button>
                    <Button type="button" size="icon" variant="ghost"><Mic /></Button>
                    <Button type="button" size="icon" className="bg-blue-600 hover:bg-blue-700 rounded-full"><Gamepad2 /></Button>
                     <Button type="button" size="icon" variant="ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    </Button>
                    <Button type="button" size="icon" className="bg-yellow-500 hover:bg-yellow-600 rounded-full"><Gift /></Button>
                </div>
            </footer>
        </div>
    );

    