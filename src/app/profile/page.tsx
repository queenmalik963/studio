
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Send, Landmark, Gem, Coins, Settings, Edit, Wallet, Edit2, ChevronRight, Camera, UserPlus, UserMinus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function ProfilePage() {
    const [idLevel, setIdLevel] = useState(0);
    const [sendingLevel, setSendingLevel] = useState(0);
    const [name, setName] = useState("Your Name");
    const [tempName, setTempName] = useState(name);
    const [avatar, setAvatar] = useState("https://placehold.co/100x100.png");
    const [coins, setCoins] = useState(0);
    const [diamonds, setDiamonds] = useState(0);
    
    // State for followers and following
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);

    const handleNameChange = () => {
        setName(tempName);
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const newAvatarUrl = URL.createObjectURL(e.target.files[0]);
            setAvatar(newAvatarUrl);
        }
    }

    // Handlers to simulate follow/unfollow actions
    const handleFollow = () => setFollowers(prev => prev + 1);
    const handleUnfollow = () => setFollowers(prev => Math.max(0, prev - 1));


    return (
        <AppLayout>
            <div className="relative">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md -mx-4 px-4 pt-4 -mt-4 mb-4">
                     <div className="bg-gradient-to-b from-primary/30 to-background/10 rounded-xl p-4 relative">
                        <Link href="/profile/settings" passHref>
                            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white">
                                <Settings />
                            </Button>
                        </Link>
                        <div className="flex flex-col items-center text-center text-white">
                             <Dialog>
                                <DialogTrigger asChild>
                                    <div className="relative cursor-pointer">
                                        <Avatar className="w-24 h-24 border-4 border-white">
                                            <AvatarImage src={avatar} alt={name} data-ai-hint="person alphabet" />
                                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-card text-card-foreground hover:bg-card/80 flex items-center justify-center">
                                            <Camera className="h-4 w-4" />
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Avatar</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <p className="text-muted-foreground mb-4">Choose a new avatar for your profile.</p>
                                        <Input type="file" accept="image/*" onChange={handleAvatarChange} />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button>Done</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            
                             <Dialog onOpenChange={(open) => !open && setTempName(name)}>
                                <DialogTrigger asChild>
                                    <div className="flex items-center gap-2 mt-4 cursor-pointer">
                                        <h1 className="text-2xl font-bold">{name}</h1>
                                        <Edit2 className="w-5 h-5" />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Change Username</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4">
                                         <Label htmlFor="username" className="sr-only">Username</Label>
                                         <Input id="username" value={tempName} onChange={(e) => setTempName(e.target.value)} />
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild><Button variant="ghost">Cancel</Button></DialogClose>
                                        <DialogClose asChild><Button onClick={handleNameChange}>Save</Button></DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <p className="text-sm text-white/70">@username</p>
                            <p className="text-sm mt-2 max-w-sm">Welcome to my profile!</p>
                             <div className="flex justify-around text-center mt-4 w-full max-w-xs">
                                <div>
                                    <p className="font-bold text-lg">{following.toLocaleString()}</p>
                                    <p className="text-xs text-white/70">Following</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{followers.toLocaleString()}</p>
                                    <p className="text-xs text-white/70">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-center gap-4 -mt-2">
                        <Button variant="outline" size="sm" onClick={handleFollow}>
                            <UserPlus className="mr-2" /> Follow this user
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleUnfollow}>
                           <UserMinus className="mr-2" /> Unfollow this user
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-300"/> ID Level (Receiver)</p>
                            <p>{idLevel}/100</p>
                        </div>
                        <Progress value={idLevel} className="h-2 bg-muted [&>div]:bg-yellow-400" />
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-300"/> Sending Level (Gifter)</p>
                            <p>{sendingLevel}/100</p>
                        </div>
                        <Progress value={sendingLevel} className="h-2 bg-muted [&>div]:bg-sky-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="bg-gradient-to-br from-green-800/70 to-teal-900/70 text-white">
                             <CardHeader className="p-2">
                                <CardTitle className="text-base">My Wallet</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex items-center justify-center bg-white/10 p-1 rounded-lg gap-2 h-12">
                                        <Coins className="w-4 h-4 text-yellow-300" />
                                        <div>
                                            <p className="font-semibold text-xs">Coins</p>
                                            <p className="font-bold text-sm">{coins.toLocaleString()}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center justify-center bg-white/10 p-1 rounded-lg gap-2 h-12">
                                        <Gem className="w-4 h-4 text-cyan-300" />
                                        <div>
                                            <p className="font-semibold text-xs">Diamonds</p>
                                            <p className="font-bold text-sm">{diamonds.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link href="/profile/recharge" passHref>
                                   <Button variant="ghost" className="w-full justify-between h-8 bg-white/10 hover:bg-white/20 text-xs">
                                        <div className="flex items-center gap-2">
                                            <Coins className="text-yellow-300 w-4 h-4" />
                                            <span>Recharge</span>
                                        </div>
                                        <ChevronRight />
                                   </Button>
                                </Link>
                                <Link href="/profile/withdraw" passHref>
                                    <Button variant="ghost" className="w-full justify-between h-8 bg-white/10 hover:bg-white/20 text-xs">
                                         <div className="flex items-center gap-2">
                                            <Landmark className="text-cyan-300 w-4 h-4" />
                                            <span>Withdraw</span>
                                        </div>
                                        <ChevronRight />
                                   </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-pink-800/70 to-rose-900/70 text-white">
                            <CardHeader className="p-2">
                                <CardTitle className="text-base">My Store</CardTitle>
                                <CardDescription className="text-white/80 text-xs">Customize your profile.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 grid grid-cols-2 gap-2">
                                <Link href="/profile/vip" className="block">
                                    <Card className="h-full bg-white/10 hover:bg-white/20 transition-colors text-center p-2 flex flex-col items-center justify-center gap-1">
                                        <Star className="w-5 h-5 text-yellow-300"/>
                                        <p className="font-semibold text-xs">VIP Center</p>
                                    </Card>
                                </Link>
                                <Link href="/profile/frame" className="block">
                                    <Card className="h-full bg-white/10 hover:bg-white/20 transition-colors text-center p-2 flex flex-col items-center justify-center gap-1">
                                        <Wallet className="w-5 h-5 text-cyan-300"/>
                                        <p className="font-semibold text-xs">Frame Store</p>
                                    </Card>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
