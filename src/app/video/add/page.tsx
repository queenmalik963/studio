
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, History, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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


export default function AddVideoPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateRoom = (type: 'youtube' | 'netflix') => {
        setIsLoading(true);
        toast({
            title: "Room Created!",
            description: `Your new ${type} room is ready.`,
        });
        
        const newRoomId = `vid-${Date.now()}`;
        
        // Simulate network delay for UX
        setTimeout(() => {
            router.push(`/video/room/${newRoomId}`);
            setIsLoading(false);
        }, 1000);
    }


    return (
        <AppLayout>
            {isLoading && (
                <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
                    <Loader2 className="w-16 h-16 animate-spin text-primary" />
                </div>
            )}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-2xl font-bold font-headline">Add Video</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card onClick={() => handleCreateRoom('youtube')} className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                            <YouTubeIcon className="w-20 h-20" />
                            <span className="font-semibold text-lg">YouTube</span>
                        </div>
                    </Card>
                    <Card onClick={() => handleCreateRoom('netflix')} className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                         <div className="flex flex-col items-center gap-4">
                            <NetflixIcon className="w-16 h-16 text-red-600" />
                             <span className="font-semibold text-lg mt-4">Netflix</span>
                        </div>
                    </Card>
                </div>
                
                <Button variant="outline" size="lg" className="w-full justify-center gap-2" onClick={() => toast({ title: "Coming Soon!", description: "This feature is not yet available."})}>
                    <History />
                    Recently Watched
                </Button>
            </div>
        </AppLayout>
    );
}
