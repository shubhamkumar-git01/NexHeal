# NexHeal Software Architecture

## Overview
NexHeal is built on a **Service-Oriented Architecture (SOA)** with a strict separation between controllers and business logic. It utilizes a monolithic Express.js backend with highly decoupled service classes to prepare for future microservice extraction.

## Core Pillars
1. **Frontend**: Next.js 16 (App Router), TailwindCSS, Shadcn UI.
2. **Backend**: Express.js, TypeScript, Node.js 20.
3. **Database**: PostgreSQL 15, managed via Prisma ORM.
4. **Caching & Queues**: Redis Architecture (Stubs), BullMQ/RabbitMQ Architecture (Stubs).

## Design Patterns
- **Provider-Agnostic Adapters**: Used in the AI Gateway and Notification Manager to prevent vendor lock-in.
- **Repository Pattern (via Prisma)**: Abstraction of database operations.
- **Centralized Middleware**: Authentication, RBAC, Error Handling, Logging, and Rate Limiting.

## Data Flow
Client (Web/Mobile) -> Nginx/LB -> Express API (Rate Limited) -> Auth Middleware -> Controller -> Service Layer -> Prisma -> PostgreSQL.
