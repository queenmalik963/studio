
"use client";

import { useState, useRef, useEffect, Fragment, createRef, useMemo, memo } from "react";
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
import { listenToMessages, sendMessage, type Message, listenToRoom, type Room, takeSeat, leaveSeat, updateSeatAsOwner, type SeatUser, updateSeatUser, updatePlaybackState, sendGift, endCurrentGame } from "@/services/roomService";
import { useAuth } from "@/contexts/AuthContext";


type JumpAnimation = {
    id: number;
    gift: GiftType;
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};


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
    const params = useParams();
    const roomId = params.id as string;
    
    const { currentUser, userProfile, loading } = useAuth();
    
    const [room, setRoom] = useState<Room | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [seats, setSeats] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [isGamePanelOpen, setIsGamePanelOpen] = useState(false);
    const [isControlsPanelOpen, setIsControlsPanelOpen] = useState(false);
    const [animatedGift, setAnimatedGift] = useState<GiftType | null>(null);
    const [animatedVideoGift, setAnimatedVideoGift] = useState<string | null>(null);
    const [animatedWalkingGift, setAnimatedWalkingGift] = useState<string | null>(null);
    const [jumpAnimations, setJumpAnimations] = useState<JumpAnimation[]>([]);
    const [areEffectsEnabled, setAreEffectsEnabled] = useState(true);

    const currentUserIsOwner = room?.ownerId === currentUser?.uid;
    const currentUserSeat = useMemo(() => seats.find(s => s.user?.id === currentUser?.uid), [seats, currentUser]);
    const isGameActive = !!room?.activeGame;

    // Audio Player State
    const audioRef = useRef<HTMLAudioElement>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const seatRefs = useRef(seats.map(() => createRef<HTMLDivElement>()));
    const sendButtonRef = useRef<HTMLButtonElement>(null);
    const lastMessageCount = useRef(messages.length);

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/');
        }
    }, [loading, currentUser, router]);

    useEffect(() => {
        if (!roomId) return;
        const unsubRoom = listenToRoom(roomId, (roomData) => {
            if (roomData) {
                setRoom(roomData);
                setSeats(roomData.seats || []);

                // Sync audio player for all users
                if (audioRef.current) {
                    if (roomData.currentTrack && audioRef.current.src !== roomData.currentTrack) {
                        audioRef.current.src = roomData.currentTrack;
                        audioRef.current.currentTime = roomData.playbackTime || 0;
                    }
                    if (roomData.isPlaying && audioRef.current.paused) {
                        audioRef.current.play().catch(e => console.error("Audio sync play failed:", e));
                    } else if (!roomData.isPlaying && !audioRef.current.paused) {
                        audioRef.current.pause();
                    }
                }
            } else {
                 router.push('/audio');
                 toast({ title: "Room not found", description: "This room may have been closed.", variant: "destructive" });
            }
        });
        const unsubMessages = listenToMessages(roomId, (newMessages) => {
            setMessages(newMessages);
        });

        return () => {
            unsubRoom();
            unsubMessages();
        };
    }, [roomId, router, toast]);

    
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const isScrolledToBottom = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 100;

        if (messages.length > lastMessageCount.current && isScrolledToBottom) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }

        lastMessageCount.current = messages.length;
    }, [messages]);
    
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() && roomId && userProfile) {
            const messageToSend = newMessage;
            setNewMessage(""); 
            inputRef.current?.blur();
            
            const result = await sendMessage(roomId, {
                authorId: userProfile.id,
                authorName: userProfile.name,
                authorAvatar: userProfile.avatar,
                text: messageToSend,
                type: 'text',
            });
            
            if (!result.success) {
                toast({
                    variant: "destructive",
                    title: "Failed to send message",
                    description: result.error,
                });
                setNewMessage(messageToSend);
            }
        }
    };

    const handleSendGift = async (gift: GiftType, quantity: number, recipientName: string) => {
        if (!roomId || !userProfile || !room) return;

        let recipients: { id: string, name: string }[] = [];
        
        if (recipientName === 'All in Room') {
            recipients = seats.filter(s => s.user).map(s => ({ id: s.user.id, name: s.user.name }));
        } else if (recipientName === 'All on Mic') {
            recipients = seats.filter(s => s.user && !s.user.isMuted).map(s => ({ id: s.user.id, name: s.user.name }));
        } else {
            const targetSeat = seats.find(s => s.user?.name === recipientName);
            if (targetSeat?.user) {
                recipients.push({ id: targetSeat.user.id, name: targetSeat.user.name });
            }
        }

        if (recipients.length === 0) {
             toast({ title: "Recipient not found.", variant: "destructive" });
             return;
        }
        
        const senderSeatUser: SeatUser = {
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar,
            isMuted: currentUserSeat?.user?.isMuted ?? true,
            frame: userProfile.currentFrame
        };

        for (const recipient of recipients) {
            const result = await sendGift(roomId, senderSeatUser, recipient.id, recipient.name, gift, quantity);
            if (!result.success) {
                toast({
                    variant: "destructive",
                    title: "Failed to send gift",
                    description: `Could not send to ${recipient.name}: ${result.error}`,
                });
            }
        }

        if (gift.animation === 'walking') {
            setAnimatedWalkingGift(gift.image);
            setTimeout(() => setAnimatedWalkingGift(null), 5000); 
        } else if (gift.animation === 'fullscreen-video' && gift.videoUrl) {
            setAnimatedVideoGift(gift.videoUrl);
            setTimeout(() => {
                setAnimatedVideoGift(null);
            }, 5000); 
        } else if (gift.animation === 'jump-to-seat') {
            const startRect = sendButtonRef.current?.getBoundingClientRect();
            if (!startRect) return;

            const newAnimations: JumpAnimation[] = [];
            recipients.forEach(recipient => {
                const targetSeat = seats.find(s => s.user?.id === recipient.id);
                const seatIndex = seats.findIndex(s => s.id === targetSeat?.id);
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
    };

    const handleStartGame = async (gameName: string) => {
        if (!roomId || !userProfile || !currentUserIsOwner) {
            toast({
                title: "Only the room owner can start a game.",
                variant: "destructive",
            });
            return;
        }
        setIsGamePanelOpen(false);

        await updatePlaybackState(roomId, { activeGame: gameName, gameHostId: userProfile.id });
        await sendMessage(roomId, { type: 'system', text: `${userProfile.name} started playing ${gameName}!` });

        toast({ title: "Game Started!", description: `You have started playing ${gameName}.` });
    };

    const handleEndGame = async () => {
        if (!roomId || !currentUserIsOwner) return;
        await endCurrentGame(roomId);
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

     const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!roomId || !userProfile || !currentUserIsOwner) return;
        const file = event.target.files?.[0];
        if (file) {
            // In a real app, upload this file to a storage bucket and get a public URL
            const trackUrl = URL.createObjectURL(file);
            if (audioRef.current) {
                audioRef.current.src = trackUrl;
            }

            await updatePlaybackState(roomId, {
                currentTrack: trackUrl, // Use the public URL here in a real app
                isPlaying: true,
                playbackTime: 0
            });
            
            toast({
                title: "Track Selected!",
                description: `"${file.name}" is now playing for everyone.`,
            });
            
            await sendMessage(roomId, {
                type: 'system',
                text: `Owner selected "${file.name}" to play.`,
            });
            setIsControlsPanelOpen(false);
        }
    };
    
    const togglePlay = async () => {
        if (!roomId || !currentUserIsOwner || !room?.currentTrack) return;
        const newIsPlaying = !room.isPlaying;
        await updatePlaybackState(roomId, { isPlaying: newIsPlaying });
        toast({ title: newIsPlaying ? "Music Resumed" : "Music Paused" });
    };

    const handleTogglePersonalMic = async () => {
        if (!roomId || !currentUserSeat || !currentUserSeat.user) return;
        const newMuteState = !currentUserSeat.user.isMuted;
        await updateSeatUser(roomId, currentUserSeat.id, { isMuted: newMuteState });
    };

    const roomControls = useMemo(() => [
        { name: "Gathering", icon: Flag, action: async () => {
            if (!roomId) return;
            toast({ title: "Gathering Started!", description: "Special room effects are now active." });
            await sendMessage(roomId, { type: 'system', text: 'A gathering has been started by the owner!' });
            setIsControlsPanelOpen(false);
        }},
        { name: "Broadcast", icon: Megaphone, action: async () => {
            if (!roomId) return;
            toast({ title: "Broadcast Sent!", description: "Your message has been sent to all users." });
            await sendMessage(roomId, { type: 'system', text: 'Broadcast: Welcome to the room everyone! Enjoy your stay.' });
            setIsControlsPanelOpen(false);
        }},
        { name: "Play Track", icon: Play, action: () => {
            if (room?.currentTrack) {
                togglePlay();
            } else {
                toast({ title: "No Track", description: "Please upload a track first.", variant: "destructive" });
            }
            setIsControlsPanelOpen(false);
        }},
        { name: "Pause Track", icon: Pause, action: () => {
            if (room?.currentTrack) {
                togglePlay();
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
    ], [toast, setAreEffectsEnabled, roomId, room, togglePlay]);


    const handleSeatClick = async (seat: any) => {
        if (!userProfile || !roomId) return;

        const seatUser: SeatUser = {
            id: userProfile.id,
            name: userProfile.name,
            avatar: userProfile.avatar,
            isMuted: true, // Always join muted
            frame: userProfile.currentFrame
        };

        // If user is already on a seat, they leave it first
        const userSeat = seats.find(s => s.user?.id === userProfile.id);
        if (userSeat) {
            await leaveSeat(roomId, userSeat.id);
        }

        // If the clicked seat is not the one they just left, they take the new seat
        if (userSeat?.id !== seat.id && !seat.user && !seat.isLocked) {
            await takeSeat(roomId, seat.id, seatUser);
        }
    };
    
    const handleSeatAction = async (action: 'mute' | 'kick' | 'lock', seatId: number) => {
        if (!roomId) return;

        const targetSeat = seats.find(seat => seat.id === seatId);
        if (!targetSeat) return;
        
        if (action === 'mute' && targetSeat.user) {
            const isMuted = !targetSeat.user.isMuted;
            await updateSeatUser(roomId, seatId, { isMuted });
            toast({ title: `User ${targetSeat.user.name} ${isMuted ? 'muted' : 'unmuted'}.`});
        } else if (action === 'kick' && targetSeat.user) {
            await updateSeatAsOwner(roomId, seatId, { user: null });
            toast({ title: `User ${targetSeat.user.name} has been kicked from the seat.`});
        } else if (action === 'lock') {
            const isLocked = !targetSeat.isLocked;
            await updateSeatAsOwner(roomId, seatId, { isLocked, user: null }); // Also clear user when locking
            toast({ title: `Seat ${targetSeat.id} has been ${isLocked ? 'locked' : 'unlocked'}.`});
        }
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

    const occupiedSeats = seats.filter(seat => seat.user);

    const renderSeats = () => {
        const rows = [];
        for (let i = 0; i < 4; i++) {
            const rowSeats = seats.slice(i * 4, i * 4 + 4);
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
                                        {seat.user ? (
                                            <>
                                                <div className="relative w-[65px] h-[65px] flex items-center justify-center">
                                                    {areEffectsEnabled && seat.user.frame && specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-4px] pointer-events-none">
                                                            <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                        </div>
                                                    )}
                                                    {areEffectsEnabled && seat.user.frame && !specialFrames[seat.user.frame] && (
                                                        <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                    )}
                                                    
                                                    <Avatar className={cn("w-full h-full border-2 bg-[#2E103F]", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                        <AvatarImage src={seat.user.avatar} alt={seat.user.name} data-ai-hint="person portrait"/>
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
                                            <div className="w-[65px] h-[65px] rounded-full bg-black/20 flex items-center justify-center border-2 border-transparent">
                                                {seat.isLocked ? <Lock className="w-6 h-6 text-white/50" /> : <span className="text-xl font-bold text-white/50">{seat.id}</span>}
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

    if (loading || !userProfile || !room) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#2E103F] text-white">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-[#2E103F] text-white font-sans overflow-hidden">
             <audio ref={audioRef} loop />
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
                            <AvatarImage src={room.ownerAvatar} />
                            <AvatarFallback>{room.ownerName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{room.name}</p>
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
                                    {occupiedSeats.map((seat) => (
                                       seat.user && <div key={seat.id} className="flex items-center gap-3 p-1 rounded-md hover:bg-white/10">
                                            <div className="relative w-9 h-9 flex items-center justify-center">
                                                {areEffectsEnabled && (
                                                    <>
                                                        {seat.user.frame && specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-3px] pointer-events-none">
                                                                <Image unoptimized src={specialFrames[seat.user.frame].img} alt={seat.user.frame} layout="fill" className="animate-pulse-luxury" />
                                                            </div>
                                                        )}
                                                        {seat.user.frame && !specialFrames[seat.user.frame] && (
                                                            <div className="absolute inset-[-2px] spinning-border animate-spin-colors rounded-full"></div>
                                                        )}
                                                    </>
                                                )}
                                                <Avatar className={cn("h-full w-full border-2 bg-background", areEffectsEnabled && seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                                    <AvatarImage src={seat.user.avatar} alt={seat.user.name} data-ai-hint="person portrait" />
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
                 <div className="flex-shrink-0 space-y-4 px-4">
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
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <p className="text-xs">{msg.text}</p>
                                                        {msg.giftIcon && <Image src={msg.giftIcon} alt="gift" width={16} height={16}/>}
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
                        <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0" onClick={handleTogglePersonalMic} disabled={!currentUserSeat}>
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
