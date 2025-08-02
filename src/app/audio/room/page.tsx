
"use client";

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Users, ArrowLeft, Mic, Send, Gift, Gamepad2, PanelTopClose, Vote, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const NIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20V4l10 16V4"/>
    </svg>
)

export default function AudioRoomPage() {
    const router = useRouter();
    const [newMessage, setNewMessage] = useState("");

    const seats = [
        { id: 1, user: { name: "Jodie", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: true } },
        { id: 2, user: { name: "Koko", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
        { id: 8, user: null, isLocked: true },
        { id: 9, user: { name: "Lexa", image: "https://placehold.co/80x80.png", isSpeaking: false, isMuted: true, isHost: false } },
        { id: 10, user: { name: "mhay", image: "https://placehold.co/80x80.png", isSpeaking: false, isMuted: true, isHost: false } },
        { id: 6, user: { name: "saba", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
        { id: 7, user: { name: "MR ISMAIL", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
    ];
    const emptySeats = [6, 7];

    const chatMessages = [
        { user: "Jodie", text: "Sent a RedRose", isAction: true, gift: "🌹" },
        { user: "Jodie", text: "started playing Fruit!", isAction: true, game: true },
        { user: "Jodie", text: "started playing Bingo!", isAction: true, game: true },
    ];

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#1E0B38] to-[#3C1A5C] text-white p-4">
            {/* Header */}
            <header className="flex-shrink-0 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.push('/audio')}>
                        <ArrowLeft />
                    </Button>
                    <Avatar>
                        <AvatarImage src="https://placehold.co/40x40.png" alt="Room avatar" data-ai-hint="abstract pattern" />
                        <AvatarFallback>OP</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="font-bold">op_2</h1>
                        <p className="text-xs text-white/70">ID: 66768</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" className="bg-black/20 rounded-full h-8 px-4">
                        <Users className="w-4 h-4 mr-2" /> 6
                    </Button>
                </div>
            </header>

            {/* Seats */}
            <main className="flex-1 mt-6 overflow-hidden">
                <div className="grid grid-cols-5 gap-y-4 gap-x-2 place-items-center">
                    {seats.slice(0, 5).map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-1.5 text-center">
                            <div className={cn(
                                "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center relative",
                                seat.user?.isSpeaking && "border-2 border-primary ring-2 ring-primary/50"
                            )}>
                                {seat.user ? (
                                    <Avatar className="w-full h-full">
                                        <AvatarImage src={seat.user.image} alt={seat.user.name} />
                                        <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ) : seat.isLocked ? (
                                    <LockIcon className="w-8 h-8 text-white/50" />
                                ) : (
                                    <span className="text-lg font-bold">{seat.id}</span>
                                )}
                                {seat.user && (
                                     <div className={cn(
                                        "absolute -bottom-2 h-5 w-5 rounded-full flex items-center justify-center border-2",
                                        seat.user.isSpeaking ? 'bg-primary border-background' : 'bg-gray-600 border-gray-800'
                                     )}>
                                        <Mic className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </div>
                            <p className="text-xs font-semibold">{seat.user?.name || ""}</p>
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-4 gap-y-4 gap-x-2 place-items-center mt-4">
                    {seats.slice(5).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1.5 text-center col-span-2">
                            <div className={cn(
                                "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center relative",
                                seat.user?.isSpeaking && "border-2 border-primary ring-2 ring-primary/50"
                            )}>
                                 <Avatar className="w-full h-full">
                                    <AvatarImage src={seat.user!.image} alt={seat.user!.name} />
                                    <AvatarFallback>{seat.user!.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                 <div className={cn(
                                    "absolute -bottom-2 h-5 w-5 rounded-full flex items-center justify-center border-2",
                                    seat.user!.isSpeaking ? 'bg-primary border-background' : 'bg-gray-600 border-gray-800'
                                 )}>
                                    <Mic className="w-3 h-3 text-white" />
                                </div>
                            </div>
                            <p className="text-xs font-semibold">{seat.user!.name || ""}</p>
                        </div>
                    ))}
                    {emptySeats.map(id => (
                         <div key={id} className="flex flex-col items-center gap-1.5 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center relative">
                               <span className="text-lg font-bold text-white/50">{id}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Chat */}
                <div className="mt-8 space-y-3 px-2">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className="text-sm">
                                <span className="font-semibold">{msg.user} </span>
                                {msg.text} {msg.gift && <span className="inline-block bg-white/10 p-1 rounded-md text-lg">{msg.gift}</span>}
                            </p>
                            {msg.game && <span className="text-yellow-400 font-bold">Fruit!</span>}
                        </div>
                    ))}
                </div>
            </main>
            
            {/* Footer */}
            <footer className="flex-shrink-0 mt-4 flex flex-col gap-2 z-10">
                 <div className="flex items-center gap-2">
                     <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10">
                        <MessageCircle className="w-5 h-5"/>
                    </Button>
                    <div className="flex items-center bg-black/30 rounded-full p-1 pr-2 flex-grow">
                        <Input 
                            placeholder="Hi..."
                            className="bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 flex-grow"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                         <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                            <Send className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                     <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10">
                        <NIcon className="w-6 h-6"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-blue-500 w-10 h-10">
                        <Gamepad2 className="w-5 h-5"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10">
                        <PanelTopClose className="w-5 h-5"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-green-500 w-10 h-10">
                        <Vote className="w-5 h-5"/>
                    </Button>
                     <Button variant="ghost" size="icon" className="rounded-full bg-yellow-500 text-black w-10 h-10">
                        <Gift className="w-5 h-5"/>
                    </Button>
                </div>
            </footer>
        </div>
    );
}

    