import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@web/lib/auth";
import connectToDatabase from "@web/db/connectDB";
import { UserModel } from "@web/db/modals";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase._getInstance();
        const dbUser = await UserModel.findOne({ emailId: session.user.email });

        if (!dbUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                user: {
                    id: dbUser._id.toString(),
                    name: dbUser.name,
                    email: dbUser.emailId,
                    image: dbUser.image,
                    createdAt: dbUser.createdAt,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
