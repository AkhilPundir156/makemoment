import { SiteHeader } from "./components/site-header";

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />
            {children}
        </div>
    );
}
