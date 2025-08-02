
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Edit, Star, Send, Wallet, Gem, Landmark, Settings, Store, Crown, Square, Coins, Camera, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";


const USFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
        <rect width="5" height="3" fill="#B22234"/>
        <rect width="5" height="2" fill="#FFFFFF"/>
        <rect width="5" height="1" fill="#B22234"/>
        <rect width="2" height="1" fill="#3C3B6E"/>
    </svg>
);

const PKFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#006644"/>
        <rect width="225" height="600" fill="#FFFFFF"/>
        <circle cx="585" cy="300" r="135" fill="#FFFFFF"/>
        <circle cx="621" cy="300" r="120" fill="#006644"/>
        <polygon points="700,165 720,230 785,230 735,270 750,335 700,300 650,335 665,270 615,230 680,230" fill="#FFFFFF"/>
    </svg>
);

const INFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#f93"/>
        <rect y="200" width="900" height="200" fill="#fff"/>
        <rect y="400" width="900" height="200" fill="#128807"/>
        <circle cx="450" cy="300" r="90" fill="#000080"/>
        <circle cx="450" cy="300" r="80" fill="#fff"/>
        <circle cx="450"cy="300" r="16" fill="#000080"/>
        <g fill="#000080">
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(7.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(22.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(37.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(52.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(67.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(82.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(97.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(112.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(127.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(142.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(157.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(172.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(187.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(202.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(217.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(232.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(247.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(262.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(277.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(292.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(307.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(322.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(337.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(352.5 450 300)"/>
        </g>
    </svg>
);

const GBFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
        <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
        <clipPath id="b"><path d="M30 15h30v15zn-30-15h30V0zH0v15z"/></clipPath>
        <g clipPath="url(#a)">
            <path d="M0 0v30h60V0z" fill="#00247d"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#cf142b" strokeWidth="4"/>
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v30M0 15h60" stroke="#cf142b" strokeWidth="6"/>
        </g>
    </svg>
);

const CAFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" {...props}>
        <rect width="1200" height="600" fill="#ff0000"/>
        <rect x="300" width="600" height="600" fill="#ffffff"/>
        <path d="M450 150l75 75-150 150-75-75zm300 0l-75 75 150 150 75-75zM600 375l-75 75-75-75v150h150z" fill="#ff0000"/>
    </svg>
);

export default function ProfilePage() {
    const { toast } = useToast();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [userName, setUserName] = useState("associate Official Ds");
    const [currentName, setCurrentName] = useState(userName);

    const handleSaveChanges = () => {
        setUserName(currentName);
        setIsEditOpen(false);
        toast({
            title: "Profile Updated",
            description: "Your changes have been saved.",
        });
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="bg-gradient-to-b from-primary/30 to-background rounded-xl p-4 -m-4 md:m-0 relative">
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Link href="/profile/settings">
                            <Button variant="ghost" size="icon" className="text-white">
                                <Settings className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                    <div className="flex flex-col items-center text-center text-white">
                        <div className="relative">
                            <Avatar className="w-24 h-24 border-4 border-white">
                                <AvatarImage src="https://placehold.co/100x100.png" alt="associate Official" data-ai-hint="person alphabet" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="icon" className="absolute bottom-0 -right-2 h-8 w-8 rounded-full bg-background text-foreground border-2 border-white" onClick={() => setIsEditOpen(true)}>
                                <Edit className="w-4 h-4" />
                            </Button>
                        </div>
                        <h1 className="text-2xl font-bold mt-4">{userName}</h1>
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
                        <CardTitle>My Wallet & Progress</CardTitle>
                        <CardDescription>Manage your funds and track your level progress.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between bg-primary/10 p-4 rounded-lg">
                            <div className="flex items-center">
                                <Wallet className="mr-3 text-primary" />
                                <span className="font-semibold">Balance</span>
                            </div>
                            <div className="flex items-center text-primary font-bold text-lg">
                                <Coins className="mr-2" /> 1,250
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/profile/recharge" passHref>
                                <Button variant="secondary" className="w-full">
                                    <Gem className="mr-2" /> Recharge
                                </Button>
                            </Link>
                            <Link href="/profile/withdraw" passHref>
                                <Button variant="outline" className="w-full">
                                    <Landmark className="mr-2" /> Withdraw
                                </Button>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                                    <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-400"/> ID Level</p>
                                    <p>1/100</p>
                                </div>
                                <Progress value={1} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-amber-500" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-muted-foreground">
                                    <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-400"/> Sending Level</p>
                                    <p>1/100</p>
                                </div>
                                <Progress value={1} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-sky-400 [&>div]:to-cyan-500" />
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

                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="text-foreground">
                        <DialogHeader>
                            <DialogTitle>Edit Profile</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="relative w-28 h-28 mx-auto">
                                <Avatar className="w-full h-full border-4 border-primary">
                                    <AvatarImage src="https://placehold.co/100x100.png" alt={userName} data-ai-hint="person alphabet" />
                                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <Button variant="outline" size="icon" className="absolute bottom-1 right-1 h-8 w-8 rounded-full bg-background border-2">
                                    <Camera className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" value={currentName} onChange={(e) => setCurrentName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select defaultValue="us">
                                    <SelectTrigger id="country">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="global">
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-5 h-5" />
                                                Global
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="us">
                                            <div className="flex items-center gap-2">
                                                <USFlagIcon className="w-5 h-auto rounded-sm" />
                                                United States
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="pk">
                                            <div className="flex items-center gap-2">
                                                <PKFlagIcon className="w-5 h-auto rounded-sm" />
                                                Pakistan
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="in">
                                            <div className="flex items-center gap-2">
                                                <INFlagIcon className="w-5 h-auto rounded-sm" />
                                                India
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="gb">
                                            <div className="flex items-center gap-2">
                                                <GBFlagIcon className="w-5 h-auto rounded-sm" />
                                                United Kingdom
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="ca">
                                            <div className="flex items-center gap-2">
                                                <CAFlagIcon className="w-5 h-auto rounded-sm" />
                                                Canada
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="ghost">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}

    