
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
import { auth } from "@/lib/firebase";
import { listenToUserProfile, buyFrame, type UserProfile } from "@/services/userService";

const frameTiers = [
    { id: "gold", name: "Gold", price: 1000, image: "https://i.imgur.com/K1hT0G8.png", animationClass: 'animate-glow-gold' },
    { id: "purple", name: "Purple", price: 1000, image: "https://i.imgur.com/qg9gGgC.png", animationClass: 'animate-glow-purple' },
    { id: "blue", name: "Blue", price: 1000, image: "https://i.imgur.com/L7iFvH0.png", animationClass: 'animate-glow-blue' },
    { id: "green", name: "Green", price: 1000, image: "https://i.imgur.com/T0bS1Y4.png", animationClass: 'animate-glow-green' },
    { id: "red", name: "Red", price: 1000, image: "https://i.imgur.com/8Q6tB2F.png", animationClass: 'animate-glow-red' },
    { id: "cyan", name: "Cyan", price: 1000, image: "https://i.imgur.com/7bYnHB4.png", animationClass: 'animate-glow-cyan' },
];

const animatedFrameTiers = [
    { id: "crimson-danger", name: "Crimson Danger", price: 5000, image: "https://i.imgur.com/DADsWdw.gif", animationClass: 'animate-glow-red' },
    { id: "master", name: "Master", price: 15000, image: "https://i.imgur.com/DADsWdw.gif", animationClass: 'animate-glow-purple' },
    { id: "dragon-fury", name: "Dragon Fury", price: 25000, image: "https://i.imgur.com/RqnqCso.gif", animationClass: 'animate-glow-amber' },
    { id: "platinum", name: "Platinum", price: 10000, image: "https://i.imgur.com/L7iFvH0.png", animationClass: 'animate-glow-cyan' },
];

export default function FrameStorePage() {
    const router = useRouter();
    const { toast } = useToast();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isBuying, setIsBuying] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                const unsubscribeProfile = listenToUserProfile(user.uid, setUserProfile);
                return () => unsubscribeProfile();
            } else {
                router.push('/');
            }
        });
        return () => unsubscribeAuth();
    }, [router]);

    const handleBuyFrame = async (frame: typeof frameTiers[0]) => {
        if (!currentUser || !userProfile) {
            toast({ title: "Error", description: "You must be logged in to buy a frame.", variant: "destructive" });
            return;
        }

        if ((userProfile.frames || []).includes(frame.id)) {
            toast({ title: "Already Owned", description: "You already own this frame.", });
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
                                <Button className="w-full mt-auto" onClick={() => handleBuyFrame(tier)} disabled={isOwned || isBuying === tier.id}>
                                    {isBuying === tier.id ? <Loader2 className="animate-spin" /> : 
                                     isOwned ? <><CheckCircle className="mr-2 h-4 w-4" /> Owned</> : 
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

        <div>
            <h2 className="text-xl font-bold font-headline flex items-center gap-2 mb-4"><Film className="text-primary"/> Animated Frames</h2>
            {animatedFrameTiers.length > 0 ? (
                <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
                >
                <CarouselContent>
                    {animatedFrameTiers.map((tier) => {
                      const isOwned = (userProfile?.frames || []).includes(tier.id);
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
                              <Button className="w-full mt-auto" onClick={() => handleBuyFrame(tier)} disabled={isOwned || isBuying === tier.id}>
                                    {isBuying === tier.id ? <Loader2 className="animate-spin" /> : 
                                     isOwned ? <><CheckCircle className="mr-2 h-4 w-4" /> Owned</> : 
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
                    <h3 className="text-xl font-semibold">Animated Frames Coming Soon</h3>
                    <p className="text-muted-foreground">New and exciting animated frames will be available shortly.</p>
                </Card>
            )}
        </div>
      </div>
    </AppLayout>
  );
}
