
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Send, Landmark, Gem, Coins, Settings, Edit, Wallet, Edit2, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const idLevel = 10;
    const sendingLevel = 10;

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="bg-gradient-to-b from-primary/30 to-background rounded-xl p-4 -m-4 md:m-0 relative">
                    <Link href="/profile/settings" className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon">
                            <Settings className="text-white" />
                        </Button>
                    </Link>
                    <div className="flex flex-col items-center text-center text-white">
                        <div className="relative">
                            <Avatar className="w-24 h-24 border-4 border-white">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="associate Official" data-ai-hint="person alphabet" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-card text-card-foreground hover:bg-card/80">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <h1 className="text-2xl font-bold">associate Official Ds</h1>
                            <Edit2 className="w-5 h-5 cursor-pointer" />
                        </div>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-purple-600 to-indigo-800 text-white">
                        <CardHeader>
                            <CardTitle>My Levels</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-white/80">
                                    <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-300"/> ID Level (Receiver)</p>
                                    <p>{idLevel}/100</p>
                                </div>
                                <Progress value={idLevel} className="h-2 bg-white/20 [&>div]:bg-yellow-400" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-white/80">
                                    <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-300"/> Sending Level (Gifter)</p>
                                    <p>{sendingLevel}/100</p>
                                </div>
                                <Progress value={sendingLevel} className="h-2 bg-white/20 [&>div]:bg-sky-400" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-600 to-teal-800 text-white">
                         <CardHeader>
                            <CardTitle>My Wallet</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center justify-center bg-white/10 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Coins className="w-6 h-6 text-yellow-300" />
                                        <div>
                                            <p className="font-semibold">Coins</p>
                                            <p className="font-bold text-lg">1,250</p>
                                        </div>
                                    </div>
                                </div>
                                 <div className="flex items-center justify-center bg-white/10 p-4 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <Gem className="w-6 h-6 text-cyan-300" />
                                        <div>
                                            <p className="font-semibold">Diamonds</p>
                                            <p className="font-bold text-lg">5,800</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <Link href="/profile/recharge" passHref>
                               <Button variant="ghost" className="w-full justify-between h-12 bg-white/10 hover:bg-white/20">
                                    <div className="flex items-center gap-4">
                                        <Coins className="text-yellow-300" />
                                        <span className="font-semibold">Recharge Coins</span>
                                    </div>
                                    <ChevronRight />
                               </Button>
                            </Link>
                            <Link href="/profile/withdraw" passHref>
                                <Button variant="ghost" className="w-full justify-between h-12 bg-white/10 hover:bg-white/20">
                                     <div className="flex items-center gap-4">
                                        <Landmark className="text-cyan-300" />
                                        <span className="font-semibold">Withdraw Diamonds</span>
                                    </div>
                                    <ChevronRight />
                               </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 bg-gradient-to-br from-pink-600 to-rose-800 text-white">
                        <CardHeader>
                            <CardTitle>My Store</CardTitle>
                            <CardDescription className="text-white/80">Customize your profile and get exclusive perks.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <Link href="/profile/vip" className="block">
                                <Card className="h-full bg-white/10 hover:bg-white/20 transition-colors text-center p-4 flex flex-col items-center justify-center gap-2">
                                    <Star className="w-8 h-8 text-yellow-300"/>
                                    <p className="font-semibold">VIP Center</p>
                                </Card>
                            </Link>
                            <Link href="/profile/frame" className="block">
                                <Card className="h-full bg-white/10 hover:bg-white/20 transition-colors text-center p-4 flex flex-col items-center justify-center gap-2">
                                    <Wallet className="w-8 h-8 text-cyan-300"/>
                                    <p className="font-semibold">Frame Store</p>
                                </Card>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
