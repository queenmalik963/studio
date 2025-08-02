"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Music, Square, Upload } from "lucide-react";

export default function AudioPage() {
    return (
        <AppLayout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-4xl font-bold font-headline tracking-tight">Audio Rooms</h1>
                    <p className="text-muted-foreground">Start a live audio room or upload your own tracks.</p>
                </header>

                <Card>
                    <CardHeader>
                        <CardTitle>Create a new Audio Experience</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="w-full sm:w-auto">
                            <Mic className="mr-2" /> Start a Live Room
                        </Button>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                            <Upload className="mr-2" /> Upload a Track
                        </Button>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h2 className="text-2xl font-bold font-headline">Your Library</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="group">
                                <CardContent className="p-4 flex flex-col items-center justify-center aspect-square text-center">
                                    <Music className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                                    <h3 className="mt-4 font-semibold font-headline">My Awesome Mix {i + 1}</h3>
                                    <p className="text-sm text-muted-foreground">3:45</p>
                                    <Button variant="ghost" size="sm" className="mt-2">
                                        <Square className="w-4 h-4 mr-2" /> Play
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
