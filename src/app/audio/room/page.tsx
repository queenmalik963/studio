
"use client";

import { useState, useRef, useEffect, Fragment, createRef, useMemo, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Coins, Send as SendIconLucide, ChevronDown, RectangleVertical, Gift, X, Loader2, Crown, Upload, Flag, Megaphone, Music, UserPlus, Wand2, Trash2, MicOff, Shield, UserX, Axe, Play, Pause } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { GiftPanel, type Gift as GiftType } from "@/components/room/GiftPanel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { WalkingGiftAnimation } from "@/components/room/WalkingGiftAnimation";
import type { JumpAnimation } from "@/app/video/room/page";
import { GiftJumpAnimation } from "@/components/room/GiftJumpAnimation";


const initialMessages: any[] = [];

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

// Extracted and memoized RoomControlButton to prevent re-rendering issues with toasts
const RoomControlButton = memo(({ control }: { control: { name: string; icon: React.ElementType, action: () => void }; }) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center">
            <Button
                size="icon"
                variant="ghost"
                className="w-14 h-14 bg-black/30 rounded-2xl"
                onClick={control.action}
            >
                <control.icon className="w-7 h-7 text-white/80" />
            </Button>
            <Label className="text-xs">{control.name}</Label>
        </div>
    );
});
RoomControlButton.displayName = 'RoomControlButton';


