import { CacheManager } from "../cache/CacheManager";

export class IdempotencyManager {
  /**
   * Ensures critical APIs are not processed multiple times.
   */
  static async check(idempotencyKey: string): Promise<boolean> {
    if (!idempotencyKey) return false;

    // Check if key exists in cache
    const existing = await CacheManager.get(`idempotency:${idempotencyKey}`);
    if (existing) {
      return true; // Request already processed
    }
    return false;
  }

  static async save(idempotencyKey: string, responsePayload: any, ttlSeconds: number = 86400): Promise<void> {
    if (idempotencyKey) {
      await CacheManager.set(`idempotency:${idempotencyKey}`, responsePayload, ttlSeconds);
    }
  }
}
