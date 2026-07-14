import Link from "next/link";
import { Button } from "@makemymoment/ui/components/ui/button";
import { Gift, Link2, Users } from "lucide-react";

const steps = [
    "Invite a teammate or creator",
    "They record and share their first moment",
    "Both accounts receive extra recording capacity",
];

export default function ReferPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <section className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                        <Gift className="size-4" />
                        Referral program
                    </div>
                    <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                        Bring your team into faster visual feedback.
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        Share Make My Moment with people who explain work better with a quick
                        recording than another long thread.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/signin">
                            <Link2 className="size-4" />
                            Get referral link
                        </Link>
                    </Button>
                </div>

                <div className="rounded-lg border border-border bg-card p-6">
                    <Users className="mb-5 size-5" />
                    <h2 className="font-semibold">How it works</h2>
                    <ol className="mt-5 grid gap-4">
                        {steps.map((step, index) => (
                            <li key={step} className="flex gap-3">
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-sm text-primary-foreground">
                                    {index + 1}
                                </span>
                                <span className="pt-1 text-sm text-muted-foreground">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </main>
    );
}
