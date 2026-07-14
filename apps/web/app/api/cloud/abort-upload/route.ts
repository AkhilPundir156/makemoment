import { NextResponse } from "next/server";
import { AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

import getEnvVar from "@makemymoment/utils/config";
import s3Client from "@web/lib/s3Client";

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unable to abort upload";
}

export async function POST(req: Request) {
    try {
        const { uploadId, filename } = await req.json();

        if (!uploadId || !filename) {
            return NextResponse.json({ error: "Missing uploadId or filename" }, { status: 400 });
        }

        const command = new AbortMultipartUploadCommand({
            Bucket: getEnvVar("R2_BUCKET_NAME"),
            Key: filename,
            UploadId: uploadId,
        });

        await s3Client.send(command);

        return NextResponse.json({ message: "Upload aborted successfully" });
    } catch (error) {
        console.error("Error aborting upload:", error);
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
