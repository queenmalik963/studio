
"use client";

import { useState, useEffect } from 'react';
import { suggestUpNextMusic, type SuggestUpNextMusicOutput } from '@/ai/flows/suggest-up-next-music';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Music2, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MusicSuggestions() {
    const [suggestions, setSuggestions] = useState<SuggestUpNextMusicOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
                setError("Gemini API key not found. Please add it to your .env file.");
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            try {
                // In a real app, you'd get this from user data or browsing history
                const recentlyWatched = [
                    "Live from Tomorrowland",
                    "Techno Bunker Set",
                    "Boiler Room: London",
                ];
                
                const result = await suggestUpNextMusic({ recentlyWatchedVideos: recentlyWatched });
                
                setSuggestions(result);

            } catch (e: any) {
                 if (e.message.includes("API key not valid")) {
                    setError("Your Gemini API key is not valid. Please check your .env file.");
                } else {
                    setError('Failed to get music suggestions. Please try again later.');
                }
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    const hasSuggestions = suggestions && suggestions.suggestedTracks.length > 0;

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
                        <AlertTitle>Configuration Error</AlertTitle>
                        <AlertDescription>
                            {error}
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="underline font-semibold ml-1"
                            >
                                Get a key here.
                            </a>
                        </AlertDescription>
                    </Alert>
                )}
                {!isLoading && !error && !hasSuggestions && (
                     <div className="text-center text-muted-foreground py-10">
                        <p>No suggestions available right now.</p>
                        <p className="text-xs">Watch some videos to get started!</p>
                    </div>
                )}
                {hasSuggestions && (
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
