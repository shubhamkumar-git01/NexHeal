import { PrismaClient } from "@prisma/client";
import { AIProviderAdapter } from "./adapters/AIProviderAdapter";
import { OpenAIAdapter } from "./adapters/OpenAIAdapter";
import { PromptManager } from "./PromptManager";
import { ContextBuilder } from "./ContextBuilder";
import { SafetyGuardrails, SafetyOutput } from "./SafetyGuardrails";

const prisma = new PrismaClient();

export class AIGateway {
  private provider: AIProviderAdapter;
  private readonly DEFAULT_TIMEOUT_MS = 10000;

  constructor() {
    // Dynamic provider injection could be added here based on AIProviderConfig
    this.provider = new OpenAIAdapter();
  }

  /**
   * Main entrypoint for executing AI requests safely and consistently.
   */
  async executeRequest(templateKey: string, contextId: string, contextType: "PATIENT" | "HOSPITAL" | "GENERAL"): Promise<SafetyOutput> {
    const startTime = Date.now();
    let success = true;
    let errorMessage = null;
    let rawResponse = "";

    try {
      // 1. Build Context
      let contextStr = "";
      if (contextType === "PATIENT") {
        contextStr = await ContextBuilder.buildPatientContext(contextId);
      } else if (contextType === "HOSPITAL") {
        contextStr = await ContextBuilder.buildHospitalContext(contextId);
      } else {
        contextStr = contextId; // Pass through
      }

      // 2. Fetch Prompt
      const rawPrompt = await PromptManager.getTemplate(templateKey, { context: contextStr });
      
      // 3. Apply Pre-flight Guardrails
      const sanitizedPrompt = SafetyGuardrails.sanitizePrompt(rawPrompt);

      // 4. Execute via Provider Adapter with Timeout
      rawResponse = await this.executeWithTimeout(
        this.provider.generateText(sanitizedPrompt),
        this.DEFAULT_TIMEOUT_MS
      );

      // 5. Apply Post-flight Guardrails
      const finalOutput = SafetyGuardrails.apply(rawResponse, contextType === "PATIENT" ? "CLINICAL" : "GENERAL");

      // 6. Audit Logging
      await this.logAudit({
        provider: this.provider.providerName,
        model: "gpt-4-turbo-stub", // Stub
        userId: contextId, // Stub
        responseTime: Date.now() - startTime,
        tokensUsed: 150, // Stub
        cost: 0.002, // Stub
        success: true,
        promptMetadata: { templateKey, contextType },
        responseMetadata: finalOutput.metadata
      });

      return finalOutput;

    } catch (error: any) {
      success = false;
      errorMessage = error.message;
      
      await this.logAudit({
        provider: this.provider.providerName,
        model: "unknown",
        userId: contextId,
        responseTime: Date.now() - startTime,
        tokensUsed: 0,
        cost: 0,
        success: false,
        errorMessage: errorMessage,
        promptMetadata: { templateKey, contextType },
        responseMetadata: null
      });

      throw new Error(`AI Gateway Error: ${errorMessage}`);
    }
  }

  private async executeWithTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    let timer: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timer = setTimeout(() => reject(new Error("Provider Timeout")), timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
  }

  private async logAudit(data: any) {
    // Encrypt sensitive metadata in real implementation
    await prisma.aIAuditLog.create({
      data: {
        provider: data.provider,
        model: data.model,
        userId: data.userId,
        responseTime: data.responseTime,
        tokensUsed: data.tokensUsed,
        cost: data.cost,
        success: data.success,
        errorMessage: data.errorMessage,
        promptMetadata: data.promptMetadata ? data.promptMetadata : undefined,
        responseMetadata: data.responseMetadata ? data.responseMetadata : undefined,
      }
    });
  }
}

export const aiGateway = new AIGateway();
