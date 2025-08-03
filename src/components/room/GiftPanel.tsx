
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
    // The Lion Cub is now the special trigger for AI video generation
    { name: "Lion Cub", price: 999, image: "https://em-content.zobj.net/source/apple/391/lion_1f981.png", animation: 'pulse-luxury', isAiGift: true },
    { name: "Tiger Cub", price: 98, image: "https://em-content.zobj.net/source/apple/391/tiger_1f405.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Bear Cub", price: 97, image: "https://em-content.zobj.net/source/apple/391/bear_1f43b.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Wolf Pup", price: 96, image: "https://em-content.zobj.net/source/apple/391/wolf_1f43a.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Fox Kit", price: 95, image: "https://em-content.zobj.net/source/apple/391/fox_1f98a.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Deer Fawn", price: 94, image: "https://em-content.zobj.net/source/apple/391/deer_1f98c.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
    { name: "Playful Monkey", price: 89, image: "https://em-content.zobj.net/source/apple/391/monkey_1f412.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
    { name: "Cuddly Panda", price: 110, image: "https://em-content.zobj.net/source/apple/391/panda_1f43c.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4" },
    { name: "Sleepy Koala", price: 105, image: "https://em-content.zobj.net/source/apple/391/koala_1f428.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4" },
    { name: "Happy Puppy", price: 79, image: "https://em-content.zobj.net/source/apple/391/dog_1f415.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { name: "Cute Kitten", price: 78, image: "https://em-content.zobj.net/source/apple/391/cat_1f408.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
    { name: "Bunny Hop", price: 69, image: "https://em-content.zobj.net/source/apple/391/rabbit_1f407.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    { name: "Chirpy Chick", price: 49, image: "https://em-content.zobj.net/source/apple/391/front-facing-baby-chick_1f425.png", animation: 'tada', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    { name: "Waddling Penguin", price: 85, image: "https://em-content.zobj.net/source/apple/391/penguin_1f427.png", animation: 'bounce', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
    { name: "Soaring Eagle", price: 120, image: "https://em-content.zobj.net/source/apple/391/eagle_1f985.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
    { name: "Hooting Owl", price: 88, image: "https://em-content.zobj.net/source/apple/391/owl_1f989.png", animation: 'pulse-luxury', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
    { name: "Mystical Unicorn", price: 150, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'shimmer', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
    { name: "Fiery Dragon", price: 180, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'fly-across', videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutback2014.mp4" },
  ],
  event: [
    { name: "Cake", price: 100, image: "https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png" },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png" },
  ],
  luxury: [
    { name: "Car", price: 10000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", animation: 'pulse-luxury' },
    { name: "Yacht", price: 50000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", animation: 'pulse-luxury' },
  ],
  family: [
    { name: "Teddy Bear", price: 50, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Baby Bottle", price: 10, image: "https://em-content.zobj.net/source/apple/391/baby-bottle_1f37c.png" },
  ],
  exclusive: [
    { name: "Phoenix", price: 10000, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'shimmer' },
    { name: "Pegasus", price: 12000, image: "https://em-content.zobj.net/source/apple/391/horse_1f40e.png", animation: 'fly-across' },
  ],
};

export type Gift = {
    name: string;
    price: number;
    image: string;
    animation?: string;
    videoUrl?: string;
    isAiGift?: boolean;
};
type GiftCategory = keyof typeof gifts;


export function GiftPanel({ onSendGift }: { onSendGift: (gift: Gift) => void }) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }

  const getAnimationClass = (gift: Gift) => {
    if ('animation' in gift) {
        switch (gift.animation) {
            case 'fly-across': return 'animate-fly-across';
            case 'shimmer': return 'animate-shimmer';
            case 'pulse-luxury': return 'animate-pulse-luxury';
            case 'tada': return 'animate-tada';
            case 'bounce': return 'animate-bounce';
            case 'spin-slow': return 'animate-spin-slow';
            default: return '';
        }
    }
    return '';
  }
  
  const handleSend = () => {
    if (selectedGift) {
        onSendGift(selectedGift);
    }
  }

  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col p-2 rounded-t-lg">
      <Tabs defaultValue="hot" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="bg-transparent p-0 justify-start gap-4 border-b border-white/10">
          <TabsTrigger value="hot" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Hot</TabsTrigger>
          <TabsTrigger value="event" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Event</TabsTrigger>
          <TabsTrigger value="luxury" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Luxury</TabsTrigger>
          <TabsTrigger value="family" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Family</TabsTrigger>
          <TabsTrigger value="exclusive" className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 text-sm">Exclusive</TabsTrigger>
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
                                onClick={() => setSelectedGift(gift as Gift)}
                            >
                                <div className={cn("w-12 h-12 relative flex items-center justify-center overflow-hidden", (category === 'luxury' || category === 'exclusive' || category === 'hot') && 'p-1')}>
                                    <Image
                                      src={gift.image}
                                      alt={gift.name}
                                      width={48}
                                      height={48}
                                      unoptimized={true}
                                      className={cn(getAnimationClass(gift as Gift))}
                                    />
                                    {gift.isAiGift && <span className="absolute top-0 right-0 text-[8px] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-1 rounded-full">AI</span>}
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
         <div className="flex items-center gap-2 flex-grow">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="bg-black/20 border-white/20 h-9 text-xs px-2">
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
            <div className="flex-shrink-0 flex items-center gap-1 bg-black/20 rounded-full h-9 px-3 border border-white/20 text-sm">
                <Coins className="w-4 h-4 text-yellow-300" />
                <span className="font-bold text-white">1,250</span>
            </div>
         </div>

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
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 h-9 px-3" onClick={handleSend}>
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}
