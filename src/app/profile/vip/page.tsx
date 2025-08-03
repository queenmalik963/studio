
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";

const vipTiers = [
  { name: "Bronze", price: "$4.99/mo", features: ["Bronze Badge", "Basic Chat Features"], color: "from-amber-700 to-amber-900", frameClass: "border-amber-500 animate-glow-amber" },
  { name: "Silver", price: "$9.99/mo", features: ["Silver Badge", "Ad-Free Viewing", "Custom Emotes"], color: "from-slate-400 to-slate-600", frameClass: "border-slate-300 animate-glow-silver" },
  { name: "Gold", price: "$19.99/mo", features: ["Gold Badge", "All Silver Perks", "Exclusive Content"], color: "from-yellow-500 to-yellow-700", frameClass: "border-yellow-400 animate-glow-gold" },
  { name: "Platinum", price: "$29.99/mo", features: ["Platinum Badge", "All Gold Perks", "HD Streaming"], color: "from-cyan-200 to-cyan-500", frameClass: "border-cyan-300 animate-glow-cyan" },
  { name: "Diamond", price: "$49.99/mo", features: ["Diamond Badge", "All Platinum Perks", "Priority Support"], color: "from-sky-400 to-sky-600", frameClass: "border-sky-400 animate-glow-sky" },
  { name: "Master", price: "$79.99/mo", features: ["Master Badge", "All Diamond Perks", "Beta Access"], color: "from-purple-500 to-purple-700", frameClass: "border-purple-400 animate-glow-purple" },
  { name: "Grandmaster", price: "$99.99/mo", features: ["Grandmaster Badge", "All Master Perks", "Direct Dev Chat"], color: "from-rose-500 to-rose-700", frameClass: "border-rose-400 animate-glow-rose" },
  { name: "Challenger", price: "$149.99/mo", features: ["Challenger Badge", "All GM Perks", "Personalized Avatar"], color: "from-emerald-500 to-emerald-700", frameClass: "border-emerald-400 animate-glow-emerald" },
  { name: "Legend", price: "$199.99/mo", features: ["Legend Badge", "All Challenger Perks", "IRL Event Invites"], color: "from-fuchsia-600 to-pink-800", frameClass: "border-pink-400 animate-glow-pink" },
];

export default function VipStorePage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">VIP Store</h1>
        </div>

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
                  <Card className={cn("flex flex-col h-full text-white bg-gradient-to-br", tier.color)}>
                    <CardHeader className="items-center text-center">
                      <div className={cn("w-24 h-24 rounded-full border-4 flex items-center justify-center relative mb-4", tier.frameClass)}>
                          <Image
                            src="https://placehold.co/100x100.png"
                            alt="User Picture"
                            width={100}
                            height={100}
                            className="rounded-full"
                            data-ai-hint="person face"
                          />
                      </div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Crown /> {tier.name} VIP
                      </CardTitle>
                      <CardDescription className="text-white/80 text-3xl font-bold">{tier.price}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <ul className="space-y-2 list-disc list-inside text-white/90">
                        {tier.features.map(feature => <li key={feature}>{feature}</li>)}
                      </ul>
                      <Button className="w-full mt-6 bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30">
                        Purchase
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
