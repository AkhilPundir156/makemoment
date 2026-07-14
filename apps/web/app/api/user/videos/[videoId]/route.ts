import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import isValidDbId from "@makemymoment/utils/validmongo";

import { authOptions } from "@web/lib/auth";
import connectToDatabase from "@web/db/connectDB";
import { VideoModel } from "@web/db/modals";

type VideoRouteContext = {
    params: Promise<{ videoId: string }>;
};

export async function GET(_req: Request, { params }: VideoRouteContext) {
    try {
        const videoId = (await params).videoId;

        if (!isValidDbId(videoId)) {
            return NextResponse.json({ message: "Invalid Video Id" }, { status: 401 });
        }

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase._getInstance();
        const video = await VideoModel.findById(videoId);

        if (!video) {
            return NextResponse.json({ message: "There is no Video to show" }, { status: 404 });
        }

        return NextResponse.json(
            {
                success: true,
                video: video,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: VideoRouteContext) {
    try {
        const videoId = (await params).videoId;

        if (!isValidDbId(videoId)) {
            return NextResponse.json({ message: "Invalid Video Id" }, { status: 400 });
        }

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase._getInstance();
        await VideoModel.findByIdAndDelete(videoId);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Error deleting video:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
