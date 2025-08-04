
"use client";

import { useState, useRef, useEffect, Fragment, createRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Coins, Send as SendIconLucide, ChevronDown, RectangleVertical, Gift, X, Loader2, Crown, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { GiftPanel, type Gift as GiftType } from "@/components/room/GiftPanel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GiftJumpAnimation } from "@/components/room/GiftJumpAnimation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";


const initialMessages = [
  { id: 1, type: 'gift', author: 'Jodie', text: 'Sent a RedRose', giftIcon: 'https://em-content.zobj.net/source/apple/391/rose_1f339.png', avatar: "https://em-content.zobj.net/source/apple/391/woman-artist_1f469-200d-1f3a8.png" },
  { id: 2, type: 'game', author: 'Jodie', text: 'started playing Fruit!', game: 'Fruit!', avatar: "https://em-content.zobj.net/source/apple/391/woman-artist_1f469-200d-1f3a8.png" },
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
    { id: 9, user: { name: "User 9", avatar: "https://em-content.zobj.net/source/apple/391/ghost_1f47b.png", isMuted: true, frame: 'orange' }, isOccupied: true },
    { id: 10, user: { name: "User 10", avatar: "https://em-content.zobj.net/source/apple/391/robot_1f916.png", isMuted: false, frame: 'indigo' }, isOccupied: true },
    { id: 11, user: { name: "User 11", avatar: "https://em-content.zobj.net/source/apple/391/alien_1f47d.png", isMuted: false, frame: 'lime' }, isOccupied: true },
    { id: 12, user: { name: "User 12", avatar: "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png", isMuted: true, frame: 'rose' }, isOccupied: true },
    { id: 13, user: { name: "User 13", avatar: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", isMuted: false, frame: 'emerald' }, isOccupied: true },
    { id: 14, user: { name: "User 14", avatar: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", isMuted: true, frame: 'sky' }, isOccupied: true },
    { id: 15, user: { name: "User 15", avatar: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", isMuted: false, frame: 'amber' }, isOccupied: true },
]

export type JumpAnimation = {
    id: number;
    gift: GiftType;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


export default function AudioRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);
    const [isControlsPanelOpen, setIsControlsPanelOpen] = useState(false);
    const [animatedGift, setAnimatedGift] = useState<GiftType | null>(null);
    const [animatedVideoGift, setAnimatedVideoGift] = useState<string | null>(null);
    const [jumpAnimations, setJumpAnimations] = useState<JumpAnimation[]>([]);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const seatRefs = useRef(roomSeats.map(() => createRef<HTMLDivElement>()));
    const sendButtonRef = useRef<HTMLButtonElement>(null);


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

    const handleSendGift = (gift: GiftType) => {
        if (gift.animation === 'fullscreen-video' && gift.videoUrl) {
            setAnimatedVideoGift(gift.videoUrl);
            setTimeout(() => {
                setAnimatedVideoGift(null);
            }, 5000); // Video duration + buffer
        } else if (gift.animation === 'jump-to-seat') {
            const startRect = sendButtonRef.current?.getBoundingClientRect();
            // Just sending to the first seat for demonstration
            const endRect = seatRefs.current[0].current?.getBoundingClientRect();

            if (startRect && endRect) {
                const newAnimation: JumpAnimation = {
                    id: Date.now(),
                    gift,
                    startX: startRect.x + startRect.width / 2,
                    startY: startRect.y + startRect.height / 2,
                    endX: endRect.x + endRect.width / 2,
                    endY: endRect.y + endRect.height / 2,
                };
                setJumpAnimations(prev => [...prev, newAnimation]);
            }
        } else if (gift.animation) {
             handleAnimateGift(gift);
        }

        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'gift',
                author: 'You',
                text: `Sent a ${gift.name}`,
                giftIcon: gift.image,
                avatar: "https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png"
            }
        ]);
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
    
    const handleAnimateGift = (gift: GiftType) => {
        setAnimatedGift(gift);
        setTimeout(() => {
            setAnimatedGift(null);
        }, 3000); // Animation duration
    };

    const handleAnimationComplete = (id: number) => {
        setJumpAnimations(prev => prev.filter(anim => anim.id !== id));
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    type: 'text',
                    author: 'System',
                    text: `You selected "${file.name}" to play.`,
                    avatar: "https://em-content.zobj.net/source/apple/391/robot_1f916.png" 
                }
            ]);
            setIsControlsPanelOpen(false);
        }
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
        lime: 'border-lime-400 animate-glow-lime',
        rose: 'border-rose-400 animate-glow-rose',
        emerald: 'border-emerald-400 animate-glow-emerald',
        sky: 'border-sky-400 animate-glow-sky',
        amber: 'border-amber-400 animate-glow-amber',
    }
    
    const frameBorderColors: {[key: string]: string} = {
        gold: 'border-yellow-400',
        purple: 'border-fuchsia-500',
        blue: 'border-blue-400',
        green: 'border-green-500',
        red: 'border-red-500',
        cyan: 'border-cyan-500',
        pink: 'border-pink-500',
        teal: 'border-teal-400',
        orange: 'border-orange-500',
        indigo: 'border-indigo-500',
        lime: 'border-lime-400',
        rose: 'border-rose-400',
        emerald: 'border-emerald-400',
        sky: 'border-sky-400',
        amber: 'border-amber-400',
    }

    const occupiedSeats = roomSeats.filter(seat => seat.isOccupied && seat.user);

    return (
        <div className="flex flex-col h-screen bg-[#2E103F] text-white font-sans overflow-hidden">
             {animatedGift && !animatedVideoGift && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <Image
                        src={animatedGift.image}
                        alt={animatedGift.name}
                        width={256}
                        height={256}
                        
                        className={'animate-fade-in-out'}
                    />
                </div>
            )}
             {animatedVideoGift && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/50">
                    <video src={animatedVideoGift} autoPlay className="max-w-full max-h-full"></video>
                </div>
            )}
            {jumpAnimations.map(anim => (
                <GiftJumpAnimation
                    key={anim.id}
                    {...anim}
                    onComplete={() => handleAnimationComplete(anim.id)}
                />
            ))}

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
                                <p className="text-xs text-white/70">ID: 66768</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-auto p-1 text-white/80 bg-black/20 rounded-full px-3">
                                <Users className="w-5 h-5 mr-1" />
                                <span className="font-bold">{occupiedSeats.length}</span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-2 bg-black/50 backdrop-blur-md border-white/20 text-white">
                            <ScrollArea className="h-48">
                                <div className="space-y-2">
                                    {occupiedSeats.map((seat) => (
                                        <div key={seat.id} className="flex items-center gap-3 p-1 rounded-md hover:bg-white/10">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-semibold">{seat.user.name}</p>
                                                {seat.user.frame && frameBorderColors[seat.user.frame] && (
                                                    <div className={cn("h-0.5 w-8 rounded-full", frameBorderColors[seat.user.frame])}></div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>
                </div>
            </header>

            <main className="flex-1 flex flex-col pt-0 overflow-hidden gap-2">
                 <div className="flex-shrink-0 space-y-1 px-4">
                    <div className="grid grid-cols-5 gap-y-1 gap-x-2 justify-items-center">
                        {roomSeats.slice(0, 5).map((seat, index) => (
                            <div key={seat.id} ref={seatRefs.current[index]} className="flex flex-col items-center gap-1 w-[50px] text-center">
                                {seat.isOccupied && seat.user ? (
                                    <>
                                        <div className="relative w-[54px] h-[54px] flex items-center justify-center">
                                            {seat.user.frame && specialFrames[seat.user.frame] && (
                                                <Image  src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="absolute inset-0 pointer-events-none animate-pulse-luxury" />
                                            )}
                                            <div className={cn("absolute inset-0 spinning-border animate-spin-colors rounded-full", !specialFrames[seat.user.frame] ? '' : 'hidden' )}></div>
                                            <Avatar className={cn("w-[50px] h-[50px] border-2 bg-[#2E103F]", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                {seat.user.isMuted ? 
                                                    <Mic className="w-3 h-3 text-red-500" /> :
                                                    <Mic className="w-3 h-3 text-green-400" />
                                                }
                                            </div>
                                        </div>
                                        <p className="text-xs truncate w-full">{seat.user.name}</p>
                                    </>
                                ) : (
                                    <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                        <Lock className="w-5 h-5 text-white/50"/>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                     <div className="grid grid-cols-5 gap-y-1 gap-x-2 justify-items-center">
                        {roomSeats.slice(5, 10).map((seat, index) => (
                             <div key={seat.id} ref={seatRefs.current[index + 5]} className="flex flex-col items-center gap-1 w-[50px] text-center">
                                {seat.isOccupied && seat.user ? (
                                    <>
                                       <div className="relative w-[54px] h-[54px] flex items-center justify-center">
                                            {seat.user.frame && specialFrames[seat.user.frame] && (
                                                <Image  src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="absolute inset-0 pointer-events-none animate-pulse-luxury" />
                                            )}
                                            <Avatar className={cn("w-[50px] h-[50px] border-2", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                {seat.user.isMuted ? 
                                                    <Mic className="w-3 h-3 text-red-500" /> :
                                                    <Mic className="w-3 h-3 text-green-400" />
                                                }
                                            </div>
                                        </div>
                                        <p className="text-xs truncate w-full">{seat.user.name}</p>
                                    </>
                                ) : (
                                   <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                        <span className="text-lg font-bold text-white/50">{seat.id}</span>
                                    </div>
                               )}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 gap-y-1 gap-x-2 justify-items-center">
                        {roomSeats.slice(10, 15).map((seat, index) => (
                             <div key={seat.id} ref={seatRefs.current[index + 10]} className="flex flex-col items-center gap-1 w-[50px] text-center">
                                {seat.isOccupied && seat.user ? (
                                    <>
                                       <div className="relative w-[54px] h-[54px] flex items-center justify-center">
                                             {seat.user.frame && specialFrames[seat.user.frame] && (
                                                <Image  src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="absolute inset-0 pointer-events-none animate-pulse-luxury" />
                                            )}
                                            <Avatar className={cn("w-[50px] h-[50px] border-2", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                {seat.user.isMuted ? 
                                                    <Mic className="w-3 h-3 text-red-500" /> :
                                                    <Mic className="w-3 h-3 text-green-400" />
                                                }
                                            </div>
                                        </div>
                                        <p className="text-xs truncate w-full">{seat.user.name}</p>
                                    </>
                                ) : (
                                   <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                        <span className="text-lg font-bold text-white/50">{seat.id}</span>
                                    </div>
                               )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 mt-2 relative p-0">
                    {isGiftPanelOpen ? (
                        <GiftPanel onSendGift={handleSendGift} sendButtonRef={sendButtonRef} />
                    ) : (
                        <div ref={chatContainerRef} className="absolute inset-0 overflow-y-auto space-y-3 px-4 pr-2">
                            {messages.map((msg) => (
                                <div key={msg.id} className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 shrink-0">
                                        <AvatarImage src={msg.avatar}  />
                                        <AvatarFallback className="bg-primary/50 text-primary-foreground text-xs">{msg.author?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <p className="text-white/70 text-xs">{msg.author}</p>
                                        {msg.type === 'gift' && (
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="text-xs">Sent a RedRose</p>
                                                <div className="bg-black/20 p-1 rounded-md flex items-center gap-1">
                                                    <Image  src="https://em-content.zobj.net/source/apple/391/rose_1f339.png" alt="RedRose" width={16} height={16}/>
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
                    )}
                 </div>
            </main>
            
            <footer className="flex-shrink-0 bg-[#1F0A2E] border-t border-white/10 relative">
                <div className="p-2">
                     <div className="flex items-center justify-around gap-2">
                        <div className="flex-grow flex items-center gap-2 bg-black/30 rounded-full h-10 px-2">
                           <Avatar className="h-7 w-7">
                               <AvatarImage src="https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png"  />
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
                         <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0" onClick={() => setIsControlsPanelOpen(true)}>
                            <RectangleVertical />
                        </Button>
                         <Button 
                            type="button" 
                            size="icon"
                            className={cn(
                                "w-10 h-10 rounded-full flex-shrink-0",
                                isGiftPanelOpen ? "bg-primary" : "bg-yellow-500 hover:bg-yellow-600"
                            )}
                            onClick={() => setIsGiftPanelOpen(!isGiftPanelOpen)}
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

            <Sheet open={isControlsPanelOpen} onOpenChange={setIsControlsPanelOpen}>
                <SheetContent side="bottom" className="bg-[#1F0A2E] border-t-2 border-primary/50 text-white rounded-t-2xl" style={{ height: '45vh' }}>
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-headline text-white">Room Controls</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="audio/mp3"
                            className="hidden"
                        />
                        <Card 
                            className="bg-black/30 border-white/20 cursor-pointer hover:bg-black/40"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <CardContent className="p-4 flex flex-col items-center justify-center gap-2 text-center">
                                <Upload className="w-12 h-12 text-primary" />
                                <h3 className="font-semibold text-lg">Upload Track</h3>
                                <p className="text-xs text-muted-foreground">Select an MP3 file from your device</p>
                            </CardContent>
                        </Card>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
