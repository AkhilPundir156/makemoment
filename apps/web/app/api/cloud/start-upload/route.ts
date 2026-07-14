import { NextResponse } from "next/server";
import { CreateMultipartUploadCommand } from "@aws-sdk/client-s3";

import getEnvVar from "@makemymoment/utils/config";

import s3Client from "@web/lib/s3Client";

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unable to start upload";
}

export async function POST(req: Request) {
    try {
        const { filename, contentType } = await req.json();

        const command = new CreateMultipartUploadCommand({
            Bucket: getEnvVar("R2_BUCKET_NAME"),
            Key: filename,
            ContentType: contentType,
        });

        const response = await s3Client.send(command);

        return NextResponse.json({
            uploadId: response.UploadId,
            key: response.Key,
        });
    } catch (error) {
        console.error("Error starting upload:", error);
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
