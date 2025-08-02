
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Upload, Mic } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddAudioPage() {
    const router = useRouter();

    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-2xl font-bold font-headline">Add Audio</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Card className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                            <Mic className="w-16 h-16 text-primary" />
                            <span className="font-semibold text-lg">Start a Room</span>
                        </div>
                    </Card>
                    <Card className="aspect-square flex items-center justify-center p-6 text-center bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                         <div className="flex flex-col items-center gap-4">
                            <Upload className="w-16 h-16 text-accent" />
                             <span className="font-semibold text-lg">Upload Track</span>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
