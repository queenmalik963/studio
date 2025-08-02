"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Power, Award, Sofa } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from 'next/image';


export default function AudioRoomPage() {
    const router = useRouter();

    const seats = [
        { id: 1, user: { name: "A", image: "https://placehold.co/128x128.png" } },
        { id: 2, user: null },
        { id: 3, user: null },
        { id: 4, user: null },
        { id: 5, user: null },
        { id: 6, user: null },
        { id: 7, user: null },
        { id: 8, user: null },
        { id: 9, user: null },
        { id: 10, user: null },
    ];

    return (
        <div className="flex flex-col h-screen bg-background text-foreground p-4">
            <header className="flex-shrink-0">
                <div className="bg-muted p-4 rounded-xl flex items-start gap-4">
                    <Avatar className="h-20 w-20 border-4 border-background">
                        <AvatarImage src="https://placehold.co/128x128.png" alt="Room avatar" />
                        <AvatarFallback>CV</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold font-headline">Chill Vibes & Lofi Beats</h1>
                        <p className="text-sm text-muted-foreground">ID: 65335474</p>
                        <div className="flex items-center gap-2 mt-2 text-yellow-500">
                            <Award className="w-5 h-5" />
                            <span className="font-bold">0</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="bg-background/50">
                            <Users className="w-4 h-4 mr-2" />
                            1/10
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => router.push('/audio')}>
                            <Power className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 mt-6 overflow-y-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {seats.map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-2">
                            <div className={cn(
                                "w-24 h-24 rounded-full bg-muted flex items-center justify-center relative",
                                seat.user ? "border-2 border-primary" : ""
                            )}>
                                {seat.user ? (
                                    <Avatar className="w-full h-full">
                                        <AvatarImage src={seat.user.image} alt={seat.user.name} />
                                        <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Sofa className="w-12 h-12 text-muted-foreground/50" />
                                )}
                            </div>
                            <span className="text-sm font-semibold bg-muted px-2 py-1 rounded-md">{seat.id}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
