
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Bell, Lock, User, Palette, Languages, ShieldCheck, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">Settings</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell /> Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" />
              </div>
               <div className="flex items-center justify-between">
                <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                <Switch id="in-app-notifications" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Lock /> Privacy</CardTitle>
              <CardDescription>Control your privacy settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="private-profile">Private Profile</Label>
                <Switch id="private-profile" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-activity">Show my activity status</Label>
                <Switch id="show-activity" defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><User /> Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Button variant="outline" className="w-full justify-start">Change Password</Button>
                 <Button variant="outline" className="w-full justify-start">Manage Blocked Users</Button>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Palette /> Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the app.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="theme">Theme</Label>
                     <Select defaultValue="dark">
                        <SelectTrigger id="theme" className="w-[180px]">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Languages /> Language</CardTitle>
               <CardDescription>Choose your preferred language.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Select defaultValue="en">
                    <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="ur">اردو</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
          </Card>
          
          <Separator />

          <Button variant="destructive" className="w-full" onClick={() => router.push('/')}>
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>

        </div>
      </div>
    </AppLayout>
  );
}
