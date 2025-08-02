
import { AppLayout } from "@/components/shared/AppLayout";
import { CreateRoomDialog } from "@/components/home/CreateRoomDialog";
import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image';
import { Users, Headphones } from "lucide-react";
import Link from "next/link";

const trendingContent = [
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

export default function HomePage() {
  return (
    <AppLayout>
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold font-headline tracking-tight">Trending Now</h1>
          <p className="text-muted-foreground">Join the most popular rooms and events</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trendingContent.map((item, index) => (
            <Link href={item.href} key={index} className="block">
                <Card className="overflow-hidden group border-transparent hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 h-full">
                <CardContent className="p-0">
                    <div className="relative">
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={item.hint}
                    />
                    <div className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        <span>{item.viewers}</span>
                    </div>
                    </div>
                    <div className="p-4">
                    <h3 className="font-semibold font-headline truncate">{item.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-accent" />
                        {item.creator}
                    </p>
                    </div>
                </CardContent>
                </Card>
            </Link>
          ))}
        </div>
      </div>
      <CreateRoomDialog />
    </AppLayout>
  );
}
