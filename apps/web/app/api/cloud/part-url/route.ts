import { NextResponse } from "next/server";
import { UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import getEnvVar from "@makemymoment/utils/config";

import s3Client from "@web/lib/s3Client";

function getErrorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unable to create part URL";
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const uploadId = searchParams.get("uploadId");
        const filename = searchParams.get("filename");
        const partNumber = Number(searchParams.get("partNumber"));

        if (!uploadId || !filename || !partNumber) {
            return NextResponse.json({ error: "Missing required params" }, { status: 400 });
        }

        const command = new UploadPartCommand({
            Bucket: getEnvVar("R2_BUCKET_NAME"),
            Key: filename,
            UploadId: uploadId,
            PartNumber: partNumber,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

        return NextResponse.json({ url });
    } catch (error) {
        console.error("Error generating part URL:", error);
        return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
    }
}
