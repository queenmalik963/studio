"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Music } from "lucide-react";

// Inline SVG for Facebook icon
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Facebook Icon</title>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
);

// Inline SVG for Google icon
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <title>Google Icon</title>
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 2v10l6 4" />
        <path d="M12 12.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
    </svg>
);

export default function SignupPage() {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-accent/10 p-4">
            <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border-accent/20 animate-in fade-in-0 zoom-in-95">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <Music className="w-10 h-10 text-primary" />
                        <h1 className="text-4xl font-headline font-bold">RaveWave</h1>
                    </div>
                    <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
                    <CardDescription>Join the wave and start sharing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email or Phone</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" required />
                        </div>
                        <Button asChild type="submit" className="w-full font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                           <Link href="/home">Sign Up</Link>
                        </Button>
                    </form>

                    <div className="my-4 flex items-center">
                        <div className="flex-grow border-t border-muted-foreground/20"></div>
                        <span className="mx-4 text-xs text-muted-foreground">OR SIGN UP WITH</span>
                        <div className="flex-grow border-t border-muted-foreground/20"></div>
                    </div>

                    <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                            <GoogleIcon className="mr-2 h-4 w-4" />
                            Continue with Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            <FacebookIcon className="mr-2 h-4 w-4" />
                            Continue with Facebook
                        </Button>
                    </div>

                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/" className="underline text-primary font-semibold">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
