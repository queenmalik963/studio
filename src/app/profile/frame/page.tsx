
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Square, Film, Inbox, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { buyFrame, equipFrame } from "@/services/userService";

const frameTiers = [
    { id: "gold", name: "Gold", price: 1000, image: "https://i.imgur.com/K1hT0G8.png", animationClass: 'animate-glow-gold' },
    { id: "purple", name: "Purple", price: 1000, image: "https://i.imgur.com/qg9gGgC.png", animationClass: 'animate-glow-purple' },
    { id: "blue", name: "Blue", price: 1000, image: "https://i.imgur.com/L7iFvH0.png", animationClass: 'animate-glow-blue' },
    { id: "green", name: "Green", price: 1000, image: "https://i.imgur.com/T0bS1Y4.png", animationClass: 'animate-glow-green' },
    { id: "red", name: "Red", price: 1000, image: "https://i.imgur.com/8Q6tB2F.png", animationClass: 'animate-glow-red' },
    { id: "cyan", name: "Cyan", price: 1000, image: "https://i.imgur.com/7bYnHB4.png", animationClass: 'animate-glow-cyan' },
];

const animatedFrameTiers = [
    { id: "EeLiIvo", name: "Royal Gold", price: 5000, image: "https://i.imgur.com/EeLiIvo.gif", animationClass: 'animate-glow-gold' },
    { id: "dadW7mL", name: "Mystic Purple", price: 5000, image: "https://i.imgur.com/dadW7mL.gif", animationClass: 'animate-glow-purple' },
    { id: "nQPOShX", name: "Sapphire Wave", price: 5000, image: "https://i.imgur.com/nQPOShX.gif", animationClass: 'animate-glow-blue' },
    { id: "5nC2D3l", name: "Forest Spirit", price: 5000, image: "https://i.imgur.com/5nC2D3l.gif", animationClass: 'animate-glow-green' },
    { id: "AuOpH7h", name: "Inferno Blaze", price: 5000, image: "https://i.imgur.com/AuOpH7h.gif", animationClass: 'animate-glow-red' },
    { id: "wGAEm5U", name: "Cyber Circuit", price: 7500, image: "https://i.imgur.com/wGAEm5U.gif", animationClass: 'animate-glow-cyan' },
    { id: "mQPDgwU", name: "Lover's Heart", price: 7500, image: "https://i.imgur.com/mQPDgwU.gif", animationClass: 'animate-glow-pink' },
    { id: "FTdqu3H", name: "Teal Pulse", price: 7500, image: "https://i.imgur.com/FTdqu3H.gif", animationClass: 'animate-glow-teal' },
    { id: "pXg7gf3", name: "Sunburst", price: 7500, image: "https://i.imgur.com/pXg7gf3.gif", animationClass: 'animate-glow-orange' },
    { id: "At3QgQ7", name: "Neon Beast", price: 10000, image: "https://i.imgur.com/At3QgQ7.gif", animationClass: 'animate-glow-sky' },
    { id: "VkUd6Ab", name: "Galaxy Swirl", price: 10000, image: "https://i.imgur.com/VkUd6Ab.gif", animationClass: 'animate-glow-indigo' },
    { id: "UHWrghE", name: "Digital Eye", price: 10000, image: "https://i.imgur.com/UHWrghE.gif", animationClass: 'animate-glow-lime' },
    { id: "PZhRHH1", name: "Phoenix Aura", price: 15000, image: "https://i.imgur.com/PZhRHH1.gif", animationClass: 'animate-glow-amber' },
    { id: "D9xf0es", name: "Emerald Light", price: 15000, image: "https://i.imgur.com/D9xf0es.gif", animationClass: 'animate-glow-emerald' },
    { id: "jw5SszE", name: "Rose Nebula", price: 15000, image: "https://i.imgur.com/jw5SszE.gif", animationClass: 'animate-glow-rose' },
];


type FrameTier = typeof frameTiers[0] | typeof animatedFrameTiers[0];

