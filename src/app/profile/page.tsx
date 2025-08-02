
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Star, Send, Landmark, Gem, Coins } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default function ProfilePage() {
    const { toast } = useToast();
    const [idLevel, setIdLevel] = useState(28);
    const [sendingLevel, setSendingLevel] = useState(29);

    useEffect(() => {
        const interval = setInterval(() => {
            setIdLevel(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 100));
            setSendingLevel(prev => Math.min(prev + Math.floor(Math.random() * 2) + 1, 100));
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="bg-gradient-to-b from-primary/30 to-background rounded-xl p-4 -m-4 md:m-0">
                    <div className="flex flex-col items-center text-center text-white">
                        <div className="relative">
                            <Avatar className="w-24 h-24 border-4 border-white">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="associate Official" data-ai-hint="person alphabet" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                        </div>
                        <h1 className="text-2xl font-bold mt-4">associate Official Ds</h1>
                        <p className="text-sm text-white/70">@user1754000546251</p>
                        <p className="text-sm mt-2 max-w-sm">Welcome to Devika!</p>
                        <div className="flex justify-around text-center mt-4 w-full max-w-xs">
                            <div>
                                <p className="font-bold text-lg">0</p>
                                <p className="text-xs text-white/70">Following</p>
                            </div>
                            <div>
                                <p className="font-bold text-lg">0</p>
                                <p className="text-xs text-white/70">Followers</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>My Wallet</CardTitle>
                        <CardDescription>Manage your funds and track your level progress.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-center bg-primary/80 p-4 rounded-lg text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <Coins className="w-6 h-6" />
                                    <span className="font-semibold">Coins</span>
                                    <span className="font-bold text-lg">1,250</span>
                                </div>
                            </div>
                             <div className="flex items-center justify-center bg-teal-500/80 p-4 rounded-lg text-white">
                                <div className="flex items-center gap-2">
                                    <Gem className="w-6 h-6" />
                                    <span className="font-semibold">Diamonds</span>
                                    <span className="font-bold text-lg">5,800</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/profile/recharge" passHref>
                                <Button variant="secondary" className="w-full">
                                    <Coins className="mr-2" /> Recharge Coins
                                </Button>
                            </Link>
                            <Link href="/profile/withdraw" passHref>
                                <Button variant="secondary" className="w-full">
                                    <Landmark className="mr-2" /> Withdraw Diamonds
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                                    <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400"/> ID Level (Receiver)</p>
                                    <p>{idLevel}/100</p>
                                </div>
                                <Progress value={idLevel} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-amber-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                                    <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-400"/> Sending Level (Gifter)</p>
                                    <p>{sendingLevel}/100</p>
                                </div>
                                <Progress value={sendingLevel} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-sky-400 [&>div]:to-cyan-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>My Store</CardTitle>
                        <CardDescription>Customize your profile and get exclusive perks.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <Link href="/profile/vip" className="block">
                            <Card className="h-full bg-card hover:bg-muted transition-colors text-center p-4 flex flex-col items-center justify-center gap-2">
                                <Crown className="w-8 h-8 text-yellow-400"/>
                                <p className="font-semibold">VIP Center</p>
                            </Card>
                        </Link>
                        <Link href="/profile/frame" className="block">
                            <Card className="h-full bg-card hover:bg-muted transition-colors text-center p-4 flex flex-col items-center justify-center gap-2">
                                <Square className="w-8 h-8 text-cyan-400"/>
                                <p className="font-semibold">Frame Store</p>
                            </Card>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
