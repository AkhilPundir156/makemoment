"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@makemymoment/ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@makemymoment/ui/components/ui/card";
import { Chrome, LogOut } from "lucide-react";

export default function SignInPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Checking session</CardTitle>
                        <CardDescription>
                            One moment while Make My Moment loads your account.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </main>
        );
    }

    if (session) {
        return (
            <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Signed in</CardTitle>
                        <CardDescription>
                            {session.user.email} is ready to record and share moments.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant="outline"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="size-4" />
                            Sign out
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Sign in to Make My Moment</CardTitle>
                    <CardDescription>
                        Use Google to access recording uploads, dashboard metadata, and share links.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border bg-muted p-4 text-sm text-muted-foreground">
                        The app only requests the account details needed to create your workspace
                        profile.
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={() => signIn("google")}>
                        <Chrome className="size-4" />
                        Continue with Google
                    </Button>
                </CardFooter>
            </Card>
        </main>
    );
}
