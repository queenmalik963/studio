import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

const notifications = [
    {
        id: 1,
        user: "DJ Solar",
        avatar: "https://placehold.co/40x40.png",
        action: "invited you to join",
        target: "Cosmic Trance Room",
        time: "5m ago",
        isNew: true,
        hint: "man dj"
    },
    {
        id: 2,
        user: "RaveBot",
        avatar: "https://placehold.co/40x40.png",
        action: "suggested a new track for you:",
        target: "Strobe - Lane 8",
        time: "1h ago",
        isNew: true,
        hint: "robot face"
    },
    {
        id: 3,
        user: "Anna L.",
        avatar: "https://placehold.co/40x40.png",
        action: "went live in",
        target: "Deep House Sunset",
        time: "3h ago",
        isNew: false,
        hint: "woman portrait"
    },
    {
        id: 4,
        user: "System Update",
        avatar: "https://placehold.co/40x40.png",
        action: "Audio engine updated to v2.1 for",
        target: "enhanced spatial sound.",
        time: "1d ago",
        isNew: false,
        hint: "server circuit"
    }
];

export default function InboxPage() {
    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold font-headline tracking-tight flex items-center gap-2">
                        <Bell className="w-8 h-8 text-primary"/> Inbox
                    </h1>
                    <p className="text-muted-foreground">Catch up on all your notifications and updates.</p>
                </header>

                <Card>
                    <CardContent className="p-0">
                        <ul className="divide-y divide-border">
                            {notifications.map(notification => (
                                <li key={notification.id} className="p-4 flex items-start gap-4 hover:bg-card/80 transition-colors">
                                    <Avatar>
                                        <AvatarImage src={notification.avatar} data-ai-hint={notification.hint} />
                                        <AvatarFallback>{notification.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="text-sm">
                                            <span className="font-semibold">{notification.user}</span>
                                            {' '}
                                            {notification.action}
                                            {' '}
                                            <span className="font-semibold text-primary">{notification.target}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                                    </div>
                                    {notification.isNew && <Badge variant="default" className="bg-accent text-accent-foreground">New</Badge>}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
}
