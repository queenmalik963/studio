"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlaySquare, User, Music, LogOut, Mic, MessageCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/audio', label: 'Audio', icon: Mic },
  { href: '/video', label: 'Video', icon: PlaySquare },
  { href: '/chat', label: 'Chat', icon: MessageCircle, badge: 9 },
  { href: '/profile', label: 'Profile', icon: User },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <TooltipProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        {isMobile === false && <SidebarNav />}
        <main className={cn("transition-[margin] duration-300 ease-in-out", isMobile ? 'pb-24 pt-4 px-4' : 'ml-64 p-8')}>
            {children}
        </main>
        {isMobile && <BottomNav />}
      </div>
    </TooltipProvider>
  );
}

function SidebarNav() {
    const pathname = usePathname();
    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-card/50 backdrop-blur-lg border-r border-border flex flex-col p-4 z-40">
            <Link href="/home" className="mb-10">
                <div className="flex items-center gap-2 px-2">
                    <Music className="text-primary h-8 w-8" />
                    <h1 className="text-2xl font-headline font-bold text-foreground">RaveWave</h1>
                </div>
            </Link>
            <nav className="flex flex-col gap-2 flex-grow">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} passHref>
                        <Button
                            variant={pathname === item.href ? 'secondary' : 'ghost'}
                            className="w-full justify-start text-base py-6 rounded-lg relative"
                        >
                            <item.icon className="mr-4 h-5 w-5" />
                            {item.label}
                            {item.badge && <Badge className="absolute right-4 bg-red-500 text-white">{item.badge}</Badge>}
                        </Button>
                    </Link>
                ))}
            </nav>
            <div className="mt-auto">
                 <Link href="/" passHref>
                    <Button variant="ghost" className="w-full justify-start text-base py-6 rounded-lg text-muted-foreground hover:text-foreground">
                        <LogOut className="mr-4 h-5 w-5" />
                        Logout
                    </Button>
                </Link>
            </div>
        </aside>
    );
}

function BottomNav() {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-lg border-t border-border z-50">
            <div className="flex justify-around items-center h-full max-w-lg mx-auto">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} passHref>
                        <div className={cn(
                            "relative flex flex-col items-center gap-1 transition-colors w-16 p-2 rounded-lg",
                            pathname === item.href ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'
                        )}>
                            <item.icon className="h-6 w-6" />
                            <span className="text-xs font-medium">{item.label}</span>
                             {item.badge && <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 bg-red-500 text-white">{item.badge}</Badge>}
                        </div>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
