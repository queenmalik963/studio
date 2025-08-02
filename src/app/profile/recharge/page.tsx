
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Gem } from "lucide-react";
import { useRouter } from "next/navigation";

const rechargePacks = [
  { coins: 500, price: "$4.99", color: "from-green-500 to-emerald-600" },
  { coins: 1200, price: "$9.99", bonus: "+100 Bonus", color: "from-sky-500 to-cyan-600" },
  { coins: 2500, price: "$19.99", bonus: "+300 Bonus", color: "from-blue-500 to-indigo-600" },
  { coins: 6500, price: "$49.99", bonus: "+1000 Bonus", popular: true, color: "from-purple-500 to-fuchsia-600" },
  { coins: 14000, price: "$99.99", bonus: "+2500 Bonus", color: "from-rose-500 to-pink-600" },
];

export default function RechargePage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">Recharge Coins</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rechargePacks.map((pack, index) => (
            <Card key={index} className={`text-white bg-gradient-to-br ${pack.color} relative overflow-hidden`}>
              {pack.popular && (
                <div className="absolute top-2 right-[-25px] bg-yellow-400 text-black text-xs font-bold px-8 py-1 transform rotate-45">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-3xl">
                  <Gem /> {pack.coins.toLocaleString()}
                </CardTitle>
                {pack.bonus && <CardDescription className="text-yellow-300 font-semibold">{pack.bonus}</CardDescription>}
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-xl font-bold">
                  {pack.price}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
