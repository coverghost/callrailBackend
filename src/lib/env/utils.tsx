export function getOsEnv(key: string): string {
    if (typeof process.env[key] == 'undefined') {
        throw new Error(`Environment variable ${key} not found`)
    }
    return process.env[key] as string;
}