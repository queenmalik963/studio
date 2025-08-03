
"use client";

import { useState, useRef, useEffect, Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Users, Gamepad2, Mic, Lock, MessageSquare, Coins, Send as SendIconLucide, ChevronDown, RectangleVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Label } from "@/components/ui/label";


const initialMessages = [
  { id: 1, type: 'gift', author: 'Jodie', text: 'Sent a RedRose', giftIcon: 'https://placehold.co/100x100.png', avatar: "https://placehold.co/40x40.png" },
  { id: 2, type: 'game', author: 'Jodie', text: 'started playing Fruit!', game: 'Fruit!', avatar: "https://placehold.co/40x40.png" },
  { id: 3, type: 'text', author: 'saba', text: 'Hi...', avatar: "https://placehold.co/40x40.png"},
];

const roomSeats = [
    { id: 1, user: { name: "Jodie", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'gold' }, isOccupied: true },
    { id: 2, user: { name: "Koko", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'purple' }, isOccupied: true },
    { id: 3, user: { name: "User 3", avatar: "https://placehold.co/80x80.png", isMuted: true, frame: 'pink' }, isOccupied: true },
    { id: 4, user: { name: "Lexa", avatar: "https://placehold.co/80x80.png", isMuted: true, frame: 'blue' }, isOccupied: true },
    { id: 5, user: { name: "mhay", avatar: "https://placehold.co/80x80.png", isMuted: true, frame: 'green' }, isOccupied: true },
    { id: 6, user: { name: "User 6", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'teal' }, isOccupied: true },
    { id: 7, user: { name: "User 7", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'orange' }, isOccupied: true },
    { id: 8, user: { name: "User 8", avatar: "https://placehold.co/80x80.png", isMuted: true, frame: 'indigo' }, isOccupied: true },
    { id: 9, user: { name: "User 9", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'lime' }, isOccupied: true },
    { id: 10, user: { name: "User 10", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'rose' }, isOccupied: true },
    { id: 11, user: { name: "saba", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'red' }, isOccupied: true },
    { id: 12, user: { name: "MR ISMAIL", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'cyan' }, isOccupied: true },
    { id: 13, user: { name: "User 13", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'emerald' }, isOccupied: true },
    { id: 14, user: { name: "User 14", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'sky' }, isOccupied: true },
    { id: 15, user: { name: "User 15", avatar: "https://placehold.co/80x80.png", isMuted: false, frame: 'amber' }, isOccupied: true },
]

const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-1.87c0-1-1-2.27-2-1.9-1 .36-1 2-2 2s-1.44-.91-1.44-2 1.44-2 1.44-2 .81-1.33 2.56-2.56S13.43 8 15 8s1.86 1.43 2 2-1 2-2 2-2-1-2-2"/><path d="M20 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/></svg>
);

const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


