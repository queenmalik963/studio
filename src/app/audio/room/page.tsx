
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function AudioRoomsListingPage() {
    const router = useRouter();

    return (
        <AppLayout>
            <div className="flex justify-center items-center h-full flex-col gap-4">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <p className="text-muted-foreground text-center">
                    This page will list all active audio rooms.
                    <br />
                    Right now, creating a room will take you to a unique room page.
                </p>
                <Button onClick={() => router.push('/audio/add')}>
                    Create a New Room
                </Button>
                 <Link href="/home" className="text-sm text-primary hover:underline">
                    Back to Home
                </Link>
            </div>
        </AppLayout>
    );
}
