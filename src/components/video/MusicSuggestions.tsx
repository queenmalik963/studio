
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
                <CardDescription>AI features have been removed for stability.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-10">
                    <p>Suggestions are disabled.</p>
                </div>
            </CardContent>
        </Card>
    );
}
