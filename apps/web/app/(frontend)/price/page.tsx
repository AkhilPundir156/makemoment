import Link from "next/link";
import { Button } from "@makemymoment/ui/components/ui/button";
import { Check, CircleDollarSign } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "For solo demos and small feedback loops.",
        features: ["25 recordings", "Basic share links", "Browser capture"],
    },
    {
        name: "Team",
        price: "$12",
        description: "For product teams that record every week.",
        features: ["Unlimited links", "Cloud uploads", "Workspace dashboard"],
    },
    {
        name: "Scale",
        price: "Custom",
        description: "For larger teams with storage and compliance needs.",
        features: ["Bring your bucket", "Audit-ready metadata", "Priority support"],
    },
];

export default function PricingPage() {
    return (
        <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <section className="max-w-3xl space-y-5">
                <div className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
                    <CircleDollarSign className="size-4" />
                    Pricing
                </div>
                <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
                    Start simple, scale when recordings become core workflow.
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">
                    Pick the plan that matches how often your team records, uploads, and shares
                    product context.
                </p>
            </section>

            <section className="mt-12 grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                    <article
                        key={plan.name}
                        className="flex rounded-lg border border-border bg-card p-6"
                    >
                        <div className="flex w-full flex-col">
                            <h2 className="text-xl font-semibold">{plan.name}</h2>
                            <p className="mt-2 text-muted-foreground">{plan.description}</p>
                            <p className="mt-6 text-3xl font-semibold">{plan.price}</p>
                            <ul className="mt-6 grid gap-3">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2 text-sm">
                                        <Check className="size-4 text-emerald-600" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button asChild className="mt-8">
                                <Link href="/signin">Choose {plan.name}</Link>
                            </Button>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}
