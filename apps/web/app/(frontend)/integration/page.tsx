import { Cloud, Database, KeyRound, PlugZap } from "lucide-react";

const integrations = [
    {
        icon: Cloud,
        name: "S3-compatible storage",
        text: "Connect AWS S3 or Cloudflare R2 for recording storage.",
    },
    {
        icon: KeyRound,
        name: "Presigned uploads",
        text: "Issue short-lived URLs for browser, CLI, and extension uploads.",
    },
    {
        icon: Database,
        name: "Mongo metadata",
        text: "Track users, recordings, upload status, and share records.",
    },
];

export default function IntegrationPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <section className="max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                    <PlugZap className="size-4" />
                    Integrations
                </div>
                <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                    A small backend surface for a flexible recording workflow.
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                    Keep the architecture simple: authenticate users, generate upload sessions,
                    store metadata, and serve share links.
                </p>
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-3">
                {integrations.map((integration) => (
                    <article
                        key={integration.name}
                        className="rounded-lg border border-border bg-card p-6"
                    >
                        <integration.icon className="mb-5 size-5" />
                        <h2 className="font-semibold">{integration.name}</h2>
                        <p className="mt-3 leading-7 text-muted-foreground">{integration.text}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}
