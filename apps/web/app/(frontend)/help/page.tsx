import { LifeBuoy, MessageSquare, Search } from "lucide-react";

const topics = [
    "How uploads work",
    "Sharing recording links",
    "Connecting S3 or Cloudflare R2",
    "Troubleshooting browser permissions",
];

export default function HelpPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
            <section className="space-y-5">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                    <LifeBuoy className="size-4" />
                    Help center
                </div>
                <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                    Find answers for recording, uploading, and sharing.
                </h1>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3">
                    <Search className="size-5 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        Search docs, setup guides, and common workflow questions
                    </span>
                </div>
            </section>

            <section className="mt-12 grid gap-4 sm:grid-cols-2">
                {topics.map((topic) => (
                    <article key={topic} className="rounded-lg border border-border bg-card p-5">
                        <h2 className="font-semibold">{topic}</h2>
                        <p className="mt-2 leading-7 text-muted-foreground">
                            Practical guidance for keeping recording flows simple and reliable.
                        </p>
                    </article>
                ))}
            </section>

            <section className="mt-12 rounded-lg border border-border bg-card p-6">
                <MessageSquare className="mb-4 size-5" />
                <h2 className="font-semibold">Need a human?</h2>
                <p className="mt-2 leading-7 text-muted-foreground">
                    Send a support note with the recording URL, browser, and approximate upload time
                    so the team can diagnose quickly.
                </p>
            </section>
        </main>
    );
}
