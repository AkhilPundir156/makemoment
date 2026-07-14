/**
 * Class: MultipartUploader
 * ------------------------
 * Handles the complete lifecycle of a multipart upload to R2 (or S3-compatible storage).
 * Maintains internal state such as uploadId, part numbers, and uploaded parts (ETags).
 *
 * Responsibilities:
 * - Start multipart upload (create uploadId)
 * - Get presigned URLs for each part
 * - Upload each chunk using the presigned URL
 * - Complete or abort the upload
 */
import { MultipartUploaderOptions, UploadedPart } from "@makemymoment/types";

export class MultipartUploader {
    private uploadId: string | null = null;
    private parts: UploadedPart[] = [];
    private currentPartNumber = 1;

    private filename: string;
    private contentType?: string;
    private backendUrl: string;

    constructor(options: MultipartUploaderOptions & { backendUrl: string }) {
        this.filename = options.filename;
        this.contentType = options.contentType;
        this.backendUrl = options.backendUrl; // e.g. https://api.makemymoment.com
    }

    /**
     * Step 1: Start multipart upload session
     * Calls backend `/api/start-upload` to get uploadId.
     */
    async createMultipartUploader(): Promise<string> {
        const res = await fetch(`${this.backendUrl}/api/start-upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                filename: this.filename,
                contentType: this.contentType,
            }),
        });

        const data = await res.json();
        this.uploadId = data.uploadId;

        return this.uploadId!;
    }

    /**
     * Step 2: Get presigned URL for a specific part
     */
    async getPartSignedUrl(partNumber: number): Promise<string> {
        if (!this.uploadId) throw new Error("UploadId not initialized.");

        const res = await fetch(
            `${this.backendUrl}/api/part-url?uploadId=${this.uploadId}&filename=${this.filename}&partNumber=${partNumber}`
        );

        const data = await res.json();
        return data.url;
    }

    /**
     * Step 3: Upload a single chunk (100MB)
     * Directly PUT to the presigned URL from R2/S3.
     */
    async uploadPart(chunk: Blob): Promise<void> {
        if (!this.uploadId) throw new Error("UploadId not initialized.");

        const url = await this.getPartSignedUrl(this.currentPartNumber);

        const res = await fetch(url, {
            method: "PUT",
            body: chunk,
        });

        if (!res.ok) throw new Error(`Upload failed for part ${this.currentPartNumber}`);

        const eTag = res.headers.get("ETag") || `"part-${this.currentPartNumber}"`;

        this.parts.push({ ETag: eTag, PartNumber: this.currentPartNumber });
        this.currentPartNumber++;

        // TODO: Store parts in IndexedDB
    }

    /**
     * Step 4: Complete the multipart upload
     */
    async completeMultipartUpload(): Promise<void> {
        if (!this.uploadId) throw new Error("No uploadId present.");
        if (this.parts.length === 0) throw new Error("No parts uploaded.");

        await fetch(`${this.backendUrl}/api/complete-upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uploadId: this.uploadId,
                filename: this.filename,
                parts: this.parts,
            }),
        });

        this.uploadId = null;
        this.parts = [];
        this.currentPartNumber = 1;
    }

    /**
     * Step 5: Abort the multipart upload (optional)
     */
    async abortMultipartUpload(): Promise<void> {
        if (!this.uploadId) throw new Error("No uploadId to abort.");

        await fetch(`${this.backendUrl}/api/abort-upload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                uploadId: this.uploadId,
                filename: this.filename,
            }),
        });

        this.uploadId = null;
        this.parts = [];
        this.currentPartNumber = 1;
    }

    /**
     * Returns current state (useful for resumable uploads)
     */
    getState() {
        return {
            uploadId: this.uploadId,
            currentPartNumber: this.currentPartNumber,
            uploadedParts: this.parts,
            filename: this.filename,
            contentType: this.contentType,
        };
    }
}

/**
 * Usage in the Any package

    import { MultipartUploader } from "@makemymoment/utils/cloud/MultipartUploader";

    const uploader = new MultipartUploader({
      filename: file.name,
      contentType: file.type,
      backendUrl: "https://our-backend-url,
    });

    const uploadId = await uploader.createMultipartUploader();

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      await uploader.uploadPart(chunk);
    }

    await uploader.completeMultipartUpload();
 */
