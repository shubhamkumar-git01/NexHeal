# ADR 003: Provider-Agnostic AI Gateway

## Context
NexHeal leverages LLMs for medical summarization, predictive analytics, and symptom checking. Depending solely on one provider (e.g., OpenAI) introduces vendor lock-in, pricing risks, and potential compliance issues (e.g., HIPAA requirements varying by provider).

## Decision
We will implement an `AIGateway` using the Adapter pattern.
- The system will define an `AIProviderAdapter` interface.
- Providers (OpenAI, Azure, Gemini, Claude) will implement this interface.
- Business logic will call the Gateway, not the provider SDK directly.

## Rationale
This decouples NexHeal's intelligence logic from specific APIs, enabling instant failover, cost-routing, and on-premise LLM support in the future.

## Status
Accepted.