export default function FrameStorePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { currentUser, userProfile, loading } = useAuth();
    const [isBuying, setIsBuying] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/');
        }
    }, [loading, currentUser, router]);

    const handleBuyFrame = async (frame: FrameTier) => {
        if (!currentUser || !userProfile) {
            toast({ title: "Error", description: "You must be logged in to buy a frame.", variant: "destructive" });
            return;
        }

        if (userProfile.coins < frame.price) {
            toast({ title: "Not enough coins", description: "Please recharge your wallet.", variant: "destructive" });
            return;
        }

        setIsBuying(frame.id);
        const result = await buyFrame(currentUser.uid, frame.id, frame.price);
        setIsBuying(null);

        if (result.success) {
            toast({
                title: "Purchase Successful!",
                description: `You have bought the ${frame.name} frame.`,
            });
        } else {
            toast({
                title: "Purchase Failed",
                description: result.error || "An unknown error occurred.",
                variant: "destructive",
            });
        }
    };
    
    const handleEquipFrame = async (frame: FrameTier) => {
        if (!currentUser) return;
        
        setIsBuying(frame.id);
        const result = await equipFrame(currentUser.uid, frame.id);
        setIsBuying(null);

        if (result.success) {
            toast({
                title: "Frame Equipped!",
                description: `You have equipped the ${frame.name} frame.`,
            });
        } else {
            toast({
                title: "Failed to equip frame",
                description: result.error || "An unknown error occurred.",
                variant: "destructive",
            });
        }
    }
    
    const handleFrameClick = (frame: FrameTier) => {
        if (!userProfile) return;
        const isOwned = (userProfile.frames || []).includes(frame.id);
        
        if(isOwned) {
            handleEquipFrame(frame);
        } else {
            handleBuyFrame(frame);
        }
    };

    if (loading || !userProfile) {
      return (
        <AppLayout>
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
          </div>
        </AppLayout>
      );
    }

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
              </Button>
              <h1 className="text-2xl font-bold font-headline">Frame Store</h1>
            </div>
            
            {frameTiers.length > 0 ? (
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
                >
                <CarouselContent>
                    {frameTiers.map((tier) => {
                      const isOwned = (userProfile?.frames || []).includes(tier.id);
                      const isEquipped = userProfile?.currentFrame === tier.id;
                      return (
                        <CarouselItem key={tier.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1 h-full">
                            <Card className="bg-card/50 h-full flex flex-col">
                                <CardContent className="flex flex-col items-center justify-center p-4 gap-4 flex-grow">
                                <div className={cn("w-40 h-40 flex items-center justify-center relative", tier.animationClass)}>
                                    <Image
                                        src={tier.image}
                                        alt={tier.name}
                                        layout="fill"
                                        className="object-contain"
                                        data-ai-hint="frame"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="font-semibold text-lg">{tier.name}</p>
                                    <p className="text-muted-foreground">{tier.price.toLocaleString()} Coins</p>
                                </div>
                                <Button className="w-full mt-auto" onClick={() => handleFrameClick(tier)} disabled={isEquipped || isBuying === tier.id}>
                                    {isBuying === tier.id ? <Loader2 className="animate-spin" /> : 
                                     isEquipped ? <><CheckCircle className="mr-2 h-4 w-4" /> Equipped</> :
                                     isOwned ? <><CheckCircle className="mr-2 h-4 w-4" /> Equip Frame</> : 
                                     <><Square className="mr-2 h-4 w-4" /> Buy Frame</>
                                    }
                                </Button>
                                </CardContent>
                            </Card>
                            </div>
                        </CarouselItem>
                      )
                    })}
                </CarouselContent>
                </Carousel>
            ) : (
                <Card className="flex flex-col items-center justify-center py-12 bg-card/50">
                    <Inbox className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">Frames Coming Soon</h3>
                    <p className="text-muted-foreground">New and exciting frames will be available shortly.</p>
                </Card>
            )}
        </div>

         {animatedFrameTiers.length > 0 && (
            <div>
                <h2 className="text-xl font-bold font-headline flex items-center gap-2 mb-4"><Film className="text-primary"/> Animated Frames</h2>
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
                >
                <CarouselContent>
                    {animatedFrameTiers.map((tier) => {
                      const isOwned = (userProfile?.frames || []).includes(tier.id);
                      const isEquipped = userProfile?.currentFrame === tier.id;
                      return (
                      <CarouselItem key={tier.id} className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1 h-full">
                          <Card className="bg-card/50 h-full flex flex-col">
                              <CardContent className="flex flex-col items-center justify-center p-4 gap-4 flex-grow">
                              <div className={cn("w-40 h-40 flex items-center justify-center relative", tier.animationClass)}>
                                  <Image
                                      unoptimized
                                      src={tier.image}
                                      alt={tier.name}
                                      layout="fill"
                                      className="object-contain"
                                      data-ai-hint="animated frame"
                                  />
                              </div>
                              <div className="text-center">
                                  <p className="font-semibold text-lg">{tier.name}</p>
                                  <p className="text-muted-foreground">{tier.price.toLocaleString()} Coins</p>
                              </div>
                              <Button className="w-full mt-auto" onClick={() => handleFrameClick(tier)} disabled={isEquipped || isBuying === tier.id}>
                                    {isBuying === tier.id ? <Loader2 className="animate-spin" /> : 
                                     isEquipped ? <><CheckCircle className="mr-2 h-4 w-4" /> Equipped</> :
                                     isOwned ? <><CheckCircle className="mr-2 h-4 w-4" /> Equip Frame</> : 
                                     <><Square className="mr-2 h-4 w-4" /> Buy Frame</>
                                    }
                                </Button>
                              </CardContent>
                          </Card>
                          </div>
                      </CarouselItem>
                      )
                    })}
                </CarouselContent>
                </Carousel>
             </div>
        )}
      </div>
    </AppLayout>
  );
}
