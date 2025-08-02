
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Maximize, Minimize } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const initialMessages = [
  { id: 1, type: 'gift', author: 'Jodie', text: 'Sent a RedRose', giftIcon: 'https://placehold.co/100x100.png', avatar: "https://placehold.co/40x40.png" },
  { id: 2, type: 'game', author: 'Jodie', text: 'started playing Fruit!', game: 'Fruit!', avatar: "https://placehold.co/40x40.png" },
  { id: 3, type: 'text', author: 'saba', text: 'Hi...', avatar: "https://placehold.co/40x40.png"},
];

const roomSeats = [
    { id: 1, user: { name: "Jodie", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'gold', specialIcon: 'crown' }, isOccupied: true },
    { id: 2, user: { name: "Koko", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'purple', specialIcon: 'shield' }, isOccupied: true },
    { id: 3, isOccupied: false, isLocked: true },
    { id: 4, user: { name: "Lexa", avatar: "https://placehold.co/80x80.png", isMuted: true, frame: 'blue' }, isOccupied: true },
    { id: 5, user: { name: "mhay", avatar: "https://placehold.co/80x80.png", isMuted: true }, isOccupied: true },
    { id: 6, isOccupied: false },
    { id: 7, isOccupied: false },
    { id: 8, isOccupied: false },
    { id: 9, isOccupied: false },
    { id: 10, isOccupied: false },
]

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-1.87c0-1-1-2.27-2-1.9-1 .36-1 2-2 2s-1.44-.91-1.44-2 1.44-2 1.44-2 .81-1.33 2.56-2.56S13.43 8 15 8s1.86 1.43 2 2-1 2-2 2-2-1-2-2"/><path d="M20 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
);

const CrownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M229.2,81.4a15.8,15.8,0,0,0-15.5-1.1L161,96.69l-33-22-33,22-52.7-16.39a15.8,15.8,0,0,0-15.5,1.1,16.2,16.2,0,0,0-7.3,14.2l10.2,60.2a16,16,0,0,0,15.4,13.4H200.7a16,16,0,0,0,15.4-13.4l10.2-60.2A16.2,16.2,0,0,0,229.2,81.4Z"/></svg>
);

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48V32a16,16,0,0,0-16-16H56A16,16,0,0,0,40,32V48a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H56v40a16,16,0,0,0,16,16h22.6a8,8,0,0,0,7.3-4.8l20.8-49.8,20.8,49.8a8,8,0,0,0,7.3,4.8H184a16,16,0,0,0,16-16V168h16a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48Z"/></svg>
);


const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


export default function VideoRoomPage() {
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

    const frameColors: {[key: string]: string} = {
        gold: 'shadow-[0_0_20px_5px_rgba(255,185,0,0.5)] border-yellow-400',
        purple: 'shadow-[0_0_20px_5px_rgba(192,38,211,0.5)] border-fuchsia-500',
        blue: 'shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] border-blue-400',
    }

    return (
        <div className="flex flex-col h-screen bg-[#180828] text-white font-sans">
            {/* Video Player Section */}
            <div className="relative w-full aspect-video bg-black flex-shrink-0">
                 <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <p className="text-white/50">Video Player Placeholder</p>
                </div>

                {/* Video Controls Overlay */}
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/50 to-transparent">
                    <div className="flex items-center justify-between">
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
                                        <p className="text-xs text-white/70">ID: 66768</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" className="h-auto p-1 text-white/80 bg-black/20 rounded-full px-3">
                                <Users className="w-5 h-5 mr-1" />
                                <span className="font-bold">{roomSeats.filter(s => s.isOccupied).length}</span>
                            </Button>
                             <Button variant="ghost" size="icon" className="text-white/80 bg-black/20 rounded-full">
                                <Maximize />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Panel */}
            <main className="flex-1 flex flex-col p-4 overflow-hidden gap-2 bg-[#2E103F]">
                {/* Seats */}
                <div className="grid grid-cols-10 gap-x-2 justify-items-center">
                    {roomSeats.map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-1 w-[30px] text-center">
                            {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className={cn("w-[30px] h-[30px] border-2", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {seat.user.specialIcon === 'crown' && <CrownIcon className="absolute -top-2 -left-2 w-4 h-4 text-yellow-400 -rotate-12"/>}
                                        {seat.user.specialIcon === 'shield' && <ShieldIcon className="absolute -top-1.5 right-[-6px] w-4 h-4 text-sky-300"/>}

                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-0.5">
                                            {seat.user.isMuted ? 
                                                <Mic className="w-2 h-2 text-red-500" /> :
                                                <Mic className="w-2 h-2 text-green-400" />
                                            }
                                        </div>
                                    </div>
                                    <p className="text-[10px] truncate w-full">{seat.user.name}</p>
                                </>
                            ) : (
                                <div className="w-[30px] h-[30px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                    {seat.isLocked ? <Lock className="w-4 h-4 text-white/50"/> : <span className="text-sm font-bold text-white/50">{seat.id}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {/* Chat */}
                 <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 pr-2 mt-2">
                    {messages.map((msg) => (
                         <div key={msg.id} className="flex items-start gap-3">
                             <Avatar className="h-8 w-8 shrink-0">
                                <AvatarImage src={msg.avatar}/>
                                <AvatarFallback className="bg-primary/50 text-primary-foreground text-xs">{msg.author?.charAt(0)}</AvatarFallback>
                            </Avatar>
                             <div className="text-sm">
                                 <p className="text-white/70 text-xs">{msg.author}</p>
                                 {msg.type === 'gift' && (
                                     <div className="flex items-center gap-2 mt-1">
                                         <p className="text-xs">Sent a RedRose</p>
                                         <div className="bg-black/20 p-1 rounded-md flex items-center gap-1">
                                            <img src="https://em-content.zobj.net/source/apple/391/rose_1f339.png" alt="RedRose" className="w-4 h-4"/>
                                            <span className="text-xs">x1</span>
                                         </div>
                                     </div>
                                 )}
                                  {msg.type === 'game' && (
                                     <p className="mt-1 text-xs">{msg.author} <span className="font-bold text-yellow-400">{msg.text}</span></p>
                                 )}
                                 {msg.type === 'text' && (
                                     <div className="bg-black/20 rounded-lg p-2 mt-1">
                                        <p className="text-sm">{msg.text}</p>
                                     </div>
                                 )}
                             </div>
                         </div>
                    ))}
                </div>
            </main>

            {/* Footer Controls */}
             <footer className="p-4 bg-[#2E103F] border-t border-white/10">
                <div className="flex items-center justify-around">
                    <Button type="button" size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/30">
                         <span className="font-bold text-lg">N</span>
                    </Button>
                     <div className="flex-grow relative mx-2">
                        <Input
                            autoComplete="off"
                            name="message"
                            placeholder="Hi..."
                            className="bg-black/30 border-0 rounded-full pl-4 pr-10 text-white h-12"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                         <Button type="submit" size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80 hover:text-white" disabled={!newMessage.trim()}>
                            <SendIcon />
                        </Button>
                    </div>
                    <Button type="button" size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/30">
                        <Mic />
                    </Button>
                     <Button type="button" size="icon" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full"><Gamepad2 /></Button>
                    <Button type="button" size="icon" variant="ghost" className="w-12 h-12 rounded-full bg-black/30">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    </Button>
                    <Button type="button" size="icon" className="w-12 h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full">
                        <GiftIcon />
                    </Button>
                </div>
            </footer>
        </div>
    );

    

    