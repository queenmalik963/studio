
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, History, Search as SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// Inline Netflix Icon
const NetflixIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.81 12.015L7.043 21.838h2.03l1.84-4.882 1.842 4.882h2.03L10.98 12.015v-1.87l3.8-8.145H12.7L10.9 6.27l-.045-.09-1.755-4.2H7.043l3.767 7.975v1.87zM2.162 2.162h19.676v19.676H2.162V2.162z"/>
    </svg>
);

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red">
        <path d="M21.582,6.186c-0.23-0.858-0.904-1.532-1.762-1.762C18.256,4,12,4,12,4S5.744,4,4.18,4.424 c-0.858,0.23-1.532,0.904-1.762,1.762C2,7.749,2,12,2,12s0,4.251,0.418,5.814c0.23,0.858,0.904,1.532,1.762,1.762 C5.744,20,12,20,12,20s6.256,0,7.82-0.424c0.858-0.23,1.532-0.904,1.762-1.762C22,16.251,22,12,22,12S22,7.749,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
    </svg>
);

const dummyResults = [
    {id: 'jfKfPfyJRdk', title: 'lofi hip hop radio 📚 - beats to relax/study to', thumbnail: 'https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault_live.jpg', channel: 'Lofi Girl'},
    {id: '5qap5aO4i9A', title: 'lofi hip hop radio - sad & sleepy beats', thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault_live.jpg', channel: 'the bootleg boy'},
    {id: '7NOSDKb0HlU', title: '1 A.M Study Session 📚 - [lofi hip hop/chill beats]', thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlU/hqdefault.jpg', channel: 'Lofi Girl'},
    {id: 'rUxyKA_-grg', title: 'Chillhop Radio - jazzy & lofi hip hop beats', thumbnail: 'https://i.ytimg.com/vi/rUxyKA_-grg/hqdefault_live.jpg', channel: 'Chillhop Music'},
]

export default function AddVideoPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(dummyResults);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Searching...",
            description: `Looking for "${searchTerm}" on YouTube.`,
        });
        // In a real app, you would call the YouTube API here.
        // For now, we'll just filter the dummy results.
        if(searchTerm) {
            const filtered = dummyResults.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setSearchResults(filtered);
        } else {
            setSearchResults(dummyResults);
        }
    };

    const handleVideoSelect = (videoId: string) => {
        setIsSheetOpen(false);
        router.push(`/video/room?id=${videoId}`);
    }

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-2xl font-bold font-headline">Add Video</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card onClick={() => setIsSheetOpen(true)} className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                            <YouTubeIcon className="w-20 h-20" />
                            <span className="font-semibold text-lg">YouTube</span>
                        </div>
                    </Card>
                    <Link href="/video/room">
                        <Card className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                             <div className="flex flex-col items-center gap-4">
                                <NetflixIcon className="w-16 h-16 text-red-600" />
                                 <span className="font-semibold text-lg mt-4">Netflix</span>
                            </div>
                        </Card>
                    </Link>
                </div>
                
                <Button variant="outline" size="lg" className="w-full justify-center gap-2">
                    <History />
                    Recently Watched
                </Button>
            </div>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent side="bottom" className="bg-[#1F0A2E] border-t-2 border-primary/50 text-white rounded-t-2xl h-[85vh]">
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-headline text-white flex items-center gap-2"><YouTubeIcon className="w-8 h-8" /> Find a Video</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full pt-4">
                        <form onSubmit={handleSearch}>
                            <div className="relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <Input 
                                    placeholder="Search YouTube..." 
                                    className="bg-black/30 border-white/20 rounded-full pl-10 text-white placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50" 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {searchTerm && <Button size="icon" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full" onClick={() => setSearchTerm('')}><X className="w-4 h-4" /></Button>}
                            </div>
                        </form>

                        <ScrollArea className="flex-1 my-4 -mx-6 px-6">
                            <div className="space-y-3">
                                {searchResults.map((video) => (
                                    <div key={video.id} onClick={() => handleVideoSelect(video.id)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
                                        <div className="relative w-32 h-20 flex-shrink-0">
                                            <Image 
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold truncate text-sm">{video.title}</p>
                                            <p className="text-xs text-white/70">{video.channel}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
