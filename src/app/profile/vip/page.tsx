
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Crown, Inbox, Loader2, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { buyVipTier } from "@/services/userService";

const vipTiers = [
    {
        id: 'baron',
        name: 'Baron',
        price: 1500,
        color: 'from-gray-700 to-gray-900',
        frameClass: 'border-2 border-gray-400 animate-glow-silver',
        features: ['VIP Badge', 'Special Welcome Message', 'No Ads'],
        specialFrameUrl: 'https://i.imgur.com/K1hT0G8.png', // Using Gold Frame for demo
        tagImage: 'https://i.imgur.com/eB3sY3d.png',
    },
    {
        id: 'duke',
        name: 'Duke',
        price: 4000,
        color: 'from-blue-800 to-indigo-900',
        frameClass: 'border-2 border-blue-400 animate-glow-blue',
        features: ['All Baron Features', 'Exclusive Gifts', 'Colored Chat Text'],
        specialFrameUrl: 'https://i.imgur.com/L7iFvH0.png',
        tagImage: 'https://i.imgur.com/YQ8qV4g.png',
    },
    {
        id: 'prince',
        name: 'Prince',
        price: 10000,
        color: 'from-purple-800 to-fuchsia-900',
        frameClass: 'border-2 border-purple-400 animate-glow-purple',
        features: ['All Duke Features', 'Animated Profile Frame', 'Room Creation Priority'],
        specialFrameUrl: 'https://i.imgur.com/qg9gGgC.png',
        tagImage: 'https://i.imgur.com/b5XzY1A.png',
    },
    {
        id: 'shogun',
        name: 'Shogun',
        price: 25000,
        color: 'from-red-800 to-rose-900',
        frameClass: 'border-2 border-red-500 animate-glow-red',
        features: ['All Prince Features', 'Global Broadcast Pin', 'Unique Entrance Effect'],
        specialFrameUrl: 'https://i.imgur.com/DADsWdw.gif',
        tagImage: 'https://i.imgur.com/nJgqK7i.png',
    },
];

type VipTier = typeof vipTiers[0];

export default function VipStorePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isBuying, setIsBuying] = useState<string | null>(null);

  const handlePurchase = async (tier: VipTier) => {
    const user = auth.currentUser;
    if (!user) {
        toast({ title: "Please log in", description: "You need to be logged in to purchase a VIP tier.", variant: "destructive" });
        return;
    }
    
    setIsBuying(tier.id);
    const result = await buyVipTier(user.uid, tier.id, tier.price);
    setIsBuying(null);

    if (result.success) {
        toast({
            title: "Purchase Successful!",
            description: `Congratulations! You are now a ${tier.name}.`,
        });
    } else {
        toast({
            title: "Purchase Failed",
            description: result.error || "An unknown error occurred.",
            variant: "destructive",
        });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">VIP Store</h1>
        </div>

        {vipTiers.length > 0 ? (
            <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                delay: 3000,
                stopOnInteraction: true,
                }),
            ]}
            className="w-full"
            >
            <CarouselContent>
                {vipTiers.map((tier, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                    <Card className={cn("flex flex-col h-full text-white bg-gradient-to-br relative overflow-visible", tier.color)}>
                        {tier.tagImage && (
                            <div className="absolute -top-4 right-[-16px] w-20 h-20 z-10 animate-pulse-luxury">
                                <Image
                                    src={tier.tagImage}
                                    alt={`${tier.name} Tag`}
                                    layout="fill"
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        )}
                        <CardHeader className="items-center text-center">
                        <div className={cn("relative mb-4", tier.name === 'Shogun' ? 'w-24 h-24' : 'w-20 h-20')}>
                           <div className={cn("absolute rounded-full", tier.frameClass, tier.name === 'Shogun' ? 'inset-[-8px]' : 'inset-[-4px]')}></div>
                            <Image 
                                unoptimized
                                src={tier.specialFrameUrl}
                                alt={`${tier.name} Frame`}
                                layout="fill"
                                className={cn("absolute pointer-events-none", tier.frameClass, tier.name === 'Shogun' ? '-inset-2' : '-inset-1')}
                            />
                        </div>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Crown /> {tier.name} VIP
                        </CardTitle>
                        <CardDescription className="text-white/80 text-lg font-bold">{tier.price.toLocaleString()} Coins/m</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between p-4">
                        <ul className="space-y-2 list-disc list-inside text-white/90">
                            {tier.features.map((feature: string) => <li key={feature}>{feature}</li>)}
                        </ul>
                        <Button 
                            className="w-full mt-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30"
                            onClick={() => handlePurchase(tier)}
                            disabled={isBuying === tier.id}
                        >
                             {isBuying === tier.id ? <Loader2 className="animate-spin" /> : "Purchase"}
                        </Button>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            </Carousel>
        ) : (
            <Card className="flex flex-col items-center justify-center py-20 bg-card/50">
                <Inbox className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">VIP Tiers Coming Soon</h3>
                <p className="text-muted-foreground">Exclusive VIP benefits will be available shortly.</p>
            </Card>
        )}
      </div>
    </AppLayout>
  );
}
