
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Gem, Landmark, Repeat, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/lib/firebase";
import { listenToUserProfile, exchangeDiamondsForCoins, type UserProfile } from "@/services/userService";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.043 4.957a9.992 9.992 0 00-14.088 14.088A9.992 9.992 0 0019.043 4.957zM6.48 18.03l.69-.35a6.012 6.012 0 01-3.26-5.83 6.02 6.02 0 0110.82-3.69A6.02 6.02 0 018.85 16.3l-.38.74-1.12 2.18.13-1.19z" fillOpacity="0.09"/><path d="M12 2a10 10 0 100 20 10 10 0 000-20zM17.44 14.23c-.2-.1-.58-.28-1.04-.53s-.36-.08-.51.15c-.15.23-.59.75-.72.9s-.27.15-.5.08c-.23-.08-1.08-.4-2.05-1.26a8.47 8.47 0 01-1.44-1.72c-.15-.27-.04-.42.06-.55.09-.12.2-.28.3-.42.1-.15.15-.23.23-.38.08-.15.04-.28 0-.42s-1.1-2.62-1.5-3.58c-.4-.96-.8-1.04-.8-.96s-.68.08-.68.08a2.53 2.53 0 00-.73 1.67c0 1 .58 2.3 1.33 3.58s1.6 2.3 3.96 4.45c2.36 2.15 3.1 2.45 3.1 2.45s.68.08.68.08c.96 0 1.67-.73 1.67-.73s.08-.68.08-.68l-.08-2.15z"/>
    </svg>
);

const BankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L2 9l10 6 10-6-10-6z"/>
        <path d="M2 9v12l10 6 10-6V9"/>
        <path d="M22 9l-10 6"/>
    </svg>
);

const CryptoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"/>
        <path d="M8 12h8"/>
        <path d="M12 8v8"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="M5.5 5.5l1.4 1.4"/>
        <path d="M17.1 17.1l1.4 1.4"/>
        <path d="M5.5 18.5l1.4-1.4"/>
        <path d="M17.1 6.9l1.4-1.4"/>
    </svg>
);


