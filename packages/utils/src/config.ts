export default function getEnvVar(key: string, required = true): string {
    const value = process.env[key];
    if (!value && required) {
        throw new Error(`❌ Missing required env var: ${key}`);
    }
    return value as string;
}
