"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@makemymoment/ui/components/ui/button";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
    { title: "Product", href: "/" },
    { title: "Extension", href: "/extension" },
    { title: "Pricing", href: "/price" },
    { title: "Integrations", href: "/integration" },
    { title: "Refer", href: "/refer" },
    { title: "Help", href: "/help" },
];

export function SiteHeader() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Sparkles className="size-4" />
                    </span>
                    <span>Make My Moment</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const active = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-md px-3 py-2 text-sm transition ${
                                    active
                                        ? "bg-accent text-accent-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                            >
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-2">
                    {mounted ? (
                        <Button
                            aria-label="Toggle theme"
                            size="icon"
                            variant="ghost"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                        >
                            {resolvedTheme === "dark" ? (
                                <Sun className="size-4" />
                            ) : (
                                <Moon className="size-4" />
                            )}
                        </Button>
                    ) : null}
                    <Button asChild className="hidden sm:inline-flex">
                        <Link href="/signin">Sign in</Link>
                    </Button>
                    <Button
                        aria-label="Toggle navigation"
                        className="md:hidden"
                        size="icon"
                        variant="outline"
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
                    </Button>
                </div>
            </div>

            {menuOpen ? (
                <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
                    <div className="mx-auto grid max-w-6xl gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </nav>
            ) : null}
        </header>
    );
}
