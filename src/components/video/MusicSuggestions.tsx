"use client";

import { useState, useEffect } from 'react';
import { suggestUpNextMusic, type SuggestUpNextMusicOutput } from '@/ai/flows/suggest-up-next-music';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Music2, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const recentlyWatched = [
    "Psytrance festival aftermovie 2023",
    "Boiler Room: Fred again.. in London",
    "How to mix techno like a pro DJ"
];

export function MusicSuggestions() {
    const [suggestions, setSuggestions] = useState<SuggestUpNextMusicOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const result = await suggestUpNextMusic({ recentlyWatchedVideos: recentlyWatched });
                setSuggestions(result);
            } catch (e) {
                setError('Failed to get music suggestions. Please try again later.');
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

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
                {isLoading && (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                {error && (
                     <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {suggestions && (
                    <ul className="space-y-3">
                        {suggestions.suggestedTracks.map((track, index) => (
                            <li key={index} className="flex items-center gap-4 p-2 rounded-md transition-colors hover:bg-accent/10">
                                <div className="w-2 h-2 rounded-full bg-accent shrink-0"></div>
                                <span className="text-sm font-body">{track}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
