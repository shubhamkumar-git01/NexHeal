# ADR 002: Service-Oriented Architecture (SOA)

## Context
NexHeal has grown to encompass EHR, Hospital ERP, Community Volunteering, and Emergency Dispatch. A monolithic architecture would become unmaintainable, while premature microservices would introduce excessive operational overhead.

## Decision
We will implement a strict Service-Oriented Architecture (SOA) within a monolithic deployment.
- **Controllers** must be thin (parsing requests/responses).
- **Services** must contain all business logic and be fully decoupled.
- Cross-domain interactions must happen at the service layer, not via direct database mutations.

## Rationale
This allows the team to develop rapidly in a single repository while guaranteeing that domains (e.g., Dispatch, AI, EHR) can be extracted into individual Docker containers or Kubernetes pods later without rewriting business logic.

## Status
Accepted.
