# ADR 001: Technology Stack Selection

## Context
NexHeal requires a modern, scalable, and type-safe technology stack capable of handling real-time data, complex relational queries, and an enterprise UI.

## Decision
- **Frontend**: Next.js 16 with React 19 and Tailwind CSS 4.
- **Backend**: Node.js 20 with Express.js.
- **Database**: PostgreSQL 15.
- **ORM**: Prisma.
- **Language**: TypeScript across the entire monorepo.

## Rationale
TypeScript provides end-to-end type safety. Next.js offers superior SSR and routing. PostgreSQL is the industry standard for relational medical data, and Prisma accelerates schema iteration.

## Status
Accepted.
