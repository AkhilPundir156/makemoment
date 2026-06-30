"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@makemymoment/ui/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@makemymoment/ui/components/ui/navigation-menu";

const navItems = [
  { title: "Home", href: "/" },
  { title: "Get Extension", href: "/extension" },
  { title: "Pricing", href: "/price" },
  { title: "Referral Program", href: "/ref" },
  { title: "Help", href: "/help" },
  { title: "Integrations", href: "/integration" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for client mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="w-full border-b bg-background sticky top-0 z-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
       
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-accent"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="text-xl font-semibold">
          MakeMyMoment
        </Link>

        <div className="hidden md:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-3">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} relative group text-foreground hover:text-primary transition-colors`}
                  >
                    <Link href={item.href}>
                      {item.title}
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          )}

          <Button variant='destructive'>Sign In</Button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-base font-medium hover:shadow-primary-bg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
