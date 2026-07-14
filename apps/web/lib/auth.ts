import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import getEnvVar from "@makemymoment/utils/config";

import connectToDatabase from "@web/db/connectDB";
import { UserModel } from "@web/db/modals";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: getEnvVar("GOOGLE_ID"),
            clientSecret: getEnvVar("GOOGLE_SECRET"),
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
    },
    jwt: {
        maxAge: 7 * 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user }) {
            try {
                await connectToDatabase._getInstance();

                const existingUser = await UserModel.findOne({ emailId: user.email });

                if (!existingUser) {
                    await UserModel.create({
                        name: user.name,
                        emailId: user.email,
                        image: user.image,
                        createdAt: new Date(),
                    });
                }

                return true;
            } catch (error) {
                console.error("Error during sign-in:", error);
                return false;
            }
        },
        async session({ session }) {
            if (!session.user?.email) return session;

            await connectToDatabase._getInstance();
            const dbUser = await UserModel.findOne({ emailId: session.user.email });

            if (dbUser) {
                session.user.id = dbUser._id.toString();
                session.user.name = dbUser.name;
                session.user.image = dbUser.image;
            }

            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
                token.picture = user.image;
            }

            return token;
        },
    },
    secret: getEnvVar("NEXTAUTH_SECRET"),
};
