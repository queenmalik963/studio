import { AppLayout } from "@/components/shared/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Edit, Shield, Bell, LogOut } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppLayout>
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-bold font-headline tracking-tight">Your Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences.</p>
            </header>

            <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="relative">
                        <Avatar className="w-24 h-24 border-4 border-primary/50">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person portrait" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                            <Edit className="w-4 h-4"/>
                        </Button>
                    </div>
                    <div className="text-center sm:text-left">
                        <h2 className="text-2xl font-bold font-headline">Username</h2>
                        <p className="text-muted-foreground">user@ravewave.com</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" defaultValue="Username" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" defaultValue="user@ravewave.com" disabled />
                        </div>
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Settings</CardTitle>
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80">
                        <div className="flex items-center gap-3">
                            <Bell className="text-primary"/>
                            <Label htmlFor="notifications" className="text-base">Push Notifications</Label>
                        </div>
                        <Switch id="notifications" defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80">
                         <div className="flex items-center gap-3">
                            <Shield className="text-primary"/>
                            <Label htmlFor="privacy" className="text-base">Privacy Settings</Label>
                        </div>
                        <Button variant="ghost" size="sm">Manage</Button>
                    </div>
                     <Separator />
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-card/80">
                         <div className="flex items-center gap-3">
                            <LogOut className="text-destructive"/>
                            <Label htmlFor="privacy" className="text-base text-destructive">Logout</Label>
                        </div>
                        <Button variant="destructive" size="sm">Logout All Devices</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  )
}
