import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import getEnvVar from "@makemymoment/utils/config";

import connectToDatabase from "@web/db/connectDB";
import { UserModel } from "@web/db/modals";

export const authOptions = {
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
        //@ts-ignore
        async signIn({ user, account, profile }) {
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
            } catch (err) {
                console.error("Error during sign-in:", err);
                return false;
            }
        },
        //@ts-ignore
        async session({ session }) {
            if (!session?.user?.email) return session;

            await connectToDatabase._getInstance();
            const dbUser = await UserModel.findOne({ emailId: session.user.email });

            if (dbUser) {
                session.user.id = dbUser._id.toString();
                session.user.name = dbUser.name;
                session.user.image = dbUser.image;
            }

            return session;
        },
        //@ts-ignore
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

//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
