
import { AppLayout } from "@/components/shared/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Users, Headphones, PlaySquare, Mic, Globe } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const trendingVideos = [
  {
    title: "Live from Tomorrowland",
    creator: "Anyma",
    viewers: "15.2k",
    image: "https://placehold.co/600x400.png",
    hint: "concert crowd",
    href: "/video/room"
  },
  {
    title: "Techno Bunker Set",
    creator: "Charlotte de Witte",
    viewers: "12.8k",
    image: "https://placehold.co/600x400.png",
    hint: "dj turntables",
    href: "/video/room"
  },
  {
    title: "Boiler Room: London",
    creator: "Fred Again..",
    viewers: "25.1k",
    image: "https://placehold.co/600x400.png",
    hint: "dj crowd",
    href: "/video/room"
  },
  {
    title: "Deep House Mix",
    creator: "Nora En Pure",
    viewers: "8.9k",
    image: "https://placehold.co/600x400.png",
    hint: "beach sunset",
    href: "/video/room"
  },
];

const trendingAudio = [
    {
        title: "Lofi Beats to Relax/Study to",
        creator: "Lofi Girl",
        listeners: "32.5k",
        image: "https://placehold.co/600x400.png",
        hint: "lofi hip hop",
        href: "/audio/room"
    },
    {
        title: "Deep House Mix by Nora En Pure",
        creator: "Nora En Pure",
        listeners: "18.2k",
        image: "https://placehold.co/600x400.png",
        hint: "dj mixing",
        href: "/audio/room"
    },
    {
        title: "Techno Bunker Live Set",
        creator: "Amelie Lens",
        listeners: "21.7k",
        image: "https://placehold.co/600x400.png",
        hint: "dark club",
        href: "/audio/room"
    },
    {
        title: "Anjunadeep Selections",
        creator: "Anjunadeep",
        listeners: "11.4k",
        image: "https://placehold.co/600x400.png",
        hint: "ocean sunset",
        href: "/audio/room"
    }
];

const TrendingCard = ({ href, image, hint, title, creator, viewers, icon: Icon }: { href: string, image: string, hint: string, title: string, creator: string, viewers: string, icon: React.ElementType }) => (
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
                    />
                    <div className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        <span>{viewers}</span>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold font-headline truncate">{title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon className="w-4 h-4 text-accent" />
                        {creator}
                    </p>
                </div>
            </CardContent>
        </Card>
    </Link>
);


export default function HomePage() {
  return (
    <AppLayout>
      <div className="space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold font-headline tracking-tight">Welcome to RaveWave</h1>
          <p className="text-muted-foreground">Select a country to find rooms near you, or browse global events.</p>
          <div className="max-w-xs">
            <Select defaultValue="global">
              <SelectTrigger className="w-full bg-card/50">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <SelectValue placeholder="Select a region" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="pk">Pakistan</SelectItem>
                <SelectItem value="in">India</SelectItem>
                <SelectItem value="gb">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        
        <section className="space-y-4">
            <div className="flex items-center gap-2">
                <PlaySquare className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold font-headline">Trending Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingVideos.map((item, index) => (
                <TrendingCard 
                    key={`video-${index}`}
                    href={item.href}
                    image={item.image}
                    hint={item.hint}
                    title={item.title}
                    creator={item.creator}
                    viewers={item.viewers}
                    icon={Headphones}
                />
              ))}
            </div>
        </section>

        <section className="space-y-4">
            <div className="flex items-center gap-2">
                <Mic className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold font-headline">Trending Audio</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingAudio.map((item, index) => (
                <TrendingCard 
                    key={`audio-${index}`}
                    href={item.href}
                    image={item.image}
                    hint={item.hint}
                    title={item.title}
                    creator={item.creator}
                    viewers={item.listeners}
                    icon={Headphones}
                />
              ))}
            </div>
        </section>

      </div>
    </AppLayout>
  );
}
