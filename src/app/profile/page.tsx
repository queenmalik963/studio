
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Star, Send, Landmark, Gem, Coins, Settings, Edit, Wallet, Edit2, ChevronRight, Camera, UserPlus, UserMinus, Crown, Loader2 } from "lucide-react";
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
import { followUser, unfollowUser, updateUserProfile } from "@/services/userService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";


export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { currentUser, userProfile, loading } = useAuth();
    const [tempName, setTempName] = useState("");
    
    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/');
        }
    }, [currentUser, loading, router]);

    useEffect(() => {
        if (userProfile) {
            setTempName(userProfile.name);
        }
    }, [userProfile]);


    const handleFollow = async () => {
        if (!currentUser || !userProfile || currentUser.uid === userProfile.id) return;
        const result = await followUser(currentUser.uid, userProfile.id);
        if (result.success) {
            toast({ title: "Followed!", description: `You are now following ${userProfile.name}.` });
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    };

    const handleUnfollow = async () => {
        if (!currentUser || !userProfile || currentUser.uid === userProfile.id) return;
        const result = await unfollowUser(currentUser.uid, userProfile.id);
        if (result.success) {
            toast({ title: "Unfollowed", description: `You are no longer following ${userProfile.name}.` });
        } else {
            toast({ title: "Error", description: result.error, variant: "destructive" });
        }
    };

    const handleNameChange = async () => {
        if (userProfile && tempName !== userProfile.name) {
            const result = await updateUserProfile(userProfile.id, { name: tempName });
            if (result.success) {
                toast({ title: "Name updated successfully!" });
            } else {
                 toast({ title: "Error", description: result.error, variant: "destructive" });
            }
        }
    }

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && userProfile) {
            const newAvatarFile = e.target.files[0];
            // In a real app, you would upload this to Firebase Storage and get a URL
            // For now, we'll just simulate with a local URL.
            const newAvatarUrl = URL.createObjectURL(newAvatarFile);

            const result = await updateUserProfile(userProfile.id, { avatar: newAvatarUrl });
            if(result.success) {
                toast({ title: "Avatar updated!" });
            } else {
                toast({ title: "Error updating avatar", description: result.error, variant: "destructive" });
            }
        }
    }

    if (loading || !userProfile) {
        return (
            <AppLayout>
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>
            </AppLayout>
        )
    }

    const isOwnProfile = currentUser?.uid === userProfile.id;

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
                                <DialogTrigger asChild disabled={!isOwnProfile}>
                                    <div className={cn("relative group", isOwnProfile && "cursor-pointer")}>
                                        <Avatar className={cn("w-24 h-24 border-4", userProfile.currentFrame ? 'border-transparent p-1' : 'border-white')}>
                                            <div className={cn("absolute rounded-full", userProfile.currentFrame && "animate-spin-colors" , 'inset-[-4px]')}></div>
                                            <AvatarImage src={userProfile.avatar} alt={userProfile.name} data-ai-hint="person alphabet" />
                                            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {isOwnProfile && (
                                            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Camera className="h-8 w-8" />
                                            </div>
                                        )}
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
                            
                             <Dialog onOpenChange={(open) => !open && userProfile && setTempName(userProfile.name)}>
                                <DialogTrigger asChild disabled={!isOwnProfile}>
                                    <div className={cn("flex items-center gap-2 mt-4", isOwnProfile && "cursor-pointer")}>
                                        {userProfile.vipTier && <Crown className="w-5 h-5 text-yellow-400" />}
                                        <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                                        {isOwnProfile && <Edit2 className="w-5 h-5" />}
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

                            <p className="text-sm text-white/70">@{userProfile.username}</p>
                            <p className="text-sm mt-2 max-w-sm">{userProfile.bio}</p>
                             <div className="flex justify-around text-center mt-4 w-full max-w-xs">
                                <div>
                                    <p className="font-bold text-lg">{userProfile.following.toLocaleString()}</p>
                                    <p className="text-xs text-white/70">Following</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{userProfile.followers.toLocaleString()}</p>
                                    <p className="text-xs text-white/70">Followers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {!isOwnProfile && (
                         <div className="flex justify-center gap-4 -mt-2">
                            <Button variant="outline" size="sm" onClick={handleFollow}>
                                <UserPlus className="mr-2" /> Follow this user
                            </Button>
                            <Button variant="outline" size="sm" onClick={handleUnfollow}>
                                <UserMinus className="mr-2" /> Unfollow this user
                            </Button>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-300"/> ID Level (Receiver)</p>
                            <p>{userProfile.idLevel}/100</p>
                        </div>
                        <Progress value={userProfile.idLevel} className="h-2 bg-muted [&>div]:bg-yellow-400" />
                        <div className="flex justify-between items-center text-sm font-semibold">
                            <p className="flex items-center"><Send className="w-4 h-4 mr-1 text-sky-300"/> Sending Level (Gifter)</p>
                            <p>{userProfile.sendingLevel}/100</p>
                        </div>
                        <Progress value={userProfile.sendingLevel} className="h-2 bg-muted [&>div]:bg-sky-400" />
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
                                            <p className="font-bold text-sm">{userProfile.coins.toLocaleString()}</p>
                                        </div>
                                    </div>
                                     <div className="flex items-center justify-center bg-white/10 p-1 rounded-lg gap-2 h-12">
                                        <Gem className="w-4 h-4 text-cyan-300" />
                                        <div>
                                            <p className="font-semibold text-xs">Diamonds</p>
                                            <p className="font-bold text-sm">{userProfile.diamonds.toLocaleString()}</p>
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
