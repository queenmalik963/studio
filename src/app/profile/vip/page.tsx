
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
  { name: "Bronze", price: "$4.99/mo", features: ["Bronze Badge", "Basic Chat Features"], color: "from-amber-700 to-amber-900", frameClass: "border-amber-500 animate-glow-amber", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="#cd7f32" strokeWidth="5"/><path d="M50,2.5L55,10L50,17.5L45,10Z" fill="#cd7f32"/><path d="M50,97.5L55,90L50,82.5L45,90Z" fill="#cd7f32"/><path d="M2.5,50L10,55L17.5,50L10,45Z" fill="#cd7f32"/><path d="M97.5,50L90,55L82.5,50L90,45Z" fill="#cd7f32"/></svg>) },
  { name: "Silver", price: "$9.99/mo", features: ["Silver Badge", "Ad-Free Viewing", "Custom Emotes"], color: "from-slate-400 to-slate-600", frameClass: "border-slate-300 animate-glow-silver", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="#c0c0c0" strokeWidth="5" strokeDasharray="10 5"/><circle cx="20" cy="20" r="5" fill="#c0c0c0"/><circle cx="80" cy="20" r="5" fill="#c0c0c0"/><circle cx="20" cy="80" r="5" fill="#c0c0c0"/><circle cx="80" cy="80" r="5" fill="#c0c0c0"/></svg>) },
  { name: "Gold", price: "$19.99/mo", features: ["Gold Badge", "All Silver Perks", "Exclusive Content"], color: "from-yellow-500 to-yellow-700", frameClass: "border-yellow-400 animate-glow-gold", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="gold" strokeWidth="5"/><path d="M50,15 L55,25 L65,25 L57.5,32.5 L60,42.5 L50,37.5 L40,42.5 L42.5,32.5 L35,25 L45,25 Z" fill="gold"/></svg>) },
  { name: "Platinum", price: "$29.99/mo", features: ["Platinum Badge", "All Gold Perks", "HD Streaming"], color: "from-cyan-200 to-cyan-500", frameClass: "border-cyan-300 animate-glow-cyan", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><rect x="2.5" y="2.5" width="95" height="95" rx="50" fill="none" stroke="#e5e4e2" strokeWidth="5"/><path d="M10,30 L90,30 M10,50 L90,50 M10,70 L90,70" stroke="#e5e4e2" strokeWidth="3"/></svg>) },
  { name: "Diamond", price: "$49.99/mo", features: ["Diamond Badge", "All Platinum Perks", "Priority Support"], color: "from-sky-400 to-sky-600", frameClass: "border-sky-400 animate-glow-sky", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5 L70,20 L97.5,50 L70,80 L50,97.5 L30,80 L2.5,50 L30,20 Z" fill="none" stroke="#b9f2ff" strokeWidth="5"/></svg>) },
  { name: "Master", price: "$79.99/mo", features: ["Master Badge", "All Diamond Perks", "Beta Access"], color: "from-purple-500 to-purple-700", frameClass: "border-purple-400 animate-glow-purple", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="#a020f0" strokeWidth="5"/><path d="M25,25 L75,75 M25,75 L75,25" stroke="#a020f0" strokeWidth="5"/></svg>), specialFrameUrl: 'https://i.imgur.com/DADsWdw.gif' },
  { name: "Grandmaster", price: "$99.99/mo", features: ["Grandmaster Badge", "All Master Perks", "Direct Dev Chat"], color: "from-rose-500 to-rose-700", frameClass: "border-rose-400 animate-glow-rose", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="#ff007f" strokeWidth="2.5"/><path d="M50,12.5A37.5,37.5,0,1,1,12.5,50,37.5,37.5,0,0,1,50,12.5" fill="none" stroke="#ff007f" strokeWidth="2.5"/><path d="M50,25 L65,40 L65,60 L50,75 L35,60 L35,40 Z" fill="#ff007f"/></svg>) },
  { name: "Challenger", price: "$149.99/mo", features: ["Challenger Badge", "All GM Perks", "Personalized Avatar"], color: "from-emerald-500 to-emerald-700", frameClass: "border-emerald-400 animate-glow-emerald", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5 L97.5,50 L50,97.5 L2.5,50 Z" fill="none" stroke="#50c878" strokeWidth="5"/><path d="M50,15 L85,50 L50,85 L15,50 Z" fill="#50c878"/></svg>) },
  { name: "Legend", price: "$199.99/mo", features: ["Legend Badge", "All Challenger Perks", "IRL Event Invites"], color: "from-fuchsia-600 to-pink-800", frameClass: "border-pink-400 animate-glow-pink", frameSvg: (props: any) => (<svg {...props} viewBox="0 0 100 100"><path d="M50,2.5A47.5,47.5,0,1,1,2.5,50,47.5,47.5,0,0,1,50,2.5" fill="none" stroke="url(#legend-gradient)" strokeWidth="5"/><defs><radialGradient id="legend-gradient"><stop offset="0%" stopColor="#ff00ff"/><stop offset="100%" stopColor="#ffc0cb"/></radialGradient></defs><path d="M50,20 L58,38 L78,40 L62,54 L68,72 L50,62 L32,72 L38,54 L22,40 L42,38 Z" fill="url(#legend-gradient)"/></svg>) },
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
                      <div className="w-28 h-28 relative mb-4">
                           <Image
                            src="https://placehold.co/100x100.png"
                            alt="User Picture"
                            width={112}
                            height={112}
                            className="rounded-full object-cover"
                            data-ai-hint="person face"
                          />
                          {(tier as any).specialFrameUrl ? (
                                <Image 
                                    unoptimized
                                    src={(tier as any).specialFrameUrl}
                                    alt={`${tier.name} Frame`}
                                    layout="fill"
                                    className="absolute -inset-1 pointer-events-none animate-pulse-luxury"
                                />
                           ) : (
                             <>
                                <div className={cn("absolute inset-[-6px] rounded-full", tier.frameClass)}></div>
                                <tier.frameSvg className="absolute inset-[-12px] w-[calc(100%+24px)] h-[calc(100%+24px)]" />
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
