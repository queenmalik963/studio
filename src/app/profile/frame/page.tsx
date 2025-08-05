
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Square, Crown, Film, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";

const frameTiers = [
    { name: "Gold", price: "1000 Coins", image: "https://i.imgur.com/K1hT0G8.png", animationClass: 'animate-glow-gold' },
    { name: "Purple", price: "1000 Coins", image: "https://i.imgur.com/qg9gGgC.png", animationClass: 'animate-glow-purple' },
    { name: "Blue", price: "1000 Coins", image: "https://i.imgur.com/L7iFvH0.png", animationClass: 'animate-glow-blue' },
    { name: "Green", price: "1000 Coins", image: "https://i.imgur.com/T0bS1Y4.png", animationClass: 'animate-glow-green' },
    { name: "Red", price: "1000 Coins", image: "https://i.imgur.com/8Q6tB2F.png", animationClass: 'animate-glow-red' },
    { name: "Cyan", price: "1000 Coins", image: "https://i.imgur.com/7bYnHB4.png", animationClass: 'animate-glow-cyan' },
];

const animatedFrameTiers = [
    { name: "Crimson Danger", price: "5000 Coins", image: "https://i.imgur.com/DADsWdw.gif", animationClass: 'animate-glow-red' },
    { name: "Master", price: "15000 Coins", image: "https://i.imgur.com/K1hT0G8.png", animationClass: 'animate-glow-purple' },
    { name: "Dragon Fury", price: "25000 Coins", image: "https://i.imgur.com/RqnqCso.gif", animationClass: 'animate-glow-amber' },
    { name: "Platinum", price: "10000 Coins", image: "https://i.imgur.com/L7iFvH0.png", animationClass: 'animate-glow-cyan' },
];

export default function FrameStorePage() {
  const router = useRouter();

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
                    {frameTiers.map((tier, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                                <p className="text-muted-foreground">{tier.price}</p>
                            </div>
                            <Button className="w-full mt-auto">
                                <Square className="mr-2 h-4 w-4" /> Buy Frame
                            </Button>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
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
                    {animatedFrameTiers.map((tier, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
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
                                <p className="text-muted-foreground">{tier.price}</p>
                            </div>
                            <Button className="w-full mt-auto">
                                <Square className="mr-2 h-4 w-4" /> Buy Frame
                            </Button>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
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
