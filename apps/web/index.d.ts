import type { nextUser } from "@makemymoment/types";

declare module "next-auth" {
    interface Session {
        user: nextUser & { image?: string };
    }
}
