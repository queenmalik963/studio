"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Power, Award, Sofa, Mic, MicOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AudioRoomPage() {
    const router = useRouter();

    const seats = [
        { id: 1, user: { name: "A", image: "https://placehold.co/128x128.png", isSpeaking: true } },
        { id: 2, user: { name: "B", image: "https://placehold.co/128x128.png", isSpeaking: false } },
        { id: 3, user: null },
        { id: 4, user: null },
        { id: 5, user: { name: "C", image: "https://placehold.co/128x128.png", isSpeaking: false } },
        { id: 6, user: null },
        { id: 7, user: null },
        { id: 8, user: null },
        { id: 9, user: null },
        { id: 10, user: null },
    ];

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-primary/10 to-background text-foreground p-4">
            <header className="flex-shrink-0">
                <div className="bg-card/50 backdrop-blur-lg p-4 rounded-xl flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-background shadow-md">
                        <AvatarImage src="https://placehold.co/128x128.png" alt="Room avatar" data-ai-hint="abstract pattern"/>
                        <AvatarFallback>CV</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <h1 className="text-2xl font-bold font-headline">Chill Vibes & Lofi Beats</h1>
                        <p className="text-sm text-muted-foreground">ID: 65335474</p>
                        <div className="flex items-center gap-2 mt-2 text-yellow-400">
                            <Award className="w-5 h-5" />
                            <span className="font-bold">1.2k</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" className="bg-background/50">
                            <Users className="w-4 h-4 mr-2" />
                            3/10
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => router.push('/audio')}>
                            <Power className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 mt-6 grid place-items-center">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8">
                    {seats.map((seat) => (
                        <div key={seat.id} className="flex flex-col items-center gap-2 group">
                            <div className={cn(
                                "w-28 h-28 rounded-full bg-muted/40 flex items-center justify-center relative transition-all duration-300",
                                seat.user ? "border-4" : "border-2 border-dashed",
                                seat.user && seat.user.isSpeaking ? "border-primary shadow-lg shadow-primary/30" : "border-muted/50",
                                !seat.user && "hover:border-primary hover:bg-muted/60"
                            )}>
                                {seat.user ? (
                                    <>
                                        <Avatar className="w-full h-full">
                                            <AvatarImage src={seat.user.image} alt={seat.user.name} />
                                            <AvatarFallback>{seat.user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="absolute -bottom-3 bg-card px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                                            {seat.user.name}
                                        </div>
                                        {seat.user.isSpeaking && (
                                            <div className="absolute top-0 right-0 h-6 w-6 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                                                <Mic className="w-4 h-4 text-primary-foreground" />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Sofa className="w-12 h-12 text-muted-foreground/50 transition-colors group-hover:text-primary" />
                                )}
                            </div>
                            <span className="text-xs font-semibold bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-md">{seat.id}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
