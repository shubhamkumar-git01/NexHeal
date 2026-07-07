export class CircuitBreaker {
  /**
   * Circuit Breaker & Retry Architecture.
   * Stub implementation wrapping potentially failing external services.
   */
  static async execute<T>(
    operation: () => Promise<T>,
    fallback: () => Promise<T>,
    serviceName: string,
    maxRetries: number = 3
  ): Promise<T> {
    let attempts = 0;
    while (attempts < maxRetries) {
      try {
        return await operation();
      } catch (error) {
        attempts++;
        console.warn(`[CircuitBreaker] ${serviceName} failed (Attempt ${attempts}/${maxRetries})`);
        if (attempts >= maxRetries) {
          console.error(`[CircuitBreaker] ${serviceName} circuit OPEN. Falling back.`);
          return await fallback();
        }
        // Exponential backoff stub
        await new Promise(res => setTimeout(res, 500 * Math.pow(2, attempts)));
      }
    }
    return await fallback();
  }
}
