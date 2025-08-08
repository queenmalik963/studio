
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Music2 } from 'lucide-react';

export function MusicSuggestions() {
    return (
        <Card className="bg-card/50 border-primary/20 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Music2 className="text-primary" />
                    Up Next For You
                </CardTitle>
                <CardDescription>AI suggestions based on your watch history.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-10">
                    <p>AI Features Coming Soon!</p>
                    <p className="text-xs">Music suggestions will appear here once configured.</p>
                </div>
            </CardContent>
        </Card>
    );
}
