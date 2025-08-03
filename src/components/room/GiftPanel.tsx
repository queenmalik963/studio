
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
    { name: "Heart", price: 10, image: "https://em-content.zobj.net/source/apple/391/red-heart_2764-fe0f.png", animation: 'tada' },
    { name: "Thumbs Up", price: 5, image: "https://em-content.zobj.net/source/apple/391/thumbs-up_1f44d.png" },
    { name: "Rose", price: 25, image: "https://em-content.zobj.net/source/apple/391/rose_1f339.png", animation: 'bounce' },
    { name: "Clapping", price: 15, image: "https://em-content.zobj.net/source/apple/391/clapping-hands_1f44f.png" },
    { name: "Fire", price: 50, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'pulse-luxury' },
    { name: "100", price: 100, image: "https://em-content.zobj.net/source/apple/391/100-points_1f4af.png", animation: 'tada' },
    { name: "Sparkles", price: 30, image: "https://em-content.zobj.net/source/apple/391/sparkles_2728.png", animation: 'bounce' },
    { name: "Star", price: 40, image: "https://em-content.zobj.net/source/apple/391/star_2b50.png", animation: 'pulse-luxury' },
    { name: "Wow Face", price: 20, image: "https://em-content.zobj.net/source/apple/391/winking-face-with-tongue_1f61c.png" },
    { name: "Cool", price: 35, image: "https://em-content.zobj.net/source/apple/391/smiling-face-with-sunglasses_1f60e.png" },
    { name: "Mic Drop", price: 75, image: "https://em-content.zobj.net/source/apple/391/microphone_1f3a4.png", animation: 'bounce' },
    { name: "Rocket", price: 150, image: "https://em-content.zobj.net/source/apple/391/rocket_1f680.png", animation: 'fly-across' },
  ],
  event: [
    { name: "Birthday Cake", price: 100, image: "https://em-content.zobj.net/source/apple/391/birthday-cake_1f382.png", animation: 'tada' },
    { name: "Confetti", price: 20, image: "https://em-content.zobj.net/source/apple/391/confetti-ball_1f38a.png", animation: 'bounce' },
    { name: "Party Popper", price: 30, image: "https://em-content.zobj.net/source/apple/391/party-popper_1f389.png", animation: 'tada' },
    { name: "Gift Box", price: 50, image: "https://em-content.zobj.net/source/apple/391/wrapped-gift_1f381.png" },
    { name: "Balloons", price: 40, image: "https://em-content.zobj.net/source/apple/391/balloon_1f388.png" },
    { name: "Champagne", price: 200, image: "https://em-content.zobj.net/source/apple/391/bottle-with-popping-cork_1f37e.png", animation: 'pulse-luxury' },
    { name: "Wedding Rings", price: 500, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer' },
    { name: "Trophy", price: 300, image: "https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png", animation: 'pulse-luxury' },
    { name: "Jack-o'-lantern", price: 60, image: "https://em-content.zobj.net/source/apple/391/jack-o-lantern_1f383.png" },
    { name: "Christmas Tree", price: 120, image: "https://em-content.zobj.net/source/apple/391/christmas-tree_1f384.png" },
    { name: "Santa Claus", price: 150, image: "https://em-content.zobj.net/source/apple/391/santa-claus_1f385.png" },
    { name: "Fireworks", price: 250, image: "https://em-content.zobj.net/source/apple/391/fireworks_1f386.png", animation: 'tada' },
  ],
  luxury: [
    { name: "Diamond", price: 1000, image: "https://em-content.zobj.net/source/apple/391/gem-stone_1f48e.png", animation: 'shimmer' },
    { name: "Crown", price: 5000, image: "https://em-content.zobj.net/source/apple/391/crown_1f451.png", animation: 'pulse-luxury' },
    { name: "Sports Car", price: 20000, image: "https://em-content.zobj.net/source/apple/391/racing-car_1f3ce-fe0f.png", animation: 'fly-across' },
    { name: "Helicopter", price: 50000, image: "https://em-content.zobj.net/source/apple/391/helicopter_1f681.png", animation: 'fly-across' },
    { name: "Yacht", price: 100000, image: "https://em-content.zobj.net/source/apple/391/speedboat_1f6a4.png", animation: 'pulse-luxury' },
    { name: "Private Jet", price: 250000, image: "https://em-content.zobj.net/source/apple/391/airplane_2708-fe0f.png", animation: 'fly-across' },
    { name: "Mansion", price: 500000, image: "https://em-content.zobj.net/source/apple/391/house-with-garden_1f3e1.png", animation: 'pulse-luxury' },
    { name: "Gold Medal", price: 2500, image: "https://em-content.zobj.net/source/apple/391/1st-place-medal_1f947.png", animation: 'shimmer' },
    { name: "Money Bag", price: 750, image: "https://em-content.zobj.net/source/apple/391/money-bag_1f4b0.png" },
    { name: "Diamond Ring", price: 15000, image: "https://em-content.zobj.net/source/apple/391/ring_1f48d.png", animation: 'shimmer' },
    { name: "Watch", price: 8000, image: "https://em-content.zobj.net/source/apple/391/watch_231a.png", animation: 'pulse-luxury' },
    { name: "Necklace", price: 12000, image: "https://em-content.zobj.net/source/apple/391/necklace_1f4ff.png", animation: 'shimmer' },
  ],
  family: [
    { name: "Teddy Bear", price: 50, image: "https://em-content.zobj.net/source/apple/391/teddy-bear_1f9f8.png" },
    { name: "Baby Bottle", price: 10, image: "https://em-content.zobj.net/source/apple/391/baby-bottle_1f37c.png" },
    { name: "Family", price: 100, image: "https://em-content.zobj.net/source/apple/391/family-man-woman-girl-boy_1f468-200d-1f469-200d-1f467-200d-1f466.png" },
    { name: "Dog", price: 60, image: "https://em-content.zobj.net/source/apple/391/dog_1f415.png", animation: 'bounce' },
    { name: "Cat", price: 60, image: "https://em-content.zobj.net/source/apple/391/cat_1f408.png", animation: 'bounce' },
    { name: "House", price: 200, image: "https://em-content.zobj.net/source/apple/391/house_1f3e0.png" },
    { name: "Bouquet", price: 80, image: "https://em-content.zobj.net/source/apple/391/bouquet_1f490.png" },
    { name: "Chocolate", price: 30, image: "https://em-content.zobj.net/source/apple/391/chocolate-bar_1f36b.png" },
    { name: "Ice Cream", price: 25, image: "https://em-content.zobj.net/source/apple/391/soft-ice-cream_1f366.png" },
    { name: "Pizza Slice", price: 45, image: "https://em-content.zobj.net/source/apple/391/pizza_1f355.png" },
    { name: "Lollipop", price: 15, image: "https://em-content.zobj.net/source/apple/391/lollipop_1f36d.png" },
    { name: "Cookie", price: 20, image: "https://em-content.zobj.net/source/apple/391/cookie_1f36a.png" },
  ],
  exclusive: [
    { name: "Unicorn", price: 7500, image: "https://em-content.zobj.net/source/apple/391/unicorn_1f984.png", animation: 'shimmer' },
    { name: "Dragon", price: 30000, image: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png", animation: 'fly-across' },
    { name: "Phoenix", price: 50000, image: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", animation: 'shimmer' },
    { name: "Galaxy", price: 15000, image: "https://em-content.zobj.net/source/apple/391/milky-way_1f30c.png", animation: 'pulse-luxury' },
    { name: "Castle", price: 150000, image: "https://em-content.zobj.net/source/apple/391/castle_1f3f0.png", animation: 'pulse-luxury' },
    { name: "Treasure Chest", price: 80000, image: "https://em-content.zobj.net/source/apple/391/chestnut_1f330.png" }, // Using chestnut as proxy
    { name: "Magic Wand", price: 6000, image: "https://em-content.zobj.net/source/apple/391/magic-wand_1fa84.png", animation: 'shimmer' },
    { name: "Genie", price: 40000, image: "https://em-content.zobj.net/source/apple/391/genie_1f9de.png", animation: 'pulse-luxury' },
    { name: "Alien", price: 9000, image: "https://em-content.zobj.net/source/apple/391/alien_1f47d.png" },
    { name: "Meteor", price: 25000, image: "https://em-content.zobj.net/source/apple/391/comet_2604-fe0f.png", animation: 'fly-across' },
    { name: "Black Hole", price: 200000, image: "https://em-content.zobj.net/source/apple/391/hole_1f573-fe0f.png", animation: 'spin-slow' },
    { name: "Planet Earth", price: 10000, image: "https://em-content.zobj.net/source/apple/391/globe-showing-europe-africa_1f30d.png", animation: 'spin-slow' },
  ],
};


export type Gift = {
    name: string;
    price: number;
    image: string;
    animation?: string;
};
type GiftCategory = keyof typeof gifts;


export function GiftPanel({ onSendGift, onAnimateGift }: { onSendGift: (gift: Gift) => void, onAnimateGift: (gift: Gift) => void; }) {
  const [selectedGift, setSelectedGift] = useState<Gift | null>(gifts.hot[0]);
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState("All");

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  }
  
  const handleSend = () => {
    if (!selectedGift) return;
    
    // Check if the gift is an animation-only gift
    if (selectedGift.animation && !['Lion Cub', 'Dragon'].includes(selectedGift.name)) {
        onAnimateGift(selectedGift);
    } else {
        // Handle regular text-based gift sending
        onSendGift(selectedGift);
    }
  }

  const getAnimationClass = (animation?: string) => {
    if (!animation) return '';
    switch (animation) {
        case 'fly-across': return 'animate-fly-across';
        case 'shimmer': return 'animate-shimmer';
        case 'pulse-luxury': return 'animate-pulse-luxury';
        case 'tada': return 'animate-tada';
        case 'bounce': return 'animate-bounce';
        case 'spin-slow': return 'animate-spin-slow';
        default: return '';
    }
  }

  return (
    <div className="absolute inset-0 bg-[#1F0A2E]/90 backdrop-blur-sm flex flex-col rounded-lg">
      <div className="flex-1 flex flex-col overflow-hidden p-2">
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
                   <TabsContent key={category} value={category} className="mt-0">
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
                                        className={cn(getAnimationClass(gift.animation))}
                                      />
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
      </div>
      <div className="flex-shrink-0 flex items-center justify-between gap-2 p-2 border-t border-white/10">
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
            <Button className="bg-gradient-to-r from-pink-500 to-orange-400 h-9 px-4 text-sm" onClick={handleSend}>
                Send
            </Button>
        </div>
      </div>
    </div>
  );
}
