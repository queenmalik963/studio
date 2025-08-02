"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreateRoomDialog() {
  return (
    <Link href="/video/add" passHref>
        <Button asChild className="fixed bottom-28 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg shadow-primary/30 z-50">
          <a>
            <Plus className="h-8 w-8" />
            <span className="sr-only">Create Room</span>
          </a>
        </Button>
    </Link>
  );
}
