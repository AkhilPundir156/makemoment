import { CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

import getEnvVar from "@makemymoment/utils/config";

import s3Client from "@web/lib/s3Client";

type CompletedPart = {
    ETag: string;
    PartNumber: number;
};

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unable to complete upload";
}

export async function POST(req: Request) {
    try {
        const {
            uploadId,
            filename,
            parts,
        }: { uploadId?: string; filename?: string; parts?: CompletedPart[] } = await req.json();

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
                Parts: parts.map((part) => ({
                    ETag: part.ETag,
                    PartNumber: part.PartNumber,
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
    } catch (error) {
        console.error("Error completing upload:", error);
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