export default function WithdrawPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [exchangeAmount, setExchangeAmount] = useState<number | string>("");
    const [withdrawAmount, setWithdrawAmount] = useState<number | string>("");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isExchanging, setIsExchanging] = useState(false);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const unsubscribe = listenToUserProfile(user.uid, (profileData) => {
                setProfile(profileData);
            });
            return () => unsubscribe();
        } else {
            router.push('/'); // Redirect if not logged in
        }
    }, [router]);

    const handleWithdrawAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setWithdrawAmount(value === "" ? "" : Number(value));
    };

    const handleExchangeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setExchangeAmount(value === "" ? "" : Number(value));
    };

    const handleWithdrawalSubmit = (method: string) => {
        toast({
            title: "Request Submitted",
            description: `Your withdrawal request via ${method} has been submitted.`,
        });
    }

    const handleExchange = async () => {
        const user = auth.currentUser;
        const amount = Number(exchangeAmount);

        if (!user) {
            toast({ title: "Error", description: "You are not logged in.", variant: "destructive" });
            return;
        }
        if (!profile) {
            toast({ title: "Error", description: "Could not load your profile.", variant: "destructive" });
            return;
        }
        if (!amount || amount <= 0) {
            toast({ title: "Invalid Amount", description: "Please enter a valid amount of diamonds to exchange.", variant: "destructive" });
            return;
        }
        if (amount > profile.diamonds) {
            toast({ title: "Insufficient Diamonds", description: `You only have ${profile.diamonds.toLocaleString()} diamonds.`, variant: "destructive" });
            return;
        }

        setIsExchanging(true);
        const result = await exchangeDiamondsForCoins(user.uid, amount);
        setIsExchanging(false);

        if (result.success) {
            toast({
                title: "Exchange Successful!",
                description: `${amount.toLocaleString()} diamonds have been converted to ${(amount * 2).toLocaleString()} coins.`,
            });
            setExchangeAmount("");
        } else {
            toast({
                title: "Exchange Failed",
                description: result.error || "An unknown error occurred.",
                variant: "destructive",
            });
        }
    };

    if (!profile) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>
            </AppLayout>
        )
    }

    const whatsappPhoneNumber = "971564423341";
    const isWithdrawAmountValid = typeof withdrawAmount === 'number' && withdrawAmount > 0 && withdrawAmount <= profile.diamonds;
    const whatsappMessage = encodeURIComponent(`I'd like to withdraw ${withdrawAmount} diamonds. My User ID is ${profile.id}.`);
    const whatsappLink = `https://wa.me/${whatsappPhoneNumber}?text=${whatsappMessage}`;

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-2xl font-bold font-headline">Withdraw & Exchange</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-teal-700 to-cyan-900 text-white border-teal-500/50 flex flex-col">
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">Withdraw Diamonds</CardTitle>
                            <CardDescription className="text-white/80 text-xs">100 Diamonds = $1.00</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 p-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                                <Label htmlFor="amount" className="text-xs">Amount</Label>
                                <div className="relative">
                                    <Gem className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
                                    <Input 
                                        id="amount" 
                                        type="number" 
                                        placeholder="5000" 
                                        className="pl-8 text-sm h-9 bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/80"
                                        value={withdrawAmount}
                                        onChange={handleWithdrawAmountChange}
                                    />
                                </div>
                                <p className="text-xs text-white/70">Available: {profile.diamonds.toLocaleString()}</p>
                            </div>
                            <p className="text-xs text-center text-white/80">Submit your request via one of the methods below.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-yellow-600 to-amber-800 text-white border-yellow-500/50 flex flex-col">
                        <CardHeader className="p-4">
                            <CardTitle className="text-base">Exchange</CardTitle>
                            <CardDescription className="text-white/80 text-xs">1 Diamond = 2 Coins</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 p-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-2">
                                <Label htmlFor="exchange-amount" className="text-xs">Diamonds</Label>
                                <div className="relative">
                                    <Gem className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
                                    <Input 
                                        id="exchange-amount" 
                                        type="number" 
                                        placeholder="1000" 
                                        className="pl-8 text-sm h-9 bg-white/10 border-white/20 placeholder:text-white/60 focus:ring-white/80"
                                        value={exchangeAmount}
                                        onChange={handleExchangeAmountChange}
                                        disabled={isExchanging}
                                    />
                                </div>
                                 <p className="text-xs text-white/70 h-6">
                                    {typeof exchangeAmount === 'number' && exchangeAmount > 0 
                                        ? `Get ${(exchangeAmount * 2).toLocaleString()} Coins` 
                                        : ''}
                                 </p>
                            </div>
                            <Button className="w-full bg-white/20 hover:bg-white/30 border border-white/40 h-9" size="sm" onClick={handleExchange} disabled={isExchanging}>
                                {isExchanging ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Repeat className="mr-2 h-4 w-4"/>}
                                {isExchanging ? 'Exchanging...' : 'Exchange'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Withdraw via WhatsApp</CardTitle>
                            <CardDescription>
                                After filling the amount above, contact us on WhatsApp to complete the process.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Button asChild disabled={!isWithdrawAmountValid} className="h-16 w-full text-lg justify-center gap-3 bg-green-500/10 border-green-500/30 hover:bg-green-500/20 text-foreground">
                                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <WhatsAppIcon className="w-8 h-8 text-green-500" /> Contact on WhatsApp
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Other Withdrawal Methods</CardTitle>
                            <CardDescription>Select an alternative method for withdrawal.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="h-16 text-base gap-3" disabled={!isWithdrawAmountValid}>
                                        <BankIcon /> Bank Transfer
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Bank Transfer Details</DialogTitle>
                                        <DialogDescription>Please provide your bank account information.</DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bank-name">Bank Name</Label>
                                            <Input id="bank-name" placeholder="e.g., HBL Pakistan" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="account-holder">Account Holder Name</Label>
                                            <Input id="account-holder" placeholder="John Doe" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="iban">IBAN / Account Number</Label>
                                            <Input id="iban" placeholder="PK00 HABB 0000 0000 0000 0" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={() => handleWithdrawalSubmit('Bank Transfer')}>Submit Request</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                             <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="h-16 text-base gap-3" disabled={!isWithdrawAmountValid}>
                                        <CryptoIcon /> Crypto Wallet
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Crypto Wallet Details</DialogTitle>
                                        <DialogDescription>Enter your USDT (TRC20) wallet address.</DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="wallet-address">USDT (TRC20) Address</Label>
                                            <Input id="wallet-address" placeholder="T..." />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={() => handleWithdrawalSubmit('Crypto Wallet')}>Submit Request</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
