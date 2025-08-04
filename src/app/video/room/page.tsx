
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Maximize, Coins, Send as SendIconLucide, ChevronDown, RectangleVertical, Gift } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import type { Gift as GiftType } from "@/components/room/GiftPanel";


type Message = {
    id: number;
    type: 'text' | 'game' | 'gift' | 'notification';
    author?: string;
    text: string;
    avatar?: string;
    game?: string;
    gift?: GiftType;
};


const initialMessages: Message[] = [
  { id: 2, type: 'text', author: 'Jodie', text: 'Hey everyone!', avatar: "https://em-content.zobj.net/source/apple/391/woman-artist_1f469-200d-1f3a8.png"},
  { id: 3, type: 'text', author: 'saba', text: 'Hi...', avatar: "https://em-content.zobj.net/source/apple/391/woman-technologist_1f469-200d-1f4bb.png"},
];

const roomSeats = [
    { id: 1, user: { name: "Jodie", avatar: "https://em-content.zobj.net/source/apple/391/woman-artist_1f469-200d-1f3a8.png", isMuted: false, frame: 'crimson-danger' }, isOccupied: true },
    { id: 2, user: { name: "Koko", avatar: "https://em-content.zobj.net/source/apple/391/man-health-worker_1f468-200d-2695-fe0f.png", isMuted: false, frame: 'purple' }, isOccupied: true },
    { id: 3, user: { name: "User 3", avatar: "https://em-content.zobj.net/source/apple/391/woman-wearing-turban_1f473-200d-2640-fe0f.png", isMuted: true, frame: 'pink' }, isOccupied: true },
    { id: 4, user: { name: "Lexa", avatar: "https://em-content.zobj.net/source/apple/391/man-in-tuxedo_1f935.png", isMuted: true, frame: 'blue' }, isOccupied: true },
    { id: 5, user: { name: "mhay", avatar: "https://em-content.zobj.net/source/apple/391/woman-with-headscarf_1f9d5.png", isMuted: true, frame: 'green' }, isOccupied: true },
    { id: 6, user: { name: "saba", avatar: "https://em-content.zobj.net/source/apple/391/woman-technologist_1f469-200d-1f4bb.png", isMuted: false, frame: 'red' }, isOccupied: true },
    { id: 7, user: { name: "MR ISMAIL", avatar: "https://em-content.zobj.net/source/apple/391/man-supervillain_1f9b9-200d-2642-fe0f.png", isMuted: false, frame: 'cyan' }, isOccupied: true },
    { id: 8, user: { name: "Riz", avatar: "https://em-content.zobj.net/source/apple/391/ninja_1f977.png", isMuted: false, frame: 'teal' }, isOccupied: true },
]

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


