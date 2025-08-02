
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Gem, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const rechargePacks = [
  { coins: 100, price: "$0.99", color: "from-gray-500 to-gray-600" },
  { coins: 500, price: "$4.99", color: "from-green-500 to-emerald-600" },
  { coins: 1200, price: "$9.99", bonus: "+100 Bonus", color: "from-sky-500 to-cyan-600" },
  { coins: 2500, price: "$19.99", bonus: "+300 Bonus", color: "from-blue-500 to-indigo-600" },
  { coins: 6500, price: "$49.99", bonus: "+1000 Bonus", popular: true, color: "from-purple-500 to-fuchsia-600" },
  { coins: 14000, price: "$99.99", bonus: "+2500 Bonus", color: "from-rose-500 to-pink-600" },
  { coins: 30000, price: "$199.99", bonus: "+6000 Bonus", color: "from-orange-500 to-amber-600" },
  { coins: 50000, price: "$299.99", bonus: "+12000 Bonus", color: "from-red-500 to-red-700" },
];

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 2v10l6 4" />
        <path d="M12 12.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rechargePacks.map((pack, index) => (
            <Card key={index} className={`text-white bg-gradient-to-br ${pack.color} relative overflow-hidden`}>
              {pack.popular && (
                <div className="absolute top-2 right-[-25px] bg-yellow-400 text-black text-xs font-bold px-8 py-1 transform rotate-45">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Gem /> {pack.coins.toLocaleString()}
                </CardTitle>
                {pack.bonus && <CardDescription className="text-yellow-300 font-semibold">{pack.bonus}</CardDescription>}
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-lg font-bold" onClick={() => handleRecharge(pack.coins)}>
                  {pack.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" size="lg" className="h-16 text-lg">
                    <GoogleIcon className="mr-3 w-6 h-6" /> Google Pay
                </Button>
                 <Button variant="outline" size="lg" className="h-16 text-lg">
                    <JazzCashIcon className="mr-3 w-6 h-6 text-red-500" /> JazzCash
                </Button>
                 <Button variant="outline" size="lg" className="h-16 text-lg">
                    <CreditCard className="mr-3 w-6 h-6" /> Credit Card
                </Button>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
