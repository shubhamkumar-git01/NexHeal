export class ConfigManager {
  /**
   * Retrieves and validates an environment variable.
   * In a real enterprise system, this would use zod/joi for validation.
   */
  static get(key: string, required = false, defaultValue?: string): string {
    const value = process.env[key];
    if (!value && required && defaultValue === undefined) {
      throw new Error(`[ConfigManager] Missing required config key: ${key}`);
    }
    return value || defaultValue || "";
  }

  static getNumber(key: string, required = false, defaultValue?: number): number {
    const value = this.get(key, required, defaultValue?.toString());
    const parsed = parseFloat(value);
    if (isNaN(parsed)) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`[ConfigManager] Config key ${key} is not a valid number.`);
    }
    return parsed;
  }
}
