export class Logger {
  /**
   * Observability Logger.
   * Prepares for Winston, Pino, or Datadog integrations.
   * Includes Correlation ID, Request ID, and Trace ID support.
   */

  static info(message: string, context?: any) {
    console.log(`[INFO] ${new Date().toISOString()}`, message, this.formatContext(context));
  }

  static error(message: string, error?: any, context?: any) {
    console.error(`[ERROR] ${new Date().toISOString()}`, message, error, this.formatContext(context));
  }

  static warn(message: string, context?: any) {
    console.warn(`[WARN] ${new Date().toISOString()}`, message, this.formatContext(context));
  }

  static debug(message: string, context?: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG] ${new Date().toISOString()}`, message, this.formatContext(context));
    }
  }

  private static formatContext(context?: any): string {
    if (!context) return '';
    return JSON.stringify({
      requestId: context.requestId || null,
      traceId: context.traceId || null,
      correlationId: context.correlationId || null,
      userId: context.userId || null,
      ...context
    });
  }
}
