
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Users, ArrowLeft, Mic, Send, Gift, Gamepad2, PanelTopClose, Vote, MessageCircle, ShieldCheck, LogOut, User as UserIcon, X, Crown, Coins } from "lucide-react";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";

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

const initialSeats = [
    { id: 1, user: { name: "Jodie", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: true } },
    { id: 2, user: { name: "Koko", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
    { id: 8, user: null, isLocked: true },
    { id: 9, user: { name: "Lexa", image: "https://placehold.co/80x80.png", isSpeaking: false, isMuted: true, isHost: false } },
    { id: 10, user: { name: "mhay", image: "https://placehold.co/80x80.png", isSpeaking: false, isMuted: true, isHost: false } },
    { id: 6, user: { name: "saba", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
    { id: 7, user: { name: "MR ISMAIL", image: "https://placehold.co/80x80.png", isSpeaking: true, isMuted: false, isHost: false } },
];
const emptySeats = [3, 4, 5];

const initialChatMessages = [
    { type: 'notification', text: 'Ahmed has joined the room.', id: 1 },
    { type: 'chat', user: "Jodie", text: "Hey everyone! Welcome to the stream.", id: 2 },
    { type: 'gift', user: "Koko", recipient: "Jodie", gift: "🌹", id: 3 },
    { type: 'notification', text: 'Sonia has left the room.', id: 4 },
];

const allUsersInRoom = [
    ...initialSeats.filter(s => s.user).map(s => s.user!),
    { name: "Viewer1", image: "https://placehold.co/40x40.png", isHost: false },
    { name: "Viewer2", image: "https://placehold.co/40x40.png", isHost: false },
]

const gifts = [
    { name: "Rose", icon: "🌹", price: 10 },
    { name: "Diamond", icon: "💎", price: 100 },
    { name: "Heart", icon: "❤️", price: 50 },
    { name: "Crown", icon: "👑", price: 500 },
];

const games = [
    { name: "Ludo", icon: "🎲" },
    { name: "Bingo", icon: "🔢" },
];


// Let's assume the current user is the owner
const isCurrentUserOwner = true;

export default function AudioRoomPage() {
    const router = useRouter();
    const [newMessage, setNewMessage] = useState("");
    const [seats, setSeats] = useState(initialSeats);
    const [chatMessages, setChatMessages] = useState(initialChatMessages);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inlineChatContainerRef = useRef<HTMLDivElement>(null);
    const [activePanel, setActivePanel] = useState<null | 'chat' | 'gift' | 'game'>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatMessages, activePanel]);

    useEffect(() => {
        if (inlineChatContainerRef.current) {
            inlineChatContainerRef.current.scrollTop = inlineChatContainerRef.current.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setChatMessages(prev => [...prev, {
                type: 'chat',
                user: 'You',
                text: newMessage,
                id: Date.now()
            }]);
            setNewMessage('');
        }
    };
    
    const handleSeatAction = (action: string, userName: string | undefined) => {
        console.log(`${action} on ${userName}`);
        // Dummy function for now
    }

    const UserContextMenu = ({ targetUser }: { targetUser: { name: string, image: string, isHost: boolean }}) => {
        if (isCurrentUserOwner) {
            // Owner's context menu for other users
            return (
                <PopoverContent className="w-48 p-2">
                    <div className="flex flex-col gap-1">
                        <Button variant="ghost" className="justify-start" onClick={() => handleSeatAction('Mute', targetUser.name)}><Mic className="mr-2 h-4 w-4"/>Mute/Unmute</Button>
                        <Button variant="ghost" className="justify-start" onClick={() => handleSeatAction('Kick from seat', targetUser.name)}><LogOut className="mr-2 h-4 w-4"/>Kick from Seat</Button>
                        <Button variant="ghost" className="justify-start" onClick={() => handleSeatAction('Make Co-Host', targetUser.name)}><ShieldCheck className="mr-2 h-4 w-4"/>Make Co-Host</Button>
                         <Button variant="destructive" className="justify-start" onClick={() => handleSeatAction('Kick from room', targetUser.name)}><X className="mr-2 h-4 w-4"/>Kick from Room</Button>
                    </div>
                </PopoverContent>
            );
        }
        
        // Regular user's context menu
        return (
             <PopoverContent className="w-48 p-2">
                <div className="flex flex-col gap-1">
                    <Button variant="ghost" className="justify-start"><UserIcon className="mr-2 h-4 w-4"/>View Profile</Button>
                    <Button variant="ghost" className="justify-start" onClick={() => setActivePanel('gift')}><Gift className="mr-2 h-4 w-4"/>Send Gift</Button>
                    <Button variant="ghost" className="justify-start"><UserIcon className="mr-2 h-4 w-4"/>Follow</Button>
                </div>
            </PopoverContent>
        )
    };
    
    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-[#1E0B38] to-[#3C1A5C] text-white p-4 overflow-hidden">
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="bg-black/20 rounded-full h-8 px-4">
                                <Users className="w-4 h-4 mr-2" /> {allUsersInRoom.length}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Users in Room</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3 py-4 max-h-80 overflow-y-auto">
                                {allUsersInRoom.map(user => (
                                    <div key={user.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.image} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold">{user.name}</p>
                                        </div>
                                        {user.isHost && <ShieldCheck className="text-yellow-400" />}
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </header>

            {/* Seats */}
            <main className="flex-1 mt-6 overflow-y-auto flex flex-col justify-between">
                <div className="flex-shrink-0">
                     <div className="grid grid-cols-5 gap-y-4 gap-x-2 place-items-center">
                        {seats.slice(0, 5).map((seat) => (
                            <div key={seat.id} className="flex flex-col items-center gap-1.5 text-center">
                                <Popover>
                                    <PopoverTrigger asChild disabled={!seat.user}>
                                        <div className={cn(
                                            "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center relative",
                                            seat.user && "cursor-pointer",
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
                                    </PopoverTrigger>
                                    {seat.user && <UserContextMenu targetUser={seat.user} />}
                                </Popover>
                                <p className="text-xs font-semibold">{seat.user?.name || ""}</p>
                            </div>
                        ))}
                    </div>
                     <div className="grid grid-cols-4 gap-y-4 gap-x-2 place-items-center mt-4">
                        {seats.slice(5).map((seat) => (
                             <div key={seat.id} className="flex flex-col items-center gap-1.5 text-center col-span-2">
                                 <Popover>
                                    <PopoverTrigger asChild disabled={!seat.user}>
                                        <div className={cn(
                                            "w-14 h-14 rounded-full bg-white/10 flex items-center justify-center relative",
                                            seat.user && "cursor-pointer",
                                            seat.user?.isSpeaking && "border-2 border-primary ring-2 ring-primary/50"
                                        )}>
                                            {seat.user ? (
                                             <Avatar className="w-full h-full">
                                                <AvatarImage src={seat.user.image} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            ) : null}
                                             {seat.user && (
                                                <div className={cn(
                                                    "absolute -bottom-2 h-5 w-5 rounded-full flex items-center justify-center border-2",
                                                    seat.user.isSpeaking ? 'bg-primary border-background' : 'bg-gray-600 border-gray-800'
                                                )}>
                                                    <Mic className="w-3 h-3 text-white" />
                                                </div>
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    {seat.user && <UserContextMenu targetUser={seat.user} />}
                                </Popover>
                                <p className="text-xs font-semibold">{seat.user?.name || ""}</p>
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
                </div>

                {/* Live Chat Overlay */}
                <div ref={inlineChatContainerRef} className="mt-auto space-y-3 px-2 max-h-40 overflow-y-auto pointer-events-none pb-2">
                    {chatMessages.map((msg) => (
                         <div key={msg.id} className={cn("max-w-xs", msg.type === 'notification' && "mx-auto text-center")}>
                             {msg.type === 'chat' && (
                                <p className="text-sm bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                                    <span className="font-semibold text-primary">{msg.user}: </span> 
                                    {msg.text}
                                </p>
                             )}
                             {msg.type === 'notification' && (
                                <p className="text-xs text-white/70 bg-black/20 rounded-full px-3 py-1 inline-block">
                                    {msg.text}
                                 </p>
                             )}
                              {msg.type === 'gift' && (
                                <p className="text-sm bg-black/30 backdrop-blur-sm rounded-lg px-3 py-1 inline-block">
                                    <span className="font-semibold text-yellow-400">{msg.user}</span>
                                    <span> sent a {msg.gift} to </span>
                                    <span className="font-semibold text-yellow-400">{msg.recipient}</span>
                                </p>
                             )}
                         </div>
                    ))}
                </div>
            </main>
            
            {/* --- Bottom Panels --- */}
            <div className={cn("absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-lg rounded-t-2xl p-4 transition-transform duration-300 ease-in-out z-20", 
                activePanel ? "translate-y-0" : "translate-y-full"
            )} style={{bottom: '6.5rem', height: 'calc(40vh)', maxHeight: '250px'}}>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setActivePanel(null)}><X /></Button>
                
                {activePanel === 'chat' && (
                    <div className="flex flex-col h-full">
                        <h3 className="font-bold text-lg mb-2">Live Chat</h3>
                        <div ref={chatContainerRef} className="flex-1 space-y-3 overflow-y-auto">
                            {/* Detailed chat messages would go here */}
                             {chatMessages.map((msg) => (
                                <div key={msg.id} className={cn("max-w-xs", msg.type === 'notification' && "mx-auto text-center")}>
                                     {msg.type === 'chat' && ( <p className="text-sm"><span className="font-semibold text-primary">{msg.user}: </span> {msg.text} </p>)}
                                     {msg.type === 'notification' && ( <p className="text-xs text-center text-white/60">{msg.text}</p>)}
                                     {msg.type === 'gift' && ( <p className="text-sm"><span className="font-semibold text-yellow-400">{msg.user}</span> sent a {msg.gift} to <span className="font-semibold text-yellow-400">{msg.recipient}</span></p>)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activePanel === 'gift' && (
                    <div>
                        <h3 className="font-bold text-lg mb-2">Send a Gift</h3>
                         <div className="grid grid-cols-4 gap-4 text-center">
                            {gifts.map(gift => (
                                <div key={gift.name} className="cursor-pointer p-2 rounded-lg hover:bg-white/10">
                                    <p className="text-4xl">{gift.icon}</p>
                                    <p className="text-xs">{gift.name}</p>
                                    <p className="text-xs text-yellow-400 flex items-center justify-center gap-1"><Coins className="w-3 h-3"/>{gift.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activePanel === 'game' && (
                    <div>
                        <h3 className="font-bold text-lg mb-2">Start a Game</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            {games.map(game => (
                                <div key={game.name} className="cursor-pointer p-4 rounded-lg hover:bg-white/10">
                                    <p className="text-5xl">{game.icon}</p>
                                    <p className="font-semibold mt-2">{game.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="flex-shrink-0 flex flex-col gap-2 z-10">
                 <div className="flex items-center gap-2">
                    <div className="flex items-center bg-black/30 rounded-full p-1 pr-2 flex-grow">
                        <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={() => setActivePanel(activePanel === 'chat' ? null : 'chat')}>
                            <MessageCircle className={cn("w-5 h-5", activePanel === 'chat' && "text-primary")}/>
                        </Button>
                        <Input 
                            placeholder="Hi..."
                            className="bg-transparent border-none text-white placeholder:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0 h-8 flex-grow"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onFocus={() => setActivePanel('chat')}
                        />
                         <Button variant="ghost" size="icon" className="rounded-full w-8 h-8" onClick={handleSendMessage}>
                            <Send className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                     <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10" disabled={!isCurrentUserOwner}>
                        <NIcon className="w-6 h-6"/>
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("rounded-full bg-black/30 w-10 h-10", activePanel === 'game' && "bg-blue-500")} onClick={() => setActivePanel(activePanel === 'game' ? null : 'game')}>
                        <Gamepad2 className="w-5 h-5"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10" disabled={!isCurrentUserOwner}>
                        <PanelTopClose className="w-5 h-5"/>
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-black/30 w-10 h-10" disabled={!isCurrentUserOwner}>
                        <Vote className="w-5 h-5"/>
                    </Button>
                     <Button variant="ghost" size="icon" className={cn("rounded-full text-black w-10 h-10", activePanel === 'gift' ? 'bg-yellow-300' : 'bg-yellow-500')} onClick={() => setActivePanel(activePanel === 'gift' ? null : 'gift')}>
                        <Gift className="w-5 h-5"/>
                    </Button>
                </div>
            </footer>
        </div>
    );

    
    