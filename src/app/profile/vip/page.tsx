
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ArrowLeft, Crown, Inbox } from "lucide-react";
import { useRouter } from "next/navigation";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";

const vipTiers: any[] = [];

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
                            <div className="absolute -top-4 right-[-16px] w-16 h-16 z-10 animate-glow-silver">
                                <Image
                                    src={tier.tagImage}
                                    alt={`${tier.name} Tag`}
                                    layout="fill"
                                    className="object-contain"
                                />
                            </div>
                        )}
                        <CardHeader className="items-center text-center">
                        <div className={cn("relative mb-4", tier.name === 'Shogun' ? 'w-24 h-24' : 'w-20 h-20')}>
                            {(tier as any).specialFrameUrl ? (
                                    <Image 
                                        unoptimized
                                        src={(tier as any).specialFrameUrl}
                                        alt={`${tier.name} Frame`}
                                        layout="fill"
                                        className={cn("absolute pointer-events-none animate-pulse-luxury", tier.frameClass, tier.name === 'Shogun' ? '-inset-2' : '-inset-1')}
                                    />
                            ) : (
                                <>
                                    <div className={cn("absolute rounded-full", tier.frameClass, tier.name === 'Shogun' ? 'inset-[-8px]' : 'inset-[-4px]')}></div>
                                    {tier.frameSvg && <tier.frameSvg className={cn("absolute", tier.name === 'Shogun' ? '-inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)]' : '-inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)]')} />}
                                </>
                            )}
                        </div>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Crown /> {tier.name} VIP
                        </CardTitle>
                        <CardDescription className="text-white/80 text-3xl font-bold">{tier.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                        <ul className="space-y-2 list-disc list-inside text-white/90">
                            {tier.features.map((feature: string) => <li key={feature}>{feature}</li>)}
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
