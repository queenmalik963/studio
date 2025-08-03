
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Coins, ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const gifts = {
  hot: [
    { name: "Rose", price: 10, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png" },
    { name: "Perfume", price: 50, image: "https://placehold.co/100x100.png", hint: "perfume bottle" },
    { name: "Crown", price: 500, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png" },
    { name: "Diamond", price: 1000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png" },
    { name: "Rocket", price: 2000, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png" },
    { name: "Castle", price: 5000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png" },
  ],
  event: [
    { name: "Cake", price: 100, image: "https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png" },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png" },
  ],
  luxury: [
     { name: "Car", price: 10000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png" },
     { name: "Yacht", price: 50000, image: "https://placehold.co/100x100.png", hint: "luxury yacht" },
  ],
  family: [
      { name: "Teddy Bear", price: 50, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
  ]
};

type GiftCategory = keyof typeof gifts;

export function GiftPanel() {
  const [selectedGift, setSelectedGift] = useState<(typeof gifts.hot)[0] | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }

  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col p-2 rounded-t-lg">
      <Tabs defaultValue="hot" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10">
          <TabsTrigger value="hot" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Hot</TabsTrigger>
          <TabsTrigger value="event" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Event</TabsTrigger>
          <TabsTrigger value="luxury" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Luxury</TabsTrigger>
          <TabsTrigger value="family" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2">Family</TabsTrigger>
        </TabsList>
        <ScrollArea className="flex-1 my-2">
            {(Object.keys(gifts) as GiftCategory[]).map(category => (
                 <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-4 gap-3">
                        {gifts[category].map(gift => (
                            <div 
                                key={gift.name} 
                                className={cn(
                                    "flex flex-col items-center gap-1 p-1 rounded-lg cursor-pointer border-2",
                                    selectedGift?.name === gift.name ? "border-primary bg-primary/20" : "border-transparent"
                                )}
                                onClick={() => setSelectedGift(gift)}
                            >
                                <div className="w-12 h-12 relative">
                                    <Image src={gift.image} alt={gift.name} width={100} height={100} data-ai-hint={gift.hint} />
                                </div>
                                <p className="text-xs truncate">{gift.name}</p>
                                <div className="flex items-center gap-1 text-xs text-yellow-400">
                                    <Coins className="w-3 h-3"/>
                                    <span>{gift.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            ))}
        </ScrollArea>
      </Tabs>
      <div className="flex-shrink-0 flex items-center justify-between gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-black/20 border-white/20 h-9 text-xs">
                    To: {recipient} <ChevronDown className="ml-1 w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setRecipient("All")}>All in Room</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecipient("All on Mic")}>All on Mic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setRecipient("Jodie")}>Jodie</DropdownMenuItem>
                 <DropdownMenuItem onClick={() => setRecipient("Koko")}>Koko</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
            <div className="flex items-center bg-black/20 rounded-full border border-white/20">
                 <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full" onClick={() => handleQuantityChange(-1)}>
                    <Minus className="w-4 h-4" />
                </Button>
                <span className="px-2 text-sm">{quantity}</span>
                <Button size="icon" variant="ghost" className="w-7 h-7 rounded-full" onClick={() => handleQuantityChange(1)}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 h-9">
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}
