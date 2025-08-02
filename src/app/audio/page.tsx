
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Play, Plus, Upload } from "lucide-react";
import Link from "next/link";

export default function AudioPage() {
    return (
        <AppLayout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-4xl font-bold font-headline tracking-tight">Audio Rooms</h1>
                    <p className="text-muted-foreground">Start a live audio room or upload your own tracks.</p>
                </header>

                <Card className="bg-card/80 border-primary/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="font-headline">Create a new Audio Experience</CardTitle>
                        <CardDescription>Jump in and start a session with friends.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Link href="/audio/room" passHref>
                            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20">
                                <Plus className="mr-2" /> Create a Room
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            <Upload className="mr-2" /> Upload a Track
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold font-headline">Your Library</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="group overflow-hidden border-transparent hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square text-center bg-card/50">
                                    <div className="p-6 bg-primary/10 rounded-full group-hover:scale-110 transition-transform">
                                        <Music className="w-12 h-12 text-primary " />
                                    </div>
                                    <h3 className="mt-4 font-semibold font-headline">My Awesome Mix {i + 1}</h3>
                                    <p className="text-sm text-muted-foreground">3:45</p>
                                    <Button variant="ghost" size="sm" className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-4 h-4 mr-2" /> Play
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
