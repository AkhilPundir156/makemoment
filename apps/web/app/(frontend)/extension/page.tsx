import Link from "next/link";
import { Button } from "@makemymoment/ui/components/ui/button";
import { Chrome, MonitorUp, ShieldCheck, Video } from "lucide-react";

const features = [
    {
        icon: Video,
        title: "Tab and screen capture",
        text: "Start lightweight recordings from the browser without opening the dashboard first.",
    },
    {
        icon: MonitorUp,
        title: "Direct cloud uploads",
        text: "Use the same multipart upload API as the web app for large files and longer sessions.",
    },
    {
        icon: ShieldCheck,
        title: "Private by default",
        text: "Recordings stay tied to the authenticated workspace before a share link is created.",
    },
];

export default function ExtensionPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <section className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                        <Chrome className="size-4" />
                        Browser extension
                    </div>
                    <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                        Capture the screen from wherever the work happens.
                    </h1>
                    <p className="text-lg leading-8 text-muted-foreground">
                        The extension is the fastest path for support clips, product demos, and QA
                        reports. Record, upload, and return with a link ready for the team.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/signin">Join waitlist</Link>
                    </Button>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                    <div className="rounded-md border border-border bg-background p-5">
                        <div className="mb-6 flex items-center justify-between">
                            <p className="font-medium">Extension recorder</p>
                            <span className="rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground">
                                Ready
                            </span>
                        </div>
                        <div className="space-y-3">
                            {["Current tab", "Window", "Entire screen"].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center justify-between rounded-md border border-border p-3"
                                >
                                    <span className="text-sm">{item}</span>
                                    <span className="size-3 rounded-full bg-emerald-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16 grid gap-4 md:grid-cols-3">
                {features.map((feature) => (
                    <article
                        key={feature.title}
                        className="rounded-lg border border-border bg-card p-6"
                    >
                        <feature.icon className="mb-5 size-5" />
                        <h2 className="font-semibold">{feature.title}</h2>
                        <p className="mt-3 leading-7 text-muted-foreground">{feature.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}
