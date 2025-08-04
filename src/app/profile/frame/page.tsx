
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Square, Crown, Film } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";

const frameTiers = [
  { name: "Neon Glow", price: "500 Coins", animationClass: "animate-glow-green-shadow", image: "https://i.imgur.com/QJOss4l.png" },
  { name: "Golden Ornate", price: "1500 Coins", animationClass: "animate-glow-gold-shadow", image: "https://i.imgur.com/KHhzNAV.png" },
  { name: "Cosmic Swirl", price: "3000 Coins", animationClass: "animate-glow-purple-shadow", image: "https://i.imgur.com/xm6TS00.png" },
  { name: "Glacial Ice", price: "5000 Coins", animationClass: "animate-glow-sky-shadow", image: "https://i.imgur.com/3fZOzLh.png" },
  { name: "Ruby Red", price: "7500 Coins", animationClass: "animate-glow-red-shadow", image: "https://i.imgur.com/2wGrqno.png" },
  { name: "Emerald Shine", price: "10000 Coins", animationClass: "animate-glow-emerald-shadow", image: "https://i.imgur.com/jj5kzAj.png" },
];

const animatedFrameTiers = [
    { name: "Welcome", price: "25000 Coins", image: "https://i.imgur.com/L0QVCz5.gif", animationClass: "animate-glow-gold-shadow" },
    { name: "Baby Tiger", price: "35000 Coins", image: "https://i.imgur.com/0Ida8tN.gif", animationClass: "animate-pulse-luxury" },
    { name: "No No", price: "10000 Coins", image: "https://i.imgur.com/ivjX3AG.gif", animationClass: "animate-bounce" },
    { name: "Thank You", price: "20000 Coins", image: "https://i.imgur.com/KkRoyNG.gif", animationClass: "animate-glow-pink-shadow" },
    { name: "Happy", price: "22000 Coins", image: "https://i.imgur.com/ur8gnNg.gif", animationClass: "animate-tada" },
    { name: "I'm King", price: "50000 Coins", image: "https://i.imgur.com/RGlRi8p.gif", animationClass: "animate-pulse-luxury" },
    { name: "Long Life", price: "45000 Coins", image: "https://i.imgur.com/uuYE1y6.gif", animationClass: "animate-glow-gold-shadow" },
    { name: "Don't Worry", price: "18000 Coins", image: "https://i.imgur.com/R5PCG1C.gif", animationClass: "animate-bounce" },
    { name: "Boss", price: "60000 Coins", image: "https://i.imgur.com/Oz4ud1o.gif", animationClass: "animate-pulse-luxury" },
    { name: "Geooo", price: "40000 Coins", image: "https://i.imgur.com/O4Fxx4F.gif", animationClass: "animate-glow-green-shadow" },
    { name: "Baby", price: "15000 Coins", image: "https://i.imgur.com/Z1q3Wzp.gif", animationClass: "animate-glow-sky-shadow" },
    { name: "I'm Going", price: "28000 Coins", image: "https://i.imgur.com/7aQbGmH.gif", animationClass: "animate-tada" },
    { name: "I'm Coming", price: "30000 Coins", image: "https://i.imgur.com/kUs3XY4.gif", animationClass: "animate-glow-purple-shadow" },
    { name: "Gift Box 1", price: "12000 Coins", image: "https://i.imgur.com/cnp5DtX.gif", animationClass: "animate-bounce" },
    { name: "Gift Box 2", price: "18000 Coins", image: "https://i.imgur.com/0I2I0qJ.gif", animationClass: "animate-glow-red-shadow" },
]

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
        </div>

        <div>
            <h2 className="text-xl font-bold font-headline flex items-center gap-2 mb-4"><Film className="text-primary"/> Animated Frames</h2>
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
        </div>
      </div>
    </AppLayout>
  );
}
