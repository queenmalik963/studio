"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreateRoomDialog() {
  return (
    <Button asChild className="fixed bottom-28 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg shadow-primary/30 z-50">
      <Link href="/video/add">
        <Plus className="h-8 w-8" />
        <span className="sr-only">Create Room</span>
      </Link>
    </Button>
  );
}
