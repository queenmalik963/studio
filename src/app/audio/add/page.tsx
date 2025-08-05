
"use client";

import { useState, useRef } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Mic, UserPlus, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter, 
    DialogClose,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";


export default function AddAudioPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);


    const handleCreateRoom = () => {
        setOpen(false);
        router.push('/audio/room');
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            toast({
                title: "Track Selected!",
                description: `"${file.name}" is ready. Creating a new room...`,
            });
            const trackUrl = URL.createObjectURL(file);
            localStorage.setItem('newlySelectedTrack', trackUrl);
            router.push('/audio/room');
        }
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-2xl font-bold font-headline">Add Audio</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                             <Card className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-4">
                                    <Mic className="w-16 h-16 text-primary" />
                                    <span className="font-semibold text-lg">Start a Room</span>
                                </div>
                            </Card>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="font-headline text-2xl">Set Up Your Jam Room</DialogTitle>
                                <DialogDescription>
                                    Customize your room and invite people to join.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage src="https://placehold.co/100x100.png" alt="Room DP" data-ai-hint="abstract pattern"/>
                                        <AvatarFallback>DP</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">
                                        <ImageIcon className="mr-2" />
                                        Upload Image
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="room-name">Room Name</Label>
                                    <Input id="room-name" placeholder="e.g., Late Night Lofi" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="room-details">Details</Label>
                                    <Textarea id="room-details" placeholder="Tell us about your room..." />
                                </div>
                                <div className="space-y-2">
                                    <Label>Number of Seats</Label>
                                    <RadioGroup defaultValue="4" className="flex gap-2">
                                        {[2, 4, 8, 15].map((seats) => (
                                             <div key={seats} className="flex-1">
                                                <RadioGroupItem value={String(seats)} id={`seats-${seats}`} className="peer sr-only" />
                                                <Label 
                                                    htmlFor={`seats-${seats}`}
                                                    className="flex h-10 w-full items-center justify-center rounded-md border-2 border-muted bg-popover text-center hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                                >
                                                    {seats} Seats
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="ghost">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleCreateRoom}>
                                    <UserPlus className="mr-2" />
                                    Create Room
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    
                    <Card onClick={handleUploadClick} className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="audio/mp3,audio/wav,audio/ogg"
                            className="hidden"
                        />
                         <div className="flex flex-col items-center gap-4">
                            <Upload className="w-16 h-16 text-accent" />
                             <span className="font-semibold text-lg">Upload Track</span>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

    
