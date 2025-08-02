
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Crown } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const vipTiers = [
  { name: "Bronze", price: "$4.99/mo", features: ["Bronze Badge", "Basic Chat Features"], color: "from-amber-700 to-amber-900" },
  { name: "Silver", price: "$9.99/mo", features: ["Silver Badge", "Ad-Free Viewing", "Custom Emotes"], color: "from-slate-400 to-slate-600" },
  { name: "Gold", price: "$19.99/mo", features: ["Gold Badge", "All Silver Perks", "Exclusive Content"], color: "from-yellow-500 to-yellow-700" },
  { name: "Platinum", price: "$29.99/mo", features: ["Platinum Badge", "All Gold Perks", "HD Streaming"], color: "from-cyan-200 to-cyan-500" },
  { name: "Diamond", price: "$49.99/mo", features: ["Diamond Badge", "All Platinum Perks", "Priority Support"], color: "from-sky-400 to-sky-600" },
  { name: "Master", price: "$79.99/mo", features: ["Master Badge", "All Diamond Perks", "Beta Access"], color: "from-purple-500 to-purple-700" },
  { name: "Grandmaster", price: "$99.99/mo", features: ["Grandmaster Badge", "All Master Perks", "Direct Dev Chat"], color: "from-rose-500 to-rose-700" },
  { name: "Challenger", price: "$149.99/mo", features: ["Challenger Badge", "All GM Perks", "Personalized Avatar"], color: "from-emerald-500 to-emerald-700" },
  { name: "Legend", price: "$199.99/mo", features: ["Legend Badge", "All Challenger Perks", "IRL Event Invites"], color: "from-fuchsia-600 to-pink-800" },
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
              delay: 2000,
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
                    <CardHeader>
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
