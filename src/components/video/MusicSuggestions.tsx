
"use client";

import { useState, useEffect } from 'react';
import { suggestUpNextMusic, type SuggestUpNextMusicOutput } from '@/ai/flows/suggest-up-next-music';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Music2, Loader2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function MusicSuggestions() {
    const [suggestions, setSuggestions] = useState<SuggestUpNextMusicOutput | null>(null);
    const [isLoading, setIsLoading] = useState(true); // Start with loading true
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                // To keep the initial state without calling the API, we can simulate a successful call with dummy data
                // When you are ready to enable the real API call, uncomment the lines below and remove the dummy data part.
                
                // START: DUMMY DATA SIMULATION (Remove when enabling API)
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
                const dummySuggestions: SuggestUpNextMusicOutput = {
                    suggestedTracks: [
                        "Lane 8 - Summer 2021 Mixtape",
                        "Ben Böhmer - Breathing (Live from Printworks)",
                        "Tinlicker - Children",
                    ]
                };
                setSuggestions(dummySuggestions);
                // END: DUMMY DATA SIMULATION

                /*
                // UNCOMMENT THIS BLOCK TO ENABLE REAL API CALLS
                setError(null);
                // In a real app, you'd get this from user data
                const recentlyWatched = [
                    "Psytrance festival aftermovie 2023",
                    "Boiler Room: Fred again.. in London",
                    "How to mix techno like a pro DJ"
                ];
                const result = await suggestUpNextMusic({ recentlyWatchedVideos: recentlyWatched });
                setSuggestions(result);
                */
            } catch (e: any) {
                 if (e.message.includes("API key not valid")) {
                    setError("Your Gemini API key is not valid. Please check your .env file.");
                } else if (e.message.includes("API key not found")) {
                    setError("Gemini API key not found. Please add it to your .env file.");
                }
                else {
                    setError('Failed to get music suggestions. Please try again later.');
                }
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
                {suggestions && !isLoading && !error && (
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
