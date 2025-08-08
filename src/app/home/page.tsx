
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Users, Headphones, PlaySquare, Mic, Globe, Loader2 } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MusicSuggestions } from "@/components/video/MusicSuggestions";
import { useAuth } from "@/contexts/AuthContext";

interface TrendingRoom {
  id: string;
  href: string;
  image: string;
  hint: string;
  title: string;
  creator: string;
  viewers: string;
  icon: React.ElementType;
}

const mockTrendingVideos: TrendingRoom[] = [
    {
        id: 'vid-1',
        href: '/video/room/vid-1',
        image: 'https://i.imgur.com/Oz4ud1o.gif',
        hint: 'animated space battle',
        title: 'Epic Space Battle Live!',
        creator: 'GalaxyExplorer',
        viewers: '1.2k',
        icon: PlaySquare,
    },
    {
        id: 'vid-2',
        href: '/video/room/vid-2',
        image: 'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',
        hint: 'lofi music stream',
        title: 'Lofi Hip Hop Radio 24/7',
        creator: 'Lofi Girl',
        viewers: '25k',
        icon: PlaySquare,
    },
];

const mockTrendingAudio: TrendingRoom[] = [
     {
        id: 'aud-1',
        href: '/audio/room/aud-1',
        image: 'https://i.imgur.com/sCbrK9U.png',
        hint: 'podcast microphone',
        title: 'Late Night Tech Talk',
        creator: 'TechGuru',
        viewers: '850',
        icon: Headphones,
    },
    {
        id: 'aud-2',
        href: '/audio/room/aud-2',
        image: 'https://placehold.co/600x400/1e293b/ffffff.png',
        hint: 'standup comedy stage',
        title: 'Comedy Hour Live',
        creator: 'FunnyBone',
        viewers: '2.1k',
        icon: Headphones,
    },
]


const TrendingCard = ({ href, image, hint, title, creator, viewers, icon: Icon }: TrendingRoom) => (
    <Link href={href} className="block">
        <Card className="overflow-hidden group border-transparent hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 h-full">
            <CardContent className="p-0">
                <div className="relative">
                    <Image
                        src={image}
                        alt={title}
                        width={600}
                        height={400}
                        className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={hint}
                        unoptimized={image.includes('ytimg') || image.endsWith('.gif')}
                    />
                    <div className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Icon className="w-3 h-3 text-primary" />
                        <span>{viewers}</span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold font-headline truncate">{title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="w-4 h-4 text-accent" />
                        {creator}
                    </p>
                </div>
            </CardContent>
        </Card>
    </Link>
);

const USFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" {...props}>
        <rect width="5" height="3" fill="#B22234"/>
        <rect width="5" height="2" fill="#FFFFFF"/>
        <rect width="5" height="1" fill="#B22234"/>
        <rect width="2" height="1.8" fill="#3C3B6E"/>
        <g fill="#FFFFFF">
            <path d="M.4 1.55h.2L.7.9h.2l.1.65h.2L.95.8h.1L.8 1.55h.2L1.15.9h.2l.1.65H1.7l-.25-.75h.1L1.8.8l-.25.75h.2l.15-.6h.2l-.25.75h.1l.25-.75h-.7L.9.55zM0 .3h.2L.3.9H0zm.45 0h.2L.75.9h-.2zm.45 0h.2l.1.6H.8zm.45 0h.2l.1.6h-.2zm.45 0h.2l.1.6h-.2zM0 .6h.2L.3 1.2H0zm.45 0h.2L.75 1.2h-.2zm.45 0h.2l.1.6h-.2zm.45 0h.2l.1.6h-.2zM0 .9h.2l.1.6H0zm.45 0h.2l.1.6h-.2zm.45 0h.2l.1.6H.8zm.45 0h.2l.1.6h-.2zm.45 0h.2l.1.6h-.2z"/>
        </g>
    </svg>
);

const PKFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#006644"/>
        <rect width="225" height="600" fill="#FFFFFF"/>
        <circle cx="585" cy="300" r="135" fill="#FFFFFF"/>
        <circle cx="621" cy="300" r="120" fill="#006644"/>
        <polygon points="700,165 720,230 785,230 735,270 750,335 700,300 650,335 665,270 615,230 680,230" fill="#FFFFFF"/>
    </svg>
);

const INFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" {...props}>
        <rect width="900" height="600" fill="#f93"/>
        <rect y="200" width="900" height="200" fill="#fff"/>
        <rect y="400" width="900" height="200" fill="#128807"/>
        <circle cx="450" cy="300" r="90" fill="#000080"/>
        <circle cx="450" cy="300" r="80" fill="#fff"/>
        <circle cx="450"cy="300" r="16" fill="#000080"/>
        <g fill="#000080">
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(7.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(22.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(37.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(52.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(67.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(82.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(97.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(112.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(127.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(142.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(157.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(172.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(187.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(202.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(217.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(232.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(247.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(262.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(277.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(292.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(307.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(322.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(337.5 450 300)"/>
            <path d="M450 210 V190 H450.8 V210z" transform="rotate(352.5 450 300)"/>
        </g>
    </svg>
);

const GBFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
        <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
        <clipPath id="b"><path d="M30 15h30v15zn-30-15h30V0zH0v15z"/></clipPath>
        <g clipPath="url(#a)">
            <path d="M0 0v30h60V0z" fill="#00247d"/>
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
            <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#cf142b" strokeWidth="4"/>
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
            <path d="M30 0v30M0 15h60" stroke="#cf142b" strokeWidth="6"/>
        </g>
    </svg>
);

const CAFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" {...props}>
        <rect width="1200" height="600" fill="#ff0000"/>
        <rect x="300" width="600" height="600" fill="#ffffff"/>
        <path d="M450 150l75 75-150 150-75-75zm300 0l-75 75 150 150 75-75zM600 375l-75 75-75-75v150h150z" fill="#ff0000"/>
    </svg>
);


export default function HomePage() {
  const { userProfile } = useAuth();

  if (!userProfile) {
      return (
          <div className="flex h-screen w-full items-center justify-center bg-background">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
          </div>
      );
  }

  return (
    <AppLayout>
      <div className="relative">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md -mx-4 md:-mx-8 px-4 md:px-8 py-4 mb-4">
          <div className="max-w-xs">
            <Select defaultValue="global">
              <SelectTrigger className="w-full bg-card/50">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select a region" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Global
                  </div>
                </SelectItem>
                <SelectItem value="us">
                  <div className="flex items-center gap-2">
                    <USFlagIcon className="w-5 h-auto rounded-sm" />
                    United States
                  </div>
                </SelectItem>
                <SelectItem value="pk">
                  <div className="flex items-center gap-2">
                    <PKFlagIcon className="w-5 h-auto rounded-sm" />
                    Pakistan
                  </div>
                </SelectItem>
                <SelectItem value="in">
                  <div className="flex items-center gap-2">
                    <INFlagIcon className="w-5 h-auto rounded-sm" />
                    India
                  </div>
                </SelectItem>
                <SelectItem value="gb">
                  <div className="flex items-center gap-2">
                    <GBFlagIcon className="w-5 h-auto rounded-sm" />
                    United Kingdom
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <CAFlagIcon className="w-5 h-auto rounded-sm" />
                    Canada
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <PlaySquare className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">Trending Videos</h2>
                </div>
                {mockTrendingVideos.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {mockTrendingVideos.map((item) => (
                      <TrendingCard 
                          key={item.id}
                          {...item}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No live video rooms right now. Why not start one?</p>
                )}
            </section>

            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <Mic className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold font-headline">Trending Audio</h2>
                </div>
                {mockTrendingAudio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {mockTrendingAudio.map((item) => (
                      <TrendingCard 
                          key={item.id}
                          {...item}
                      />
                    ))}
                  </div>
                 ) : (
                  <p className="text-muted-foreground">No live audio rooms right now. Why not start one?</p>
                )}
            </section>
          </div>
          <div className="lg:col-span-1 space-y-8">
              <MusicSuggestions />
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