export default function AudioRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [seats, setSeats] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);
    const [isControlsPanelOpen, setIsControlsPanelOpen] = useState(false);
    const [animatedGift, setAnimatedGift] = useState<GiftType | null>(null);
    const [animatedVideoGift, setAnimatedVideoGift] = useState<string | null>(null);
    const [animatedWalkingGift, setAnimatedWalkingGift] = useState<string | null>(null);
    const [jumpAnimations, setJumpAnimations] = useState<JumpAnimation[]>([]);
    const [isPersonalMicMuted, setIsPersonalMicMuted] = useState(true);
    const [areEffectsEnabled, setAreEffectsEnabled] = useState(true);
    const [coins, setCoins] = useState(0);

    // Audio Player State
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const seatRefs = useRef(seats.map(() => createRef<HTMLDivElement>()));
    const sendButtonRef = useRef<HTMLButtonElement>(null);
    const lastMessageCount = useRef(messages.length);

    const owner = { name: "op_2", avatar: "https://em-content.zobj.net/source/apple/391/man-superhero_1f9b8-200d-2642-fe0f.png", isOwner: true };
    const currentUserIsOwner = true; // For simulation

     useEffect(() => {
        const seatCount = parseInt(localStorage.getItem('audio_room_seats') || '8', 10);
        const initialSeats = Array.from({ length: seatCount }, (_, i) => ({
            id: i + 1,
            isOccupied: false,
            user: null,
            isLocked: false,
        }));
        setSeats(initialSeats);
    }, []);

    
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        // Only scroll if the user is near the bottom
        const isScrolledToBottom = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 100;

        if (messages.length > lastMessageCount.current && isScrolledToBottom) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        lastMessageCount.current = messages.length;
    }, [messages]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages(prev => [
                ...prev,
                {
                    id: prev.length + 1,
                    type: "text",
                    author: "You",
                    text: newMessage,
                    avatar: "https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png",
                },
            ]);
            setNewMessage("");
            inputRef.current?.blur();
        }
    };

    const handleSendGift = (gift: GiftType, quantity: number, recipient: string) => {
        const totalCost = gift.price * quantity;
        if (coins < totalCost) {
            toast({
                title: "Not enough coins",
                description: "You need more coins to send this gift. Please recharge.",
                variant: "destructive",
            });
            return;
        }
        setCoins(prev => prev - totalCost);
        
        if (gift.animation === 'walking') {
            setAnimatedWalkingGift(gift.image);
            setTimeout(() => setAnimatedWalkingGift(null), 5000); // 5s animation duration
        } else if (gift.animation === 'fullscreen-video' && gift.videoUrl) {
            setAnimatedVideoGift(gift.videoUrl);
            setTimeout(() => {
                setAnimatedVideoGift(null);
            }, 5000); // Video duration + buffer
        } else if (gift.animation === 'jump-to-seat') {
            const startRect = sendButtonRef.current?.getBoundingClientRect();
            if (!startRect) return;

            let targetSeats: (typeof seats[0])[] = [];

            if (recipient === 'All in Room') {
                targetSeats = seats.filter(s => s.isOccupied);
            } else if (recipient === 'All on Mic') {
                targetSeats = seats.filter(s => s.isOccupied && s.user && !s.user.isMuted);
            } else {
                const targetSeat = seats.find(s => s.isOccupied && s.user?.name === recipient);
                if (targetSeat) {
                    targetSeats.push(targetSeat);
                }
            }
            
            const newAnimations: JumpAnimation[] = [];
            targetSeats.forEach(seat => {
                const seatIndex = seats.findIndex(s => s.id === seat.id);
                if (seatIndex === -1) return;

                const endRect = seatRefs.current[seatIndex].current?.getBoundingClientRect();
                if (endRect) {
                    for (let i = 0; i < quantity; i++) {
                         newAnimations.push({
                            id: Date.now() + Math.random(),
                            gift,
                            startX: startRect.x + startRect.width / 2,
                            startY: startRect.y + startRect.height / 2,
                            endX: endRect.x + endRect.width / 2,
                            endY: endRect.y + endRect.height / 2,
                        });
                    }
                }
            });
            setJumpAnimations(prev => [...prev, ...newAnimations]);

        } else if (gift.animation) {
             handleAnimateGift(gift);
        }

        setMessages(prev => [
            ...prev,
            {
                id: Date.now(),
                type: 'gift',
                author: 'You',
                text: `Sent ${quantity}x ${gift.name} to ${recipient}`,
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
        toast({
            title: "Game Started!",
            description: `You have started playing ${gameName}.`,
        });
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
            const trackUrl = URL.createObjectURL(file);
            setAudioSrc(trackUrl);
            setIsPlaying(true); // Auto-play on select
            toast({
                title: "Track Selected!",
                description: `"${file.name}" is now playing.`,
            });
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now(),
                    type: 'system',
                    text: `Owner selected "${file.name}" to play.`,
                }
            ]);
            setIsControlsPanelOpen(false);
        }
    };
    
     useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying && audioSrc) {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, audioSrc]);

    const handleTogglePersonalMic = () => {
        setIsPersonalMicMuted(prev => !prev);
    };

    const roomControls = useMemo(() => [
        { name: "Gathering", icon: Flag, action: () => {
            toast({ title: "Gathering Started!", description: "Special room effects are now active." });
            setMessages(prev => [...prev, { id: Date.now(), type: 'system', text: 'A gathering has been started by the owner!' }]);
            setIsControlsPanelOpen(false);
        }},
        { name: "Broadcast", icon: Megaphone, action: () => {
            toast({ title: "Broadcast Sent!", description: "Your message has been sent to all users." });
            setMessages(prev => [...prev, { id: Date.now(), type: 'system', text: 'Broadcast: Welcome to the room everyone! Enjoy your stay.' }]);
            setIsControlsPanelOpen(false);
        }},
        { name: "Play Track", icon: Play, action: () => {
            if (audioSrc) {
                setIsPlaying(true);
                toast({ title: "Music Resumed" });
            } else {
                toast({ title: "No Track", description: "Please upload a track first.", variant: "destructive" });
            }
            setIsControlsPanelOpen(false);
        }},
        { name: "Pause Track", icon: Pause, action: () => {
            if (audioSrc) {
                setIsPlaying(false);
                toast({ title: "Music Paused" });
            }
             setIsControlsPanelOpen(false);
        }},
        { name: "Upload", icon: Upload, action: () => fileInputRef.current?.click() },
        { name: "Invite", icon: UserPlus, action: () => {
             toast({ title: "Invite Link Copied!", description: "Share it with your friends to join the room." });
             navigator.clipboard.writeText(window.location.href);
             setIsControlsPanelOpen(false);
        }},
        { name: "Effect", icon: Wand2, action: () => {
            setAreEffectsEnabled(prev => {
                const newState = !prev;
                toast({ title: `Room Effects ${newState ? 'On' : 'Off'}` });
                return newState;
            });
            setIsControlsPanelOpen(false);
        }},
        { name: "Clean", icon: Trash2, action: () => {
            setMessages(prev => prev.filter(m => m.type !== 'text'));
            toast({ title: "Chat Cleared!", description: "The chat history has been cleared by the owner." });
             setIsControlsPanelOpen(false);
        }},
    ], [toast, audioSrc, setAreEffectsEnabled]);

    const handleSeatAction = (action: 'mute' | 'kick' | 'lock', seatId: number) => {
        const targetSeat = seats.find(seat => seat.id === seatId);
        if (!targetSeat) return;
        
        if (action === 'mute' && targetSeat.user) {
            toast({ title: `User ${targetSeat.user.name} ${targetSeat.user.isMuted ? 'unmuted' : 'muted'}.`});
        } else if (action === 'kick' && targetSeat.user) {
            toast({ title: `User ${targetSeat.user.name} has been kicked from the seat.`});
        } else if (action === 'lock') {
            toast({ title: `Seat ${targetSeat.id} has been ${targetSeat.isLocked ? 'unlocked' : 'locked'}.`});
        }
        
        setSeats(prevSeats => prevSeats.map(seat => {
            if (seat.id === seatId) {
                switch(action) {
                    case 'mute':
                        if (seat.user) {
                            return {...seat, user: {...seat.user, isMuted: !seat.user.isMuted}};
                        }
                        break;
                    case 'kick':
                        if (seat.user) {
                            return {...seat, user: null, isOccupied: false};
                        }
                        break;
                    case 'lock':
                        return {...seat, isLocked: !seat.isLocked };
                }
            }
            return seat;
        }));
    };

    const specialFrames: {[key: string]: {img: string}} = {
        'master': { img: 'https://i.imgur.com/DADsWdw.gif' },
        'dragon-fury': { img: 'https://i.imgur.com/DADsWdw.gif' },
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
        master: 'border-purple-400 animate-glow-purple',
        platinum: 'border-cyan-300 animate-glow-cyan',
        'dragon-fury': 'border-red-500 animate-glow-red',
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

    const occupiedSeats = seats.filter(seat => seat.isOccupied && seat.user);

    return (
        <div className="flex flex-col h-screen bg-[#2E103F] text-white font-sans overflow-hidden">
             {audioSrc && <audio ref={audioRef} src={audioSrc} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
             {animatedWalkingGift && <WalkingGiftAnimation giftImage={animatedWalkingGift} />}
             {animatedGift && !animatedVideoGift && (
                <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <Image
                        src={animatedGift.image}
                        alt={animatedGift.name}
                        width={256}
                        height={256}
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
                        <PopoverContent className="w-48 p-2 bg-black/50 backdrop-blur-md border-white/20 text-white">
                            <ScrollArea className="h-48">
                                <div className="space-y-2">
                                    {occupiedSeats.map((seat) => (
                                       seat.user && <div key={seat.id} className="flex items-center gap-3 p-1 rounded-md hover:bg-white/10">
                                            <div className="relative w-9 h-9 flex items-center justify-center">
                                                {areEffectsEnabled && (
                                                    <>
                                                        {seat.user.frame && specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-3px] pointer-events-none">
                                                                <Image src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                            </div>
                                                        )}
                                                        {seat.user.frame && !specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                        )}
                                                    </>
                                                )}
                                                <Avatar className={cn("h-full w-full border-2 bg-background", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                    <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                    <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{seat.user.name}</p>
                                                {areEffectsEnabled && seat.user.frame && frameBorderColors[seat.user.frame] && (
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
                        {seats.slice(0, 5).map((seat, index) => {
                            return (
                                <Popover key={seat.id}>
                                    <PopoverTrigger asChild disabled={!currentUserIsOwner && !seat.user}>
                                        <div ref={seatRefs.current[index]} className="flex flex-col items-center gap-1 w-[50px] text-center cursor-pointer">
                                            {seat.isOccupied && seat.user ? (
                                                <>
                                                    <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                                                        {areEffectsEnabled && seat.user.frame && specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-4px] pointer-events-none">
                                                                <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                            </div>
                                                        )}
                                                        {areEffectsEnabled && seat.user.frame && !specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                        )}
                                                        
                                                        <Avatar className={cn("w-full h-full border-2 bg-[#2E103F]", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                            {seat.user.isMuted ? 
                                                                <MicOff className="w-3 h-3 text-red-500" /> :
                                                                <Mic className="w-3 h-3 text-green-400" />
                                                            }
                                                        </div>
                                                    </div>
                                                    <p className="text-xs truncate w-full">{seat.user.name}</p>
                                                </>
                                            ) : (
                                                <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50" /> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                                </div>
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                     <PopoverContent className="w-40 p-1 bg-black/80 backdrop-blur-md border-white/20 text-white">
                                        <div className="flex flex-col gap-1">
                                            {seat.user && (
                                                <>
                                                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('mute', seat.id)}>
                                                        {seat.user.isMuted ? <Mic /> : <MicOff />} {seat.user.isMuted ? 'Unmute' : 'Mute Mic'}
                                                    </Button>
                                                     <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('kick', seat.id)}><UserX /> Kick User</Button>
                                                    <Button variant="ghost" size="sm" className="justify-start text-destructive hover:text-destructive"><Axe /> Ban User</Button>
                                                    <Separator className="my-1" />
                                                </>
                                            )}
                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('lock', seat.id)}>
                                                <Lock /> {seat.isLocked ? 'Unlock Seat' : 'Lock Seat'}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                    </div>
                     <div className="grid grid-cols-5 gap-y-1 gap-x-2 justify-items-center">
                        {seats.slice(5, 10).map((seat, index) => {
                             return (
                                <Popover key={seat.id}>
                                    <PopoverTrigger asChild disabled={!currentUserIsOwner && !seat.user}>
                                        <div ref={seatRefs.current[index+5]} className="flex flex-col items-center gap-1 w-[50px] text-center cursor-pointer">
                                            {seat.isOccupied && seat.user ? (
                                                <>
                                                <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                                                    {areEffectsEnabled && seat.user.frame && specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-4px] pointer-events-none">
                                                            <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                        </div>
                                                    )}
                                                    {areEffectsEnabled && seat.user.frame && !specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                    )}
                                                    <Avatar className={cn("w-full h-full border-2 bg-[#2E103F]", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                        <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                        <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                        {seat.user.isMuted ? 
                                                            <MicOff className="w-3 h-3 text-red-500" /> :
                                                            <Mic className="w-3 h-3 text-green-400" />
                                                        }
                                                    </div>
                                                </div>
                                                <p className="text-xs truncate w-full">{seat.user.name}</p>
                                                </>
                                            ) : (
                                            <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50" /> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                                </div>
                                        ) }
                                        </div>
                                    </PopoverTrigger>
                                     <PopoverContent className="w-40 p-1 bg-black/80 backdrop-blur-md border-white/20 text-white">
                                        <div className="flex flex-col gap-1">
                                            {seat.user && (
                                                <>
                                                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('mute', seat.id)}>
                                                        {seat.user.isMuted ? <Mic /> : <MicOff />} {seat.user.isMuted ? 'Unmute' : 'Mute Mic'}
                                                    </Button>
                                                     <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('kick', seat.id)}><UserX /> Kick User</Button>
                                                    <Button variant="ghost" size="sm" className="justify-start text-destructive hover:text-destructive"><Axe /> Ban User</Button>
                                                    <Separator className="my-1" />
                                                </>
                                            )}
                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('lock', seat.id)}>
                                                <Lock /> {seat.isLocked ? 'Unlock Seat' : 'Lock Seat'}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                    </div>
                    <div className="grid grid-cols-5 gap-y-1 gap-x-2 justify-items-center">
                        {seats.slice(10, 15).map((seat, index) => {
                             return (
                                <Popover key={seat.id}>
                                    <PopoverTrigger asChild disabled={!currentUserIsOwner && !seat.user}>
                                        <div ref={seatRefs.current[index+10]} className="flex flex-col items-center gap-1 w-[50px] text-center cursor-pointer">
                                            {seat.isOccupied && seat.user ? (
                                                <>
                                                <div className="relative w-[50px] h-[50px] flex items-center justify-center">
                                                     {areEffectsEnabled && seat.user.frame && specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-4px] pointer-events-none">
                                                            <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                        </div>
                                                    )}
                                                     {areEffectsEnabled && seat.user.frame && !specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                    )}
                                                    <Avatar className={cn("w-full h-full border-2 bg-[#2E103F]", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                        <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                        <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                        {seat.user.isMuted ? 
                                                            <MicOff className="w-3 h-3 text-red-500" /> :
                                                            <Mic className="w-3 h-3 text-green-400" />
                                                        }
                                                    </div>
                                                </div>
                                                <p className="text-xs truncate w-full">{seat.user.name}</p>
                                                </>
                                            ) : (
                                            <div className="w-[50px] h-[50px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50" /> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                                </div>
                                        )}
                                        </div>
                                    </PopoverTrigger>
                                     <PopoverContent className="w-40 p-1 bg-black/80 backdrop-blur-md border-white/20 text-white">
                                        <div className="flex flex-col gap-1">
                                            {seat.user && (
                                                <>
                                                    <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('mute', seat.id)}>
                                                        {seat.user.isMuted ? <Mic /> : <MicOff />} {seat.user.isMuted ? 'Unmute' : 'Mute Mic'}
                                                    </Button>
                                                     <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('kick', seat.id)}><UserX /> Kick User</Button>
                                                    <Button variant="ghost" size="sm" className="justify-start text-destructive hover:text-destructive"><Axe /> Ban User</Button>
                                                    <Separator className="my-1" />
                                                </>
                                            )}
                                            <Button variant="ghost" size="sm" className="justify-start" onClick={() => handleSeatAction('lock', seat.id)}>
                                                <Lock /> {seat.isLocked ? 'Unlock Seat' : 'Lock Seat'}
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        })}
                    </div>
                </div>

                <div className="flex-1 mt-2 relative p-0">
                    {isGiftPanelOpen ? (
                        <GiftPanel onSendGift={handleSendGift} sendButtonRef={sendButtonRef} roomSeats={seats} coins={coins} />
                    ) : (
                        <div ref={chatContainerRef} className="absolute inset-0 overflow-y-auto space-y-3 px-4 pr-2">
                            {messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <p>Say hi and start the party!</p>
                                </div>
                            ) : messages.map((msg) => (
                                <Fragment key={msg.id}>
                                    {msg.type === 'system' ? (
                                        <div className="text-center text-xs text-primary font-semibold p-1 bg-primary/10 rounded-full">
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <div className="flex items-start gap-3">
                                            <Avatar className="h-8 w-8 shrink-0">
                                                <AvatarImage src={msg.avatar} />
                                                <AvatarFallback className="bg-primary/50 text-primary-foreground text-xs">{msg.author?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm">
                                                <p className="text-white/70 text-xs">{msg.author}</p>
                                                {msg.type === 'gift' && (
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-xs">{msg.text}</p>
                                                        {msg.giftIcon && <Image src={msg.giftIcon} alt="gift" width={16} height={16}/>}
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
                                    )}
                                </Fragment>
                            ))}
                        </div>
                    )}
                 </div>
            </main>
            
            <footer className="flex-shrink-0 bg-[#1F0A2E] border-t border-white/10 relative">
                <form onSubmit={handleSendMessage} className="p-2">
                     <div className="flex items-center justify-around gap-2">
                        <div className="flex-grow flex items-center gap-2 bg-black/30 rounded-full h-10 px-2">
                           <Avatar className="h-7 w-7">
                               <AvatarImage src="https://em-content.zobj.net/source/apple/391/man-mage_1f9d9-200d-2642-fe0f.png" />
                               <AvatarFallback>Y</AvatarFallback>
                           </Avatar>
                            <Input
                                ref={inputRef}
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
                        <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0" onClick={handleTogglePersonalMic}>
                           {isPersonalMicMuted ? <MicOff /> : <Mic />}
                        </Button>
                         <Button type="button" size="icon" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex-shrink-0" onClick={() => setIsGamePanelOpen(true)}><Gamepad2 /></Button>
                         <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0" onClick={() => setIsControlsPanelOpen(true)}>
                            <RectangleVertical />
                        </Button>
                         <Button 
                            type="button" 
                            size="icon"
                            ref={sendButtonRef}
                            className={cn(
                                "w-10 h-10 rounded-full flex-shrink-0",
                                isGiftPanelOpen ? "bg-primary" : "bg-yellow-500 hover:bg-yellow-600"
                            )}
                            onClick={() => setIsGiftPanelOpen(!isGiftPanelOpen)}
                         >
                            <Gift />
                        </Button>
                    </div>
                </form>
            </footer>

            <Sheet open={isGamePanelOpen} onOpenChange={setIsGamePanelOpen}>
                <SheetContent side="bottom" className="bg-[#1F0A2E] border-t-2 border-primary/50 text-white rounded-t-2xl" style={{ height: '45vh' }}>
                    <SheetHeader>
                        <div className="flex justify-between items-center mb-4">
                            <SheetTitle className="text-2xl font-headline text-white flex items-center gap-2"><Gamepad2 /> Game Center</SheetTitle>
                            <div className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1 border border-white/20">
                                <Coins className="w-5 h-5 text-yellow-400" />
                                <span className="font-bold text-lg">{coins.toLocaleString()}</span>
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
                            accept="audio/mp3,audio/wav,audio/ogg"
                            className="hidden"
                        />
                        <div className="grid grid-cols-4 gap-4">
                           {roomControls.map((control) => (
                                <RoomControlButton key={control.name} control={control} />
                           ))}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
