import getEnvVar from "@makemymoment/utils/config";

import { S3Client } from "@aws-sdk/client-s3";

/**
 * Shared S3 client for Cloudflare R2 (S3-compatible)
 * Singleton — safe to reuse across backend routes and CLI.
 */
const s3Client = new S3Client({
    region: "auto",
    endpoint: getEnvVar("R2_ENDPOINT"),
    credentials: {
        accessKeyId: getEnvVar("R2_ACCESS_KEY_ID"),
        secretAccessKey: getEnvVar("R2_SECRET_ACCESS_KEY"),
    },
});

export default s3Client;
