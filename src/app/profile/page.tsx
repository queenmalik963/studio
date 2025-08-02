"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Edit, Star, Send, Wallet, Gem, Landmark } from "lucide-react";

const USFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
        <rect width="5" height="3" fill="#B22234"/>
        <rect width="5" height="2" fill="#FFFFFF"/>
        <rect width="5" height="1" fill="#B22234"/>
        <rect width="2" height="1" fill="#3C3B6E"/>
    </svg>
);


export default function ProfilePage() {
  return (
    <AppLayout>
        <div className="bg-gradient-to-b from-primary/30 to-background min-h-[calc(100vh-12rem)] md:min-h-0 md:rounded-xl md:p-1 -m-4 md:m-0">
            <div className="p-4 space-y-4 text-white">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-white">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Qurban Ali" data-ai-hint="person portrait" />
                        <AvatarFallback>QA</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <h1 className="text-xl font-bold flex items-center">
                            Qurban Ali Ds
                            <Button variant="ghost" size="icon" className="ml-2 h-6 w-6 text-white">
                                <Edit className="w-4 h-4" />
                            </Button>
                        </h1>
                        <p className="text-xs text-white/70">@user1753852790273</p>
                    </div>
                </div>
                
                <p className="text-sm">Welcome to Devika!</p>

                <div className="flex justify-around text-center">
                    <div>
                        <p className="font-bold text-lg">0</p>
                        <p className="text-xs text-white/70">Following</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">0</p>
                        <p className="text-xs text-white/70">Followers</p>
                    </div>
                </div>

                <div className="text-sm flex items-center bg-black/20 p-2 rounded-md">
                    <USFlagIcon className="w-5 h-auto mr-2"/>
                    ID: 6XDqndcaXEU4iXDEDhdiElmrmCq1
                </div>

                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs font-semibold">
                            <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400"/> ID Level</p>
                            <p>1/100</p>
                        </div>
                        <Progress value={1} className="h-1.5 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-amber-500" />
                    </div>
                    <div className="space-y-1">
                         <div className="flex justify-between items-center text-xs font-semibold">
                            <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-400"/> Sending Level</p>
                            <p>1/100</p>
                        </div>
                        <Progress value={1} className="h-1.5 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-sky-400 [&>div]:to-cyan-500" />
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <Button variant="secondary" className="w-full justify-start h-12 bg-black/20 hover:bg-black/40 text-white">
                        <Wallet className="mr-3" /> Wallet
                    </Button>
                     <Button variant="secondary" className="w-full justify-start h-12 bg-black/20 hover:bg-black/40 text-white">
                        <Gem className="mr-3" /> Recharge
                    </Button>
                     <Button variant="secondary" className="w-full justify-start h-12 bg-black/20 hover:bg-black/40 text-white">
                        <Landmark className="mr-3" /> Withdraw
                    </Button>
                </div>

            </div>
        </div>
    </AppLayout>
  )
}
