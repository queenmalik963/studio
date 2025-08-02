
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const initialRooms = [
  {
    name: "Amrinder Gill - Paigaam (Official Video)",
    thumbnail: "https://placehold.co/150x80.png",
    thumbnailHint: "music video stills",
    users: [
      { name: "A", src: "https://placehold.co/40x40.png" },
      { name: "B", src: "https://placehold.co/40x40.png" },
      { name: "C", src: "https://placehold.co/40x40.png" },
    ],
    isPlaying: true,
    progress: 0,
  },
  {
    name: "NOVA MALIK",
    thumbnail: "https://placehold.co/150x80.png",
    thumbnailHint: "anime music",
    users: [
      { name: "D", src: "https://placehold.co/40x40.png" },
      { name: "E", src: "https://placehold.co/40x40.png" },
    ],
    isPlaying: true,
    progress: 0,
  },
    {
    name: "Lost in Thoughts ~ Lofi hip hop mix",
    thumbnail: "https://placehold.co/150x80.png",
    thumbnailHint: "lofi animation",
    users: [
      { name: "F", src: "https://placehold.co/40x40.png" },
      { name: "G", src: "https://placehold.co/40x40.png" },
      { name: "H", src: "https://placehold.co/40x40.png" },
    ],
    isPlaying: false,
    progress: 0,
  },
    {
    name: "Saiyaara Title Song | Ahaan Panday",
    thumbnail: "https://placehold.co/150x80.png",
    thumbnailHint: "movie poster",
    users: [
        { name: "I", src: "https://placehold.co/40x40.png" },
    ],
    isPlaying: true,
    progress: 0,
  },
   {
    name: "Qott Ghusian Da",
    thumbnail: "https://placehold.co/150x80.png",
    thumbnailHint: "album cover",
    users: [
        { name: "J", src: "https://placehold.co/40x40.png" },
        { name: "K", src: "https://placehold.co/40x40.png" },
    ],
    isPlaying: true,
    progress: 0,
  },
];


export default function VideoPage() {
    const [rooms, setRooms] = useState(initialRooms);

    useEffect(() => {
        // Set random progress on client-side to avoid hydration mismatch
        setRooms(initialRooms.map(room => ({
            ...room,
            progress: Math.random() * 80 + 10
        })));
    }, []);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 min-h-screen">
        {/* We are not using AppLayout here to have a custom header */}
        <header className="flex items-center justify-between p-4">
            <Button variant="ghost" size="icon">
                <Settings className="text-white"/>
            </Button>
            <h1 className="text-3xl font-bold text-white tracking-wider">rave</h1>
            <Button variant="ghost" size="icon">
                <Users className="text-white"/>
            </Button>
        </header>

        <main className="p-4 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search" className="bg-white/10 border-0 rounded-full pl-10 text-white placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50" />
            </div>

            <div className="space-y-3">
                {rooms.map((room, index) => (
                    <Link href="/video/room" key={index}>
                      <Card className="bg-white/5 border-0 rounded-2xl overflow-hidden backdrop-blur-md">
                          <CardContent className="p-2 flex items-center gap-3">
                              <div className="relative w-28 h-20 flex-shrink-0">
                                  <Image 
                                      src={room.thumbnail}
                                      alt={room.name}
                                      fill
                                      className="rounded-lg object-cover"
                                      data-ai-hint={room.thumbnailHint}
                                  />
                                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                      {room.isPlaying && (
                                           <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                                                <title>Playing Icon</title>
                                                <path d="M10 16.5v-9l6 4.5-6 4.5z" />
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                            </svg>
                                      )}
                                  </div>
                              </div>
                              <div className="flex-grow overflow-hidden">
                                  <p className="text-white font-semibold truncate">{room.name}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                      <div className="flex -space-x-2">
                                          {room.users.map((user, i) => (
                                              <Avatar key={i} className="w-7 h-7 border-2 border-background/50">
                                                  <AvatarImage src={user.src} alt={user.name} data-ai-hint="person portrait" />
                                                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                              </Avatar>
                                          ))}
                                      </div>
                                  </div>
                                   <div className="w-full bg-white/10 h-1 mt-2 rounded-full">
                                      <div className="bg-white/70 h-1 rounded-full" style={{width: `${room.progress}%`}}></div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                    </Link>
                ))}
            </div>
        </main>
        
        <Link href="/video/add" passHref>
             <Button className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-white text-black shadow-lg hover:bg-gray-200">
                <Plus className="h-8 w-8" />
            </Button>
        </Link>
    </div>
  );
}
