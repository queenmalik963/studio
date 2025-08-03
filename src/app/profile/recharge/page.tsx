
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Gem, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12h-8c0 11.045 8.955 20 20 20z"/>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.447-2.275 4.485-4.17 6.083l6.19 5.238C42.012 35.853 44 30.222 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
);

const JazzCashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8c4.42 0 8-3.58 8-8 0-1.09-.22-2.14-.63-3.11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15.41 12.41L12 15.82l-3.41-3.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5V15.82" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export default function RechargePage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleRecharge = (coins: number) => {
    toast({
        title: "Recharge Successful!",
        description: `${coins.toLocaleString()} coins have been added to your wallet.`,
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
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" size="lg" className="h-16 text-lg justify-start gap-3">
                    <GoogleIcon className="w-6 h-6" /> Google Pay
                </Button>
                 <Button variant="destructive" size="lg" className="h-16 text-lg bg-[#E21221] hover:bg-[#E21221]/90 text-white justify-start gap-3">
                    <JazzCashIcon className="w-6 h-6" /> JazzCash
                </Button>
                 <Button variant="default" size="lg" className="h-16 text-lg bg-[#0070BA] hover:bg-[#0070BA]/90 justify-start gap-3">
                    <CreditCard className="w-6 h-6" /> Credit Card
                </Button>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
