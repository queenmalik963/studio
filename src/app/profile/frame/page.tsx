
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
  { name: "Neon Glow", price: "500 Coins", color: "animate-glow-green-shadow", image: "https://i.imgur.com/QJOss4l.png" },
  { name: "Golden Ornate", price: "1500 Coins", color: "animate-glow-gold-shadow", image: "https://i.imgur.com/KHhzNAV.png" },
  { name: "Cosmic Swirl", price: "3000 Coins", color: "animate-glow-purple-shadow", image: "https://i.imgur.com/xm6TS00.png" },
  { name: "Glacial Ice", price: "5000 Coins", color: "animate-glow-sky-shadow", image: "https://i.imgur.com/3fZOzLh.png" },
  { name: "Ruby Red", price: "7500 Coins", color: "animate-glow-red-shadow", image: "https://i.imgur.com/2wGrqno.png" },
  { name: "Emerald Shine", price: "10000 Coins", color: "animate-glow-emerald-shadow", image: "https://i.imgur.com/jj5kzAj.png" },
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
                      <div className="w-40 h-40 flex items-center justify-center relative">
                        <Image 
                            src="https://placehold.co/150x150.png"
                            alt="Your Pic" 
                            width={140}
                            height={140}
                            className="rounded-full"
                            data-ai-hint="person face"
                        />
                        <Image
                            src={tier.image}
                            alt={tier.name}
                            layout="fill"
                            className={cn("absolute inset-0 object-contain", tier.color)}
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
      </div>
    </AppLayout>
  );
}
