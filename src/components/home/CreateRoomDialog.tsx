"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Image as ImageIcon, Users, Film } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CreateRoomDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    toast({
        title: "Room Created!",
        description: "Your room is now live and ready for friends.",
    })
    setOpen(false); // Close dialog on submit
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-28 right-4 md:bottom-8 md:right-8 h-16 w-16 rounded-full shadow-lg shadow-primary/30 z-50">
          <Plus className="h-8 w-8" />
          <span className="sr-only">Create Room</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-background border-primary/20">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center gap-2 text-2xl"><Film /> Create New Room</DialogTitle>
            <DialogDescription>
              Setup your private room to watch videos with friends.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="room-name">Room Name</Label>
              <Input id="room-name" placeholder="e.g. Techno Tuesday" required className="py-6"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Details</Label>
              <Textarea placeholder="What's the vibe?" id="description" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="picture">Room Display Picture</Label>
                <Input id="picture" type="file" className="file:text-primary file:font-semibold file:mr-4 file:bg-primary/10 file:rounded-full file:px-4 file:py-2 file:border-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seats"><Users className="inline-block mr-2 w-4 h-4" />Seats</Label>
              <Select required>
                <SelectTrigger id="seats" className="w-full py-6">
                  <SelectValue placeholder="Select number of seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Seats</SelectItem>
                  <SelectItem value="4">4 Seats</SelectItem>
                  <SelectItem value="8">8 Seats</SelectItem>
                  <SelectItem value="15">15 Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create Room</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
