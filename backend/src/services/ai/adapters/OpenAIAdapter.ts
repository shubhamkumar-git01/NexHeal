import { AIProviderAdapter } from "./AIProviderAdapter";

export class OpenAIAdapter implements AIProviderAdapter {
  providerName = "OpenAI";

  async generateText(prompt: string, config?: any): Promise<string> {
    console.log(`[OpenAIAdapter] Executing text generation with config:`, config);
    // STUB: Simulate latency and response
    await new Promise((resolve) => setTimeout(resolve, 800));
    return "This is a simulated OpenAI text response for the given prompt.";
  }

  async generateJSON(prompt: string, config?: any): Promise<any> {
    console.log(`[OpenAIAdapter] Executing JSON generation with config:`, config);
    // STUB: Simulate latency and response
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      data: "Simulated OpenAI JSON response."
    };
  }
}
