
"use client";

import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter, 
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Coins, Gift, Send, Users, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

type Seat = {
    id: number;
    user: {
        name: string;
        avatar: string;
        isMuted: boolean;
    } | null;
    isOccupied: boolean;
}

interface GiftDialogProps {
    children: React.ReactNode;
    roomSeats: Seat[];
}

const gifts = [
  { id: 'rose', name: "Rose", price: 10, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", hint: "red rose" },
  { id: 'perfume', name: "Perfume", price: 50, image: "https://em-content.zobj.net/source/apple/391/perfume_1f485.png", hint: "perfume bottle" },
  { id: 'ring', name: "Diamond Ring", price: 100, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", hint: "diamond ring" },
  { id: 'car', name: "Sports Car", price: 500, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", hint: "sports car" },
  { id: 'castle', name: "Castle", price: 1000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", hint: "fairy tale castle" },
];

const quantityOptions = [1, 5, 10, 50, 99];

export function GiftDialog({ children, roomSeats }: GiftDialogProps) {
    const [selectedGift, setSelectedGift] = useState(gifts[0]);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const totalCost = selectedGift.price * selectedQuantity;
    const occupiedSeats = roomSeats.filter(seat => seat.isOccupied && seat.user);

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
        setOpen(false);
        // Reset state after sending
        setSelectedUsers([]);
        setSelectedQuantity(1);
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md p-0 bg-[#2E103F] border-purple-800 text-white">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="font-headline text-2xl flex items-center gap-2"><Gift className="text-yellow-400" /> Send a Gift</DialogTitle>
                </DialogHeader>

                {/* Gift Selection */}
                <div className="px-6">
                    <ScrollArea className="w-full whitespace-nowrap">
                        <div className="flex space-x-4 pb-4">
                        {gifts.map(gift => (
                            <div 
                                key={gift.id} 
                                className={cn(
                                    "flex flex-col items-center gap-2 p-2 rounded-lg cursor-pointer transition-all border-2",
                                    selectedGift.id === gift.id ? "border-yellow-400 bg-white/20" : "border-transparent hover:bg-white/10"
                                )}
                                onClick={() => setSelectedGift(gift)}
                            >
                                <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
                                    <Image src={gift.image} alt={gift.name} width={48} height={48} data-ai-hint={gift.hint} />
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
                </div>
                
                 {/* Quantity Selection */}
                <div className="px-6">
                    <p className="text-sm font-semibold mb-2">Quantity</p>
                    <div className="flex gap-2">
                        {quantityOptions.map(q => (
                             <Button 
                                key={q}
                                variant={selectedQuantity === q ? "secondary" : "outline"}
                                size="sm"
                                className={cn(
                                    "flex-1 bg-black/20 border-purple-700 hover:bg-purple-900",
                                    selectedQuantity === q && "bg-primary hover:bg-primary/80"
                                )}
                                onClick={() => setSelectedQuantity(q)}
                            >
                                x{q}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Recipient Selection */}
                <div className="px-6 space-y-2">
                    <p className="text-sm font-semibold">Send To</p>
                     <div className="flex gap-2">
                         <Button size="sm" variant="outline" className="flex-1 bg-black/20 border-purple-700 hover:bg-purple-900" onClick={selectAllOnMic}>
                            <Mic className="w-4 h-4 mr-2"/> All on Mic
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-black/20 border-purple-700 hover:bg-purple-900" onClick={selectAllInRoom}>
                            <Users className="w-4 h-4 mr-2"/> All in Room
                        </Button>
                    </div>
                     <ScrollArea className="h-24">
                        <div className="grid grid-cols-5 gap-2 mt-2">
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
                                    <AvatarFallback>{seat.user!.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="text-[10px] truncate w-full text-center">{seat.user!.name}</p>
                            </div>
                        ))}
                        </div>
                    </ScrollArea>
                </div>


                <DialogFooter className="bg-black/30 p-4 flex-row justify-between items-center">
                    <div className="flex items-center gap-2 text-yellow-400">
                        <Coins className="w-5 h-5" />
                        <span className="font-bold text-lg">{totalCost.toLocaleString()}</span>
                    </div>
                    <Button 
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold" 
                        onClick={handleSendGift}
                        disabled={selectedUsers.length === 0}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        Send Gift ({selectedUsers.length})
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
