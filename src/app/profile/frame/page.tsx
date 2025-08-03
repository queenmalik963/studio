
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Square, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";

const frameTiers = [
  { name: "Neon Glow", price: "500 Coins", color: "border-green-400 animate-glow-green" },
  { name: "Golden Ornate", price: "1500 Coins", color: "border-yellow-400 animate-glow-gold" },
  { name: "Cosmic Swirl", price: "3000 Coins", color: "border-purple-500 animate-glow-purple" },
  { name: "Glacial Ice", price: "5000 Coins", color: "border-sky-400 animate-glow-sky" },
  { name: "Ruby Red", price: "7500 Coins", color: "border-red-500 animate-glow-red" },
  { name: "Emerald Shine", price: "10000 Coins", color: "border-emerald-500 animate-glow-emerald" },
];

export default function FrameStorePage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">Frame Store</h1>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {frameTiers.map((tier, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="bg-card/50 h-full flex flex-col">
                    <CardContent className="flex flex-col items-center justify-center p-4 gap-4 flex-grow">
                      <div className={cn("w-40 h-40 rounded-full flex items-center justify-center relative border-4", tier.color)}>
                        <Image 
                            src="https://placehold.co/150x150.png"
                            alt="Your Pic" 
                            width={140}
                            height={140}
                            className="rounded-full"
                            data-ai-hint="person face"
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
      </div>
    </AppLayout>
  );
}
