import { AppLayout } from "@/components/shared/AppLayout";
import { MusicSuggestions } from "@/components/video/MusicSuggestions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlayCircle, Youtube, History } from "lucide-react";

// Inline Netflix Icon
const NetflixIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M10.81 12.015L7.043 21.838h2.03l1.84-4.882 1.842 4.882h2.03L10.98 12.015v-1.87l3.8-8.145H12.7L10.9 6.27l-.045-.09-1.755-4.2H7.043l3.767 7.975v1.87zM2.162 2.162h19.676v19.676H2.162V2.162z"/>
    </svg>
);

const rooms = [
  {
    name: "Charlotte's Techno Temple",
    nowPlaying: "Live at The Gashouder",
    users: [
      { name: "A", src: "https://placehold.co/40x40.png" },
      { name: "B", src: "https://placehold.co/40x40.png" },
      { name: "C", src: "https://placehold.co/40x40.png" },
      { name: "D" },
    ],
    seatCount: 8,
  },
  {
    name: "Afterlife Voyage",
    nowPlaying: "Anyma - 'Genesys' Live",
    users: [{ name: "E", src: "https://placehold.co/40x40.png" }, { name: "F" }],
    seatCount: 4,
  },
];

export default function VideoPage() {
  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <header>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Video Rooms</h1>
                <p className="text-muted-foreground">Watch with friends or join a public stream</p>
            </header>
            
            <Card>
                <CardHeader>
                    <CardTitle>Now Playing in Your Room</CardTitle>
                    <CardDescription>Select content to start a watch party.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                        <PlayCircle className="w-16 h-16 text-muted-foreground/50"/>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button><Youtube className="mr-2 h-4 w-4"/> Add from YouTube</Button>
                        <Button variant="outline"><NetflixIcon className="mr-2"/> Add from Netflix</Button>
                        <Button variant="ghost"><History className="mr-2 h-4 w-4"/> View History</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-headline">Active Rooms</h2>
                <div className="space-y-4">
                    {rooms.map((room, index) => (
                        <Card key={index} className="hover:bg-card/80 transition-colors">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="font-semibold font-headline">{room.name}</p>
                                    <p className="text-sm text-muted-foreground">{room.nowPlaying}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {room.users.map((user, i) => (
                                            <Avatar key={i} className="border-2 border-background">
                                                <AvatarImage src={user.src} alt={user.name} data-ai-hint="person portrait" />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        ))}
                                    </div>
                                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded-md">{room.users.length}/{room.seatCount}</span>
                                    <Button size="sm">Join</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
        
        <div className="lg:col-span-1 space-y-8">
            <h2 className="text-2xl font-bold font-headline lg:mt-20">AI Suggestions</h2>
            <MusicSuggestions />
        </div>
      </div>
    </AppLayout>
  );
}
