import Link from "next/link";
import { Button } from "@makemymoment/ui/components/ui/button";
import {
    BadgeCheck,
    CloudUpload,
    MonitorPlay,
    MousePointerClick,
    Share2,
    TerminalSquare,
} from "lucide-react";

const stats = [
    ["3 capture paths", "Web, extension, and CLI"],
    ["Multipart upload", "Built for large recordings"],
    ["Share links", "Fast review handoffs"],
];

const workflows = [
    {
        icon: MonitorPlay,
        title: "Record the moment",
        text: "Capture tabs, windows, or your full screen without dragging a heavy editor into the flow.",
    },
    {
        icon: CloudUpload,
        title: "Upload reliably",
        text: "Send recordings through presigned multipart uploads to S3-compatible storage.",
    },
    {
        icon: Share2,
        title: "Share and manage",
        text: "Keep a dashboard of recordings, playback pages, and reusable share links.",
    },
];

export default function HomePage() {
    return (
        <main>
            <section className="border-b border-border">
                <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                            <BadgeCheck className="size-4 text-emerald-600" />
                            Screen recording for teams that ship visually
                        </div>
                        <div className="space-y-5">
                            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">
                                Record, upload, and share product moments in one clean flow.
                            </h1>
                            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                                Make My Moment brings the browser extension, dashboard, and upload
                                API into one practical workspace for demos, QA notes, support
                                handoffs, and async feedback.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button asChild size="lg">
                                <Link href="/extension">
                                    <MousePointerClick className="size-4" />
                                    Get extension
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link href="/integration">
                                    <TerminalSquare className="size-4" />
                                    View integrations
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                        <div className="rounded-md border border-border bg-background p-4">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium">Dashboard preview</p>
                                    <p className="text-xs text-muted-foreground">Recent moments</p>
                                </div>
                                <span className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                    Live
                                </span>
                            </div>
                            <div className="aspect-video rounded-md border border-border bg-muted p-4">
                                <div className="flex h-full flex-col justify-between rounded-md bg-card p-4 shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="size-3 rounded-full bg-red-500" />
                                        <span className="size-3 rounded-full bg-amber-500" />
                                        <span className="size-3 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-3 w-3/4 rounded bg-muted" />
                                        <div className="h-3 w-1/2 rounded bg-muted" />
                                        <div className="grid grid-cols-3 gap-2 pt-2">
                                            {stats.map(([label, value]) => (
                                                <div
                                                    key={label}
                                                    className="rounded-md border border-border bg-background p-3"
                                                >
                                                    <p className="text-xs font-medium">{label}</p>
                                                    <p className="mt-1 text-[11px] text-muted-foreground">
                                                        {value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid max-w-6xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-3">
                {workflows.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-lg border border-border bg-card p-6"
                    >
                        <item.icon className="mb-5 size-5 text-primary" />
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}
