
"use client";

import { useState, useRef, useEffect, Fragment, createRef, memo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Coins, Send as SendIconLucide, ChevronDown, RectangleVertical, Gift, X, Loader2, Crown, Upload, Flag, Megaphone, Music, UserPlus, Wand2, Trash2, MicOff, Shield, UserX, Axe, Play, Pause } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
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
import { GiftJumpAnimation } from "@/components/room/GiftJumpAnimation";
import { SpinTheWheel } from "@/components/room/SpinTheWheel";
import { type Message, type Seat, type SeatUser, getInitialSeats, sendMessage } from "@/services/roomService";
import { useAuth } from "@/contexts/AuthContext";


type JumpAnimation = {
    id: number;
    gift: GiftType;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

const gifFrames = [
    "https://i.imgur.com/mQPDgwU.gif", // Lover's Heart
    "https://i.imgur.com/AuOpH7h.gif", // Inferno Blaze
    "https://i.imgur.com/nQPOShX.gif", // Sapphire Wave
    "https://i.imgur.com/EeLiIvo.gif", // Royal Gold
    "https://i.imgur.com/VkUd6Ab.gif"  // Galaxy Swirl
];


const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);

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
    const params = useParams();
    const roomId = params.id as string;
    
    const { userProfile } = useAuth();
    
    // State is now managed within the component, not from a mock service
    const [roomName, setRoomName] = useState("My Audio Room");
    const [messages, setMessages] = useState<Message[]>([]);
    const [seats, setSeats] = useState<Seat[]>(getInitialSeats(16));
    
    const [newMessage, setNewMessage] = useState("");
    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);
    const [isControlsPanelOpen, setIsControlsPanelOpen] = useState(false);
    const [animatedGift, setAnimatedGift] = useState<GiftType | null>(null);
    const [animatedVideoGift, setAnimatedVideoGift] = useState<string | null>(null);
    const [animatedWalkingGift, setAnimatedWalkingGift] = useState<string | null>(null);
    const [jumpAnimations, setJumpAnimations] = useState<JumpAnimation[]>([]);
    const [areEffectsEnabled, setAreEffectsEnabled] = useState(true);
    const [isGameActive, setIsGameActive] = useState(false);
    
    const currentUserIsOwner = true; // For static view, assume user is owner
    const currentUserSeat = seats.find(s => s.user?.id === userProfile?.id);

    // Audio Player State
    const [currentTrackUrl, setCurrentTrackUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const seatRefs = useRef(seats.map(() => createRef<HTMLDivElement>()));
    const sendButtonRef = useRef<HTMLButtonElement>(null);
    
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }, [messages]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);
    
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !userProfile) return;
        
        const message: Message = {
            id: Date.now().toString(),
            type: 'text',
            authorId: userProfile.id,
            authorName: userProfile.name,
            authorAvatar: userProfile.avatar,
            text: newMessage,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, message]);
        setNewMessage("");
    };

    const handleSendGift = (gift: GiftType, quantity: number, recipientName: string) => {
        if (!userProfile) return;
        
        toast({ title: "Gift Sent!", description: `You sent ${quantity}x ${gift.name} to ${recipientName}` });
        
        const giftMessage: Message = {
            id: Date.now().toString(),
            type: 'gift',
            authorId: userProfile.id,
            authorName: userProfile.name,
            authorAvatar: userProfile.avatar,
            text: `sent ${quantity}x ${gift.name} to ${recipientName}`,
            timestamp: new Date(),
            giftIcon: gift.image
        };
        setMessages(prev => [...prev, giftMessage]);
        
        if (gift.animation === 'walking') {
            setAnimatedWalkingGift(gift.image);
            setTimeout(() => setAnimatedWalkingGift(null), 5000); 
        } else if (gift.animation === 'fullscreen-video' && gift.videoUrl) {
            setAnimatedVideoGift(gift.videoUrl);
            setTimeout(() => { setAnimatedVideoGift(null); }, 5000); 
        } else if (gift.animation === 'jump-to-seat') {
            handleAnimateJump(gift, quantity, recipientName);
        } else if (gift.animation) {
             handleAnimateGift(gift);
        }
    };
    
    const handleAnimateJump = (gift: GiftType, quantity: number, recipientName: string) => {
        const startRect = sendButtonRef.current?.getBoundingClientRect();
        if (!startRect) return;

        let recipientsToAnimate: { id: string, name: string }[] = [];
        if (recipientName === 'All in Room' || recipientName === 'All on Mic') {
            recipientsToAnimate = seats.filter(s => s.user).map(s => s.user as SeatUser);
        } else {
            const targetSeat = seats.find(s => s.user?.name === recipientName);
            if (targetSeat?.user) recipientsToAnimate.push(targetSeat.user);
        }

        const newAnimations: JumpAnimation[] = [];
        recipientsToAnimate.forEach(recipient => {
            const seatIndex = seats.findIndex(s => s.user?.id === recipient.id);
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
    }
    
    const handleStartGame = (gameName: string) => {
        setIsGamePanelOpen(false);
        setIsGameActive(true);
        sendMessage(roomId, {
            type: 'system',
            text: `The host has started a game of ${gameName}!`
        });
    };

    const handleEndGame = () => {
        setIsGameActive(false);
        toast({ title: "Game Ended", description: "The game has been stopped." });
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
    
    const togglePlay = () => {
        setIsPlaying(prev => {
            const newState = !prev;
            toast({ title: `Music ${newState ? 'Resumed' : 'Paused'}` });
            return newState;
        });
    };

    const handleTogglePersonalMic = () => {
        toast({ title: "Mic Toggled" });
    };

    const handleSeatClick = (seat: any) => {
        toast({ title: `Seat ${seat.id} Clicked` });
    };
    
    const handleSeatAction = (action: 'mute' | 'kick' | 'lock', seatId: number) => {
        toast({ title: `Action '${action}' on seat ${seatId}` });
    };

    const roomControls = [
        { name: "Gathering", icon: Flag, action: () => { toast({ title: "Gathering Started!", description: "Special room effects are now active." }); setIsControlsPanelOpen(false); } },
        { name: "Broadcast", icon: Megaphone, action: () => { toast({ title: "Broadcast Sent!", description: "Your message has been sent to all users." }); setIsControlsPanelOpen(false); } },
        { name: "Play Track", icon: Play, action: () => { togglePlay(); setIsControlsPanelOpen(false); } },
        { name: "Pause Track", icon: Pause, action: () => { togglePlay(); setIsControlsPanelOpen(false); } },
        { name: "Upload", icon: Upload, action: () => { router.push('/audio/add'); toast({title: "Redirecting...", description: "Create a new room to play another track."});} },
        { name: "Invite", icon: UserPlus, action: () => { navigator.clipboard.writeText(window.location.href); toast({ title: "Invite Link Copied!", description: "Share it with your friends to join the room." }); setIsControlsPanelOpen(false); } },
        { name: "Effect", icon: Wand2, action: () => { setAreEffectsEnabled(prev => { const newState = !prev; toast({ title: `Room Effects ${newState ? 'On' : 'Off'}` }); return newState; }); setIsControlsPanelOpen(false); } },
        { name: "Clean", icon: Trash2, action: () => { setMessages(prev => prev.filter(m => m.type !== 'text')); toast({ title: "Chat Cleared!", description: "The chat history has been cleared by the owner." }); setIsControlsPanelOpen(false); } },
    ];
    
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

    const occupiedSeats = seats.filter(seat => seat.user);

    const renderSeats = () => {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            const rowSeats = seats.slice(i * 4, i * 4 + 4);
            const rowFrame = gifFrames[i % gifFrames.length]; // Assign a frame per row

            rows.push(
                <div key={`row-${i}`} className="grid grid-cols-4 gap-y-3 gap-x-3 justify-items-center">
                    {rowSeats.map((seat, index) => {
                        const seatIndex = i * 4 + index;
                        if (!seat) return null;
                        
                        const isSeatActionable = currentUserIsOwner && seat.user;
                        
                        return (
                            <Popover key={seat.id}>
                                <PopoverTrigger asChild disabled={!isSeatActionable}>
                                    <div 
                                        ref={seatRefs.current[seatIndex]} 
                                        className="flex flex-col items-center gap-1.5 w-[65px] text-center cursor-pointer"
                                        onClick={() => handleSeatClick(seat)}
                                    >
                                        <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                                            {areEffectsEnabled && (
                                                 <Image
                                                    unoptimized
                                                    src={rowFrame}
                                                    alt="Seat Frame"
                                                    layout="fill"
                                                    className="absolute inset-[-12px] pointer-events-none"
                                                />
                                            )}
                                            {seat.user ? (
                                                <>
                                                    <Avatar className="w-[55px] h-[55px] bg-[#2E103F]">
                                                        <AvatarImage src={seat.user.avatar} alt={seat.user.name} data-ai-hint="person portrait"/>
                                                        <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1 z-10">
                                                        {seat.user.isMuted ? 
                                                            <MicOff className="w-3 h-3 text-red-500" /> :
                                                            <Mic className="w-3 h-3 text-green-400" />
                                                        }
                                                    </div>
                                                    <p className="absolute -bottom-5 text-xs truncate w-full">{seat.user.name}</p>
                                                </>
                                            ) : (
                                                <div className="w-[55px] h-[55px] rounded-full bg-black/20 flex items-center justify-center border-2 border-dashed border-white/20">
                                                    {seat.isLocked ? <Lock className="w-6 h-6 text-white/50" /> : <span className="text-xl font-bold text-white/50">{seat.id}</span>}
                                                </div>
                                            )}
                                        </div>
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
            );
        }
        return rows;
    };


    if (!userProfile) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#2E103F] text-white">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-[#2E103F] text-white font-sans overflow-hidden">
             <audio ref={audioRef} loop src={currentTrackUrl} />
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
                    <div className="flex items-center gap-2">
                         <Avatar className="h-10 w-10 border-2 border-yellow-400">
                            <AvatarImage src={userProfile.avatar} />
                            <AvatarFallback>{userProfile.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{roomName}</p>
                            <p className="text-xs text-white/70">ID: {roomId.substring(0, 6)}</p>
                        </div>
                    </div>
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
                                    {occupiedSeats.map((seat) => {
                                        return seat.user && <div key={seat.id} className="flex items-center gap-3 p-1 rounded-md hover:bg-white/10">
                                            <div className="relative w-9 h-9 flex items-center justify-center">
                                                <Avatar className={cn("h-full w-full border-2 bg-background", seat.user.frame && frameBorderColors[seat.user.frame] ? frameBorderColors[seat.user.frame] : 'border-transparent' )}>
                                                    <AvatarImage src={seat.user.avatar} alt={seat.user.name} data-ai-hint="person portrait" />
                                                    <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{seat.user.name}</p>
                                                {seat.user.frame && frameBorderColors[seat.user.frame] && (
                                                    <div className={cn("h-0.5 w-8 rounded-full", frameBorderColors[seat.user.frame])}></div>
                                                )}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </ScrollArea>
                        </PopoverContent>
                    </Popover>
                </div>
            </header>

            <main className="flex-1 flex flex-col pt-0 overflow-hidden gap-2">
                 <div className="flex-shrink-0 space-y-4 px-4 pt-4">
                    {renderSeats()}
                </div>

                <div className="flex-1 mt-2 relative p-0">
                    {isGiftPanelOpen ? (
                        <GiftPanel onSendGift={handleSendGift} sendButtonRef={sendButtonRef} roomSeats={seats} coins={userProfile.coins} />
                    ) : isGameActive ? (
                        <SpinTheWheel
                          participants={occupiedSeats.map(s => s.user).filter(Boolean) as SeatUser[]}
                          onGameEnd={handleEndGame}
                          isOwner={currentUserIsOwner}
                          roomId={roomId}
                        />
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
                                                <AvatarImage src={msg.authorAvatar} />
                                                <AvatarFallback className="bg-primary/50 text-primary-foreground text-xs">{msg.authorName?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm">
                                                <p className="text-white/70 text-xs">{msg.authorName}</p>
                                                {msg.type === 'gift' && (
                                                    <div className="flex items-center gap-2 mt-1 bg-black/20 rounded-lg p-2">
                                                        <p className="text-xs">{msg.text}</p>
                                                        {msg.giftIcon && <Image src={msg.giftIcon} alt="gift" width={24} height={24}/>}
                                                    </div>
                                                )}
                                                {msg.type === 'game' && msg.game && (
                                                    <p className="mt-1 text-xs">{msg.text} <span className="font-bold text-yellow-400">{msg.game}</span>!</p>
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
                               <AvatarImage src={userProfile.avatar} />
                               <AvatarFallback>{userProfile.name.charAt(0) || 'U'}</AvatarFallback>
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
                           {currentUserSeat?.user?.isMuted ? <MicOff /> : <Mic />}
                        </Button>
                         <Button type="button" size="icon" className="relative w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex-shrink-0" onClick={() => setIsGamePanelOpen(true)}>
                            {isGameActive && <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-[#1F0A2E] animate-pulse" />}
                            <Gamepad2 />
                        </Button>
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
                                <span className="font-bold text-lg">{userProfile.coins.toLocaleString()}</span>
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