export default function VideoRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const owner = { name: "op_2", avatar: "https://em-content.zobj.net/source/apple/391/man-superhero_1f9b8-200d-2642-fe0f.png", isOwner: true };
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        // Sending logic would be here
    };

    const handleStartGame = (gameName: string) => {
        setIsGamePanelOpen(false);
        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'game',
                author: 'You',
                text: `started playing ${gameName}!`,
                game: gameName,
                avatar: "https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png"
            }
        ]);
    };
    
    const specialFrames: {[key: string]: {img: string}} = {
        'crimson-danger': { img: 'https://i.imgur.com/DADsWdw.gif' },
    }

    const frameColors: {[key: string]: string} = {
        gold: 'border-yellow-400 animate-glow-gold',
        purple: 'border-fuchsia-500 animate-glow-purple',
        blue: 'border-blue-400 animate-glow-blue',
        green: 'border-green-500 animate-glow-green',
        red: 'border-red-500 animate-glow-red',
        cyan: 'border-cyan-500 animate-glow-cyan',
        pink: 'border-pink-500 animate-glow-pink',
        teal: 'border-teal-400 animate-glow-teal',
        orange: 'border-orange-500 animate-glow-orange',
        indigo: 'border-indigo-500 animate-glow-indigo',
    }

    const occupiedSeats = roomSeats.filter(seat => seat.isOccupied && seat.user);

    return (
        <div className="flex flex-col h-screen bg-[#180828] text-white font-sans overflow-hidden">
            {/* Video Player Section */}
            <div className="relative w-full bg-black h-[45%] flex-shrink-0">
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
                                        <AvatarImage src={owner.avatar} unoptimized/>
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
                                <span className="font-bold">{occupiedSeats.length}</span>
                            </Button>
                             <Button variant="ghost" size="icon" className="text-white/80 bg-black/20 rounded-full">
                                <Maximize />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Interactive Panel */}
            <div className="flex-1 flex flex-col overflow-hidden bg-[#2E103F]">
                 {/* Seats */}
                <div className="w-full flex-shrink-0 py-2">
                    <div className="grid grid-cols-8 gap-2 justify-items-center px-2">
                        {roomSeats.map((seat) => (
                            <div key={seat.id} className="flex flex-col items-center gap-1 w-full text-center">
                                {seat.isOccupied && seat.user ? (
                                    <>
                                        <div className="relative w-9 h-9 flex items-center justify-center">
                                            {seat.user.frame && specialFrames[seat.user.frame] && (
                                                <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="absolute -inset-1 pointer-events-none animate-pulse-luxury" />
                                            )}
                                            <Avatar className={cn("w-9 h-9 border-2", seat.user.frame && !specialFrames[seat.user.frame] && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} unoptimized />
                                                <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-0.5 z-10">
                                                {seat.user.isMuted ? 
                                                    <Mic className="w-2.5 h-2.5 text-red-500" /> :
                                                    <Mic className="w-2.5 h-2.5 text-green-400" />
                                                }
                                            </div>
                                        </div>
                                        <p className="text-[10px] truncate w-full">{seat.user.name}</p>
                                    </>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                        {(seat as any).isLocked ? <Lock className="w-4 h-4 text-white/50"/> : <span className="text-sm font-bold text-white/50">{seat.id}</span>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Chat Panel */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-3 px-4 pb-2">
                    {messages.map((msg) => (
                        <Fragment key={msg.id}>
                            {msg.type === 'notification' ? (
                                <div className="text-center text-xs text-white/50 p-1">
                                    {msg.text}
                                </div>
                            ) : (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={msg.avatar} unoptimized />
                                        <AvatarFallback className="bg-primary/50 text-primary-foreground text-xs">{msg.author?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="text-white/70 text-xs">{msg.author}</p>
                                         {msg.type === 'game' ? (
                                             <p className="mt-1 text-xs">{msg.author} <span className="font-bold text-yellow-400">{msg.text}</span></p>
                                         ) : (
                                            <div className="bg-black/20 rounded-lg p-2 mt-1">
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                         )}
                                    </div>
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
            
            <footer className="flex-shrink-0 bg-[#1F0A2E] border-t border-white/10 relative">
                <div className="p-2">
                    <div className="flex items-center justify-around gap-2">
                        <div className="flex-grow flex items-center gap-2 bg-black/30 rounded-full h-10 px-2">
                           <Avatar className="h-7 w-7">
                               <AvatarImage src="https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png" unoptimized />
                               <AvatarFallback>Y</AvatarFallback>
                           </Avatar>
                            <Input
                                autoComplete="off"
                                name="message"
                                placeholder="Hi..."
                                className="bg-transparent border-0 rounded-full text-white h-full p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                            />
                             <Button type="submit" size="icon" variant="ghost" className="text-white/80 hover:text-white w-8 h-8 flex-shrink-0" disabled={!newMessage.trim()}>
                                <SendIcon />
                            </Button>
                        </div>
                        <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0">
                            <Mic />
                        </Button>
                         <Button type="button" size="icon" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex-shrink-0" onClick={() => setIsGamePanelOpen(true)}><Gamepad2 /></Button>
                         <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0">
                            <RectangleVertical />
                        </Button>
                         <Button 
                            type="button" 
                            size="icon" 
                            className="w-10 h-10 rounded-full flex-shrink-0 bg-yellow-500 hover:bg-yellow-600"
                        >
                            <Gift />
                        </Button>
                    </div>
                </div>
            </footer>

            <Sheet open={isGamePanelOpen} onOpenChange={setIsGamePanelOpen}>
                <SheetContent side="bottom" className="bg-[#1F0A2E] border-t-2 border-primary/50 text-white rounded-t-2xl" style={{ height: '45vh' }}>
                    <SheetHeader>
                        <div className="flex justify-between items-center mb-4">
                            <SheetTitle className="text-2xl font-headline text-white flex items-center gap-2"><Gamepad2 /> Game Center</SheetTitle>
                            <div className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1 border border-white/20">
                                <Coins className="w-5 h-5 text-yellow-400" />
                                <span className="font-bold text-lg">1,250</span>
                            </div>
                        </div>
                    </SheetHeader>
                    <ScrollArea className="h-[calc(45vh-80px)]">
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="bg-black/30 border-white/20">
                                <CardContent className="p-3 flex flex-col items-center justify-center gap-2">
                                     <div className="w-full h-24 bg-black/20 rounded-md flex items-center justify-center">
                                        <span className="text-6xl">🎯</span>
                                    </div>
                                    <h3 className="font-semibold">Spin the Wheel</h3>
                                    <div className="flex items-center gap-1 text-sm text-yellow-400">
                                        <Coins className="w-4 h-4" />
                                        <span>100</span>
                                    </div>
                                    <Button className="w-full bg-primary/80 hover:bg-primary" onClick={() => handleStartGame('Spin the Wheel')}>Play</Button>
                                </CardContent>
                            </Card>
                             <Card className="bg-black/30 border-white/20">
                                <CardContent className="p-3 flex flex-col items-center justify-center gap-2">
                                    <div className="w-full h-24 bg-black/20 rounded-md flex items-center justify-center">
                                        <span className="text-6xl">🎲</span>
                                    </div>
                                    <h3 className="font-semibold">Ludo</h3>
                                    <div className="flex items-center gap-1 text-sm text-green-400">
                                        <span>Free</span>
                                    </div>
                                    <Button className="w-full bg-primary/80 hover:bg-primary" onClick={() => handleStartGame('Ludo')}>Play</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </div>
    );
}