const gifts = [
  { id: 'rose', name: "Rose", price: 10, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", hint: "red rose" },
  { id: 'perfume', name: "Perfume", price: 50, image: "https://em-content.zobj.net/source/apple/391/perfume_1f485.png", hint: "perfume bottle" },
  { id: 'ring', name: "Diamond Ring", price: 100, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", hint: "diamond ring" },
  { id: 'car', name: "Sports Car", price: 500, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", hint: "sports car" },
  { id: 'castle', name: "Castle", price: 1000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", hint: "fairy tale castle" },
];

const quantityOptions = [1, 5, 10, 50, 99];


export default function AudioRoomPage() {
    const router = useRouter();
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const [isGiftPanelOpen, setIsGiftPanelOpen] = useState(false);
    const [selectedGift, setSelectedGift] = useState(gifts[0]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const { toast } = useToast();

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
        lime: 'border-lime-500 animate-glow-lime',
        rose: 'border-rose-500 animate-glow-rose',
        emerald: 'border-emerald-500 animate-glow-emerald',
        sky: 'border-sky-500 animate-glow-sky',
        amber: 'border-amber-500 animate-glow-amber',
    }
    
    const spinningFrameColors: {[key: string]: string} = {
        gold: 'border-t-yellow-400',
    }

    const occupiedSeats = roomSeats.filter(seat => seat.isOccupied && seat.user);
    const totalCost = selectedGift.price * selectedQuantity;

    const handleUserSelection = (userId: number) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId) 
                : [...prev, userId]
        );
    };

    const selectAllOnMic = () => {
        const usersOnMic = occupiedSeats
            .filter(seat => seat.user && !seat.user.isMuted)
            .map(seat => seat.id);
        setSelectedUsers(usersOnMic);
    };

    const selectAllInRoom = () => {
        const allUsers = occupiedSeats.map(seat => seat.id);
        setSelectedUsers(allUsers);
    };

    const handleSendGift = () => {
        if (selectedUsers.length === 0) {
            toast({
                variant: "destructive",
                title: "No Recipient Selected",
                description: "Please select at least one user to send the gift to.",
            });
            return;
        }

        toast({
            title: "Gift Sent!",
            description: `You sent ${selectedQuantity} x ${selectedGift.name}(s) to ${selectedUsers.length} user(s).`,
        });
        setIsGiftPanelOpen(false);
        setSelectedUsers([]);
        setSelectedQuantity(1);
    };

    return (
        <div className="flex flex-col h-screen bg-[#2E103F] text-white font-sans overflow-hidden">
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
                    <Button variant="ghost" className="h-auto p-1 text-white/80 bg-black/20 rounded-full px-3">
                        <Users className="w-5 h-5 mr-1" />
                        <span className="font-bold">{occupiedSeats.length}</span>
                    </Button>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-4 overflow-hidden gap-2">
                <div className="grid grid-cols-5 gap-y-2 gap-x-3 justify-items-center">
                    {roomSeats.slice(0, 5).map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-1 w-[50px] text-center">
                            {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        {seat.id === 1 ? (
                                            <div className="relative w-[54px] h-[54px]">
                                                <div className={cn("absolute inset-0 border-2 border-transparent rounded-full animate-spin", spinningFrameColors[seat.user.frame])}></div>
                                                <Avatar className={cn("w-[50px] h-[50px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", frameColors[seat.user.frame])}>
                                                    <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                    <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        ) : (
                                            <Avatar className={cn(
                                                "w-[50px] h-[50px] border-2", 
                                                seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent'
                                            )}>
                                                <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                                <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1">
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
                                    {seat.isLocked ? <Lock className="w-5 h-5 text-white/50"/> : <span className="text-lg font-bold text-white/50">{seat.id}</span>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-5 gap-y-2 gap-x-3 justify-items-center">
                    {roomSeats.slice(5, 10).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1 w-[50px] text-center">
                            {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className={cn("w-[50px] h-[50px] border-2", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1">
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
                 <div className="grid grid-cols-5 gap-y-2 gap-x-3 justify-items-center mt-1">
                     {roomSeats.slice(10, 15).map((seat) => (
                         <div key={seat.id} className="flex flex-col items-center gap-1 w-[50px] text-center">
                             {seat.isOccupied && seat.user ? (
                                <>
                                    <div className="relative">
                                        <Avatar className={cn("w-[50px] h-[50px] border-2", seat.user.frame && frameColors[seat.user.frame] ? frameColors[seat.user.frame] : 'border-transparent' )}>
                                            <AvatarImage src={seat.user.avatar} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name?.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gray-800 rounded-full p-1">
                                            {seat.user.isMuted ? 
                                                <Mic className="w-3 h-3 text-red-500" /> :
                                                <Mic className="w-3 h-3 text-green-400" />
                                            }
                                        </div>
                                    </div>
                                    <p className="text-xs truncate w-full">{seat.user.name}</p>
                                </>
                            ) : null}
                         </div>
                    ))}
                </div>

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
                                            <Image src="https://em-content.zobj.net/source/apple/391/rose_1f339.png" alt="RedRose" width={16} height={16}/>
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
            
            <footer className="flex-shrink-0 bg-[#1F0A2E] border-t border-white/10 relative">
                <div className={cn(
                    "absolute bottom-full left-0 right-0 bg-[#1F0A2E] border-t-2 border-purple-800 transition-transform duration-300 ease-in-out",
                    isGiftPanelOpen ? "translate-y-0" : "translate-y-full"
                )}>
                    <div className="p-4 space-y-4">
                        <div className="flex justify-between items-center">
                           <h3 className="font-headline text-xl text-yellow-400 flex items-center gap-2"><GiftIcon className="w-6 h-6"/> Send a Gift</h3>
                           <Button variant="ghost" size="icon" onClick={() => setIsGiftPanelOpen(false)}>
                               <ChevronDown />
                           </Button>
                        </div>
                       {/* Gift Selection */}
                       <ScrollArea className="w-full whitespace-nowrap">
                           <div className="flex space-x-3 pb-2">
                           {gifts.map(gift => (
                               <div 
                                   key={gift.id} 
                                   className={cn(
                                       "flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer transition-all border-2",
                                       selectedGift.id === gift.id ? "border-yellow-400 bg-white/20" : "border-transparent hover:bg-white/10"
                                   )}
                                   onClick={() => setSelectedGift(gift)}
                               >
                                   <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
                                       <Image src={gift.image} alt={gift.name} width={40} height={40} data-ai-hint={gift.hint} />
                                   </div>
                                   <p className="text-xs">{gift.name}</p>
                                   <div className="flex items-center gap-1 text-xs text-yellow-400">
                                       <Coins className="w-3 h-3"/>
                                       <span>{gift.price}</span>
                                   </div>
                               </div>
                           ))}
                           </div>
                       </ScrollArea>
                       
                       {/* Quantity & Recipient Selection */}
                       <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-semibold mb-2 block">Quantity</Label>
                               <div className="grid grid-cols-5 gap-2">
                                   {quantityOptions.map(q => (
                                        <Button 
                                           key={q}
                                           variant={selectedQuantity === q ? "secondary" : "outline"}
                                           className={cn(
                                               "bg-black/20 border-purple-700 hover:bg-purple-900",
                                               selectedQuantity === q && "bg-primary hover:bg-primary/80"
                                           )}
                                           onClick={() => setSelectedQuantity(q)}
                                       >
                                           x{q}
                                       </Button>
                                   ))}
                               </div>
                           </div>

                            <div className="space-y-2">
                               <Label className="text-sm font-semibold">Send To</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" className="bg-black/20 border-purple-700 hover:bg-purple-900" onClick={selectAllOnMic}>
                                       <Mic className="w-4 h-4 mr-2"/> All on Mic
                                   </Button>
                                   <Button variant="outline" className="bg-black/20 border-purple-700 hover:bg-purple-900" onClick={selectAllInRoom}>
                                       <Users className="w-4 h-4 mr-2"/> All in Room
                                   </Button>
                               </div>
                                <ScrollArea className="h-24">
                                   <div className="grid grid-cols-6 gap-2 mt-2">
                                   {occupiedSeats.map(seat => (
                                       <div 
                                           key={seat.id} 
                                           className="flex flex-col items-center gap-1 cursor-pointer"
                                           onClick={() => handleUserSelection(seat.id)}
                                       >
                                           <Avatar className={cn(
                                               "w-10 h-10 border-2",
                                               selectedUsers.includes(seat.id) ? "border-yellow-400" : "border-transparent"
                                           )}>
                                               <AvatarImage src={seat.user!.avatar} />
                                               <AvatarFallback className="text-sm">{seat.user!.name.charAt(0)}</AvatarFallback>
                                           </Avatar>
                                       </div>
                                   ))}
                                   </div>
                               </ScrollArea>
                           </div>
                       </div>
                    </div>
                   <div className="bg-black/30 p-2 flex justify-between items-center mt-2">
                       <div className="flex items-center gap-2 text-yellow-400">
                           <Coins className="w-5 h-5" />
                           <span className="font-bold">{totalCost.toLocaleString()}</span>
                       </div>
                       <Button 
                           className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" 
                           onClick={handleSendGift}
                           disabled={selectedUsers.length === 0}
                       >
                           <SendIconLucide className="w-4 h-4 mr-2" />
                           Send ({selectedUsers.length})
                       </Button>
                   </div>
                </div>

                <div className="p-2">
                     <div className="flex items-center justify-around gap-2">
                        <div className="flex-grow flex items-center gap-2 bg-black/30 rounded-full h-10 px-2">
                           <Avatar className="h-7 w-7">
                               <AvatarImage src="https://placehold.co/40x40.png" />
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
                         <Button type="button" size="icon" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex-shrink-0"><Gamepad2 /></Button>
                         <Button type="button" size="icon" variant="ghost" className="w-10 h-10 rounded-full bg-black/30 flex-shrink-0">
                            <RectangleVertical />
                        </Button>
                         <Button type="button" size="icon" className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 rounded-full flex-shrink-0" onClick={() => setIsGiftPanelOpen(true)}>
                            <GiftIcon />
                        </Button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

    