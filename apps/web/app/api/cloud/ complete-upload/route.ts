import { NextResponse } from "next/server";
import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";

import getEnvVar from "@makemymoment/utils/config";

import s3Client from "@web/lib/s3Client";

export async function POST(req: Request) {
    try {
        const { uploadId, filename, parts } = await req.json();

        if (!uploadId || !filename || !parts?.length) {
            return NextResponse.json(
                { error: "Missing uploadId, filename or parts" },
                { status: 400 }
            );
        }

        const command = new CompleteMultipartUploadCommand({
            Bucket: getEnvVar("R2_BUCKET_NAME"),
            Key: filename,
            UploadId: uploadId,
            MultipartUpload: {
                Parts: parts.map((p: any) => ({
                    ETag: p.ETag,
                    PartNumber: p.PartNumber,
                })),
            },
        });

        const response = await s3Client.send(command);

        return NextResponse.json({
            message: "Upload complete",
            location: response.Location,
            key: response.Key,
            bucket: response.Bucket,
        });
    } catch (error: any) {
        console.error("Error completing upload:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
