
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Gem } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/firebase";
import { updateUserProfile, type UserProfile } from "@/services/userService";

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

const GooglePayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.186 10.32L8.53 7.554H6.264l3.96 6.444L10.186 10.32Z" fill="#34A853"/>
        <path d="M14.186 10.32L12.53 7.554H10.26l3.96 6.444L14.186 10.32Z" fill="#34A853"/>
        <path d="M15.42 12.18L13.763 15h2.264l1.657-2.82Z" fill="#FBBC04"/>
        <path d="M8.58 12.18L6.923 15H9.187l-0.607-2.82Z" fill="#FBBC04"/>
        <path d="M12 4.5C10.02 4.5 8.22 5.25 6.84 6.45L4.95 4.56C6.96 2.82 9.39 1.8 12 1.8c4.68 0 8.64 3.06 9.99 7.2H12V4.5Z" fill="#EA4335"/>
        <path d="M21.99 9H12v4.5h6.18c-.36 1.98-1.71 3.42-3.6 4.23l1.89 1.98c2.7-2.25 4.23-5.76 4.23-9.54V9Z" fill="#4285F4"/>
    </svg>
);

const JazzCashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#D9002C"/>
        <path d="M12 6.5C9.51 6.5 7.5 8.51 7.5 11V13C7.5 15.49 9.51 17.5 12 17.5C14.49 17.5 16.5 15.49 16.5 13V11C16.5 8.51 14.49 6.5 12 6.5ZM12 15.5C10.62 15.5 9.5 14.38 9.5 13V11C9.5 9.62 10.62 8.5 12 8.5C13.38 8.5 14.5 9.62 14.5 11V13C14.5 14.38 13.38 15.5 12 15.5Z" fill="white"/>
    </svg>
);

const CreditCardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="5" y="14" width="4" height="2" fill="currentColor"/>
        <path d="M2 9H22" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

type RechargePack = typeof rechargePacks[0];

export default function RechargePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedPack, setSelectedPack] = useState<RechargePack | null>(null);

  const handleRecharge = (pack: RechargePack) => {
    setSelectedPack(pack);
    toast({
        title: "Recharge Pack Selected!",
        description: `Proceed with payment for ${pack.coins.toLocaleString()} coins.`,
    })
  }

  const handlePaymentSubmit = async (method: string) => {
    const user = auth.currentUser;
    if (!user || !selectedPack) {
        toast({
            title: "Something went wrong",
            description: "Please select a pack and be logged in to recharge.",
            variant: "destructive",
        });
        return;
    }

    toast({
        title: "Processing Payment",
        description: `Your payment via ${method} is being processed.`,
    });
    
    // In a real app, you would process payment here. For demo, we just add coins.
    const result = await updateUserProfile(user.uid, { coins: selectedPack.coins }, true);

    if (result.success) {
        toast({
            title: "Recharge Successful!",
            description: `${selectedPack.coins.toLocaleString()} coins have been added to your wallet.`,
        });
        router.push('/profile');
    } else {
        toast({
            title: "Recharge Failed",
            description: result.error || "An unknown error occurred.",
            variant: "destructive",
        });
    }
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
              onClick={() => handleRecharge(pack)}
              className={cn(
                `text-white bg-gradient-to-br cursor-pointer relative overflow-hidden aspect-square flex flex-col justify-center items-center p-2 text-center border-2`, 
                pack.color,
                selectedPack?.coins === pack.coins ? 'border-yellow-300' : 'border-transparent'
              )}
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

        <Card>
            <CardHeader>
                <CardTitle>More Payment Methods</CardTitle>
                <CardDescription>Select another payment method.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-16 text-base gap-3" disabled={!selectedPack}>
                            <GooglePayIcon /> Google Pay
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Google Pay</DialogTitle>
                            <DialogDescription>Enter your Google Pay details to proceed.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="gpay-id">Google Pay ID</Label>
                                <Input id="gpay-id" placeholder="yourname@okhdfcbank" />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                            <DialogClose asChild><Button onClick={() => handlePaymentSubmit('Google Pay')}>Proceed</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-16 text-base gap-3" disabled={!selectedPack}>
                            <JazzCashIcon /> JazzCash
                        </Button>
                    </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                            <DialogTitle>JazzCash</DialogTitle>
                            <DialogDescription>Enter your JazzCash account number.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="jazzcash-number">JazzCash Number</Label>
                                <Input id="jazzcash-number" type="tel" placeholder="03xxxxxxxxx" />
                            </div>
                        </div>
                         <DialogFooter>
                            <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                            <DialogClose asChild><Button onClick={() => handlePaymentSubmit('JazzCash')}>Proceed</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-16 text-base gap-3" disabled={!selectedPack}>
                           <CreditCardIcon /> Credit Card
                        </Button>
                    </DialogTrigger>
                     <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Credit/Debit Card</DialogTitle>
                            <DialogDescription>Enter your card details.</DialogDescription>
                        </DialogHeader>
                        <div className="py-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input id="card-number" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry</Label>
                                    <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc">CVC</Label>
                                    <Input id="cvc" placeholder="123" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                           <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                           <DialogClose asChild><Button onClick={() => handlePaymentSubmit('Credit Card')}>Pay Now</Button></DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>

      </div>
    </AppLayout>
  );
}
