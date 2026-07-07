export interface AIProviderAdapter {
  providerName: string;
  generateText(prompt: string, config?: any): Promise<string>;
  generateJSON(prompt: string, config?: any): Promise<any>;
}
