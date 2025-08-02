
"use client";

import { AppLayout } from "@/components/shared/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Banknote, Landmark } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const BankIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16"/><path d="m2 10 10-7 10 7"/><path d="M6 10v12h4v-8h4v8h4V10"/>
    </svg>
)
const PayPalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.336 2.023c-1.39 0-2.505.787-2.923 2.05-.18.54-.252 1.22-.093 1.956.113.513.34 1.12.633 1.637.336.578.76 1.137 1.25 1.64.493.504 1.05.938 1.666 1.284C9.57 10.93 8.1 11.02 6.84 11.458c-1.4.48-2.627 1.34-3.326 2.532C2.81 15.183 2.5 16.44 2.5 17.61c0 1.58.625 2.94 1.77 3.93s2.68 1.485 4.31 1.485c.53 0 1.05-.08 1.52-.24.46-.15.89-.37 1.27-.64.39-.28.73-.61 1.02-1-.02.03-.04.05-.05.07-.11.23-.21.49-.29.77-.07.23-.12.44-.15.61-.03.17-.04.3-.04.39 0 .18.06.31.18.39a.5.5 0 0 0 .4.15c.16 0 .3-.05.4-.15.09-.1.14-.24.13-.42a1.3 1.3 0 0 0-.1-.58 2.4 2.4 0 0 0-.25-.67c-.11-.2-.2-.36-.28-.5-.08-.13-.15-.25-.21-.34a11.5 11.5 0 0 1 2.21-1.93c.53-.45 1.02-.99 1.44-1.62.42-.64.76-1.35 1-2.14.24-.78.36-1.61.36-2.47 0-1.46-.46-2.73-1.39-3.8C19.03 3.03 17.5.998 15.5.998c-1.2 0-2.28.44-3.18 1.3-.4.37-.73.8-1.01 1.27-.27.47-.5 1-.68 1.56h.02c.07-.47.1-1 .1-1.56 0-1.2-.56-2.2-1.514-2.525zM6.63 12.3c-.3-.02-.6-.02-.89-.02-.85 0-1.6.22-2.25.66-.65.45-1.12 1.05-1.37 1.79-.26.74-.26 1.5.01 2.2.27.7.75 1.25 1.43 1.65.68.4 1.5.6 2.44.6.3 0 .6-.02.89-.08.28-.05.56-.12.83-.2l.02-.02c.7-.22 1.3-.58 1.8-1.07s.88-1.08.88-1.78c0-.6-.18-1.14-.52-1.62-.35-.48-.8-.85-1.34-1.12-.55-.26-1.18-.4-1.89-.42zm7.04-1.87c.72 0 1.36.27 1.87.82.5.55.77 1.2.77 1.94s-.27 1.37-.8 1.87c-.54.5-1.18.76-1.92.76-.73 0-1.37-.26-1.88-.78-.5-.52-.77-1.15-.77-1.87 0-.72.26-1.35.78-1.88.52-.53 1.15-.8 1.87-.8z"/>
    </svg>
)

export default function WithdrawPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft />
          </Button>
          <h1 className="text-2xl font-bold font-headline">Withdraw</h1>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
                <CardDescription>Select a method and enter the amount to withdraw.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount (in Coins)</Label>
                    <div className="relative">
                        <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                        <Input id="amount" type="number" placeholder="e.g., 5000" className="pl-10" />
                    </div>
                    <p className="text-xs text-muted-foreground">Available to withdraw: 1,250 Coins ($12.50)</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="method">Withdrawal Method</Label>
                    <Select>
                        <SelectTrigger id="method">
                            <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bank">
                                <div className="flex items-center gap-2">
                                    <BankIcon className="w-5 h-5" />
                                    <span>Bank Transfer</span>
                                </div>
                            </SelectItem>
                            <SelectItem value="paypal">
                                 <div className="flex items-center gap-2">
                                    <PayPalIcon className="w-5 h-5" />
                                    <span>PayPal</span>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button className="w-full" size="lg">
                    <Landmark className="mr-2 h-5 w-5"/>
                    Request Withdraw
                </Button>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
