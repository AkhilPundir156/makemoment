import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@web/lib/auth";
import connectToDatabase from "@web/db/connectDB";
import { VideoModel } from "@web/db/modals";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase._getInstance();
        const allVideo = await VideoModel.find({ userId: session.user.id });

        if (!allVideo) {
            return NextResponse.json({ message: "There is no Video to show" }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                videos: allVideo,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
