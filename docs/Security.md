# NexHeal Security Strategy

## Authentication & Authorization
- **JWT**: Stateless authentication using signed JSON Web Tokens.
- **RBAC**: Strict Role-Based Access Control mapped via Prisma ENUMs (Patient, Doctor, Admin, etc.).
- **Ownership Verification**: Middleware enforces that users can only access their own records unless they hold an administrative role.

## Data Protection
- **Passwords**: Hashed via `bcrypt` with salt rounds.
- **Tokens**: Passwords are never returned in API payloads.

## System Hardening
- **Helmet**: Content Security Policy (CSP), DNS prefetch control, Frameguard.
- **CORS**: Strictly defined origins managed via Environment Variables.
- **Rate Limiting**: Protection against Brute Force and DDoS attacks.
- **Idempotency**: Critical APIs (Bed Allocation, Inventory) support Idempotency Keys to prevent duplicate processing during network retries.

## AI Safety
- The AI Gateway implements **PHI/PII Masking** before transmitting payloads to external LLM providers.
- Output from AI providers is flagged with disclaimers and Confidence Scores.
