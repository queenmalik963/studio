
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function VideoRoomsListingPage() {

    return (
        <AppLayout>
            <div className="flex justify-center items-center h-full flex-col gap-4">
                <Loader2 className="w-16 h-16 animate-spin text-primary" />
                <p className="text-muted-foreground text-center">
                    This page will list all active video rooms.
                    <br />
                    Right now, creating a room will take you to a unique room page.
                </p>
                 <Link href="/home" className="text-sm text-primary hover:underline">
                    Back to Home
                </Link>
            </div>
        </AppLayout>
    );
}
