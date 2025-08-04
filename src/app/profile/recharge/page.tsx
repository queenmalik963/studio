
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Gem } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

const rechargePacks = [
  { coins: 100, price: "$0.99", color: "from-gray-500 to-gray-600" },
  { coins: 500, price: "$4.99", color: "from-green-500 to-emerald-600" },
  { coins: 1200, price: "$9.99", bonus: "+100", color: "from-sky-500 to-cyan-600" },
  { coins: 2500, price: "$19.99", bonus: "+300", color: "from-blue-500 to-indigo-600" },
  { coins: 6500, price: "$49.99", bonus: "+1k", popular: true, color: "from-purple-500 to-fuchsia-600" },
  { coins: 14000, price: "$99.99", bonus: "+2.5k", color: "from-rose-500 to-pink-600" },
  { coins: 30000, price: "$199.99", bonus: "+6k", color: "from-orange-500 to-amber-600" },
  { coins: 50000, price: "$299.99", bonus: "+12k", color: "from-red-500 to-red-700" },
  { coins: 70000, price: "$499.99", bonus: "+15k", color: "from-red-600 to-orange-700" },
];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.043 4.957a9.992 9.992 0 00-14.088 14.088A9.992 9.992 0 0019.043 4.957zM6.48 18.03l.69-.35a6.012 6.012 0 01-3.26-5.83 6.02 6.02 0 0110.82-3.69A6.02 6.02 0 018.85 16.3l-.38.74-1.12 2.18.13-1.19z" fillOpacity="0.09"/><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM17.44 14.23c-.2-.1-.58-.28-1.04-.53s-.36-.08-.51.15c-.15.23-.59.75-.72.9s-.27.15-.5.08c-.23-.08-1.08-.4-2.05-1.26a8.47 8.47 0 01-1.44-1.72c-.15-.27-.04-.42.06-.55.09-.12.2-.28.3-.42.1-.15.15-.23.23-.38.08-.15.04-.28 0-.42s-1.1-2.62-1.5-3.58c-.4-.96-.8-1.04-.8-.96s-.68.08-.68.08a2.53 2.53 0 00-.73 1.67c0 1 .58 2.3 1.33 3.58s1.6 2.3 3.96 4.45c2.36 2.15 3.1 2.45 3.1 2.45s.68.08.68.08c.96 0 1.67-.73 1.67-.73s.08-.68.08-.68l-.08-2.15z"/>
    </svg>
);


export default function RechargePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRecharge = (coins: number) => {
    toast({
        title: "Recharge Pack Selected!",
        description: `Contact us on WhatsApp to purchase ${coins.toLocaleString()} coins.`,
    })
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">Recharge Coins</h1>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3">
          {rechargePacks.map((pack, index) => (
            <Card 
              key={index} 
              onClick={() => handleRecharge(pack.coins)}
              className={cn(`text-white bg-gradient-to-br cursor-pointer relative overflow-hidden aspect-square flex flex-col justify-center items-center p-2 text-center`, pack.color)}
            >
              {pack.popular && (
                <div className="absolute top-0 right-[-18px] bg-yellow-400 text-black text-[8px] font-bold px-4 py-0.5 transform rotate-45">
                  Pop
                </div>
              )}
               <div className="flex items-center gap-1">
                  <Gem className="w-3 h-3" />
                  <span className="font-bold text-sm">{pack.coins.toLocaleString()}</span>
                </div>
                {pack.bonus && <p className="text-yellow-300 font-semibold text-[10px]">{pack.bonus}</p>}
                <p className="text-xs font-bold mt-1 bg-black/20 px-2 py-0.5 rounded-full">{pack.price}</p>
            </Card>
          ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Click the button below to contact us for recharge.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={`https://wa.me/971564423341?text=I'd%20like%20to%20recharge%20my%20account.`} target="_blank" rel="noopener noreferrer" passHref>
                    <Button variant="outline" size="lg" className="h-16 w-full text-lg justify-center gap-3 bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-foreground">
                        <WhatsAppIcon className="w-8 h-8 text-green-500" /> Contact on WhatsApp
                    </Button>
                </Link>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
