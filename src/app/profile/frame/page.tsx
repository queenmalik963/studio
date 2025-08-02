
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const frameTiers = [
  { name: "Neon Glow", price: "500 Coins", image: "https://placehold.co/200x200.png", hint: "neon border" },
  { name: "Golden Ornate", price: "1500 Coins", image: "https://placehold.co/200x200.png", hint: "gold vintage frame" },
  { name: "Cosmic Swirl", price: "3000 Coins", image: "https://placehold.co/200x200.png", hint: "galaxy border" },
  { name: "Glacial Ice", price: "5000 Coins", image: "https://placehold.co/200x200.png", hint: "ice crystal frame" },
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
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="p-1">
                  <Card className="bg-card/50">
                    <CardContent className="flex flex-col items-center justify-center p-4 gap-4">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary relative">
                         <Image src={tier.image} alt={tier.name} layout="fill" objectFit="cover" data-ai-hint={tier.hint} />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <p className="text-white font-bold text-lg">Your Pic</p>
                         </div>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-lg">{tier.name}</p>
                        <p className="text-muted-foreground">{tier.price}</p>
                      </div>
                      <Button className="w-full">
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
