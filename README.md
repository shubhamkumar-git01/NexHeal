# NexHeal - Enterprise Identity, Healthcare & Security Platform

![Version](https://img.shields.io/badge/version-v1.0.0--rc.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-Release_Candidate-orange)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-black?logo=vercel)](https://nex-heal.vercel.app/)
[![Render](https://img.shields.io/badge/Render-Backend-purple?logo=render)](https://nexheal.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/shubhamkumar-git01/NexHeal)

**Live Frontend:** [https://nex-heal.vercel.app/](https://nex-heal.vercel.app/)  
**Live Backend API:** [https://nexheal.onrender.com/api/v1](https://nexheal.onrender.com/api/v1)

NexHeal is a provider-agnostic, AI-powered enterprise command center and healthcare ERP platform. It supports longitudinal electronic health records, emergency dispatch workflows, volunteer coordination, business intelligence analytics, and hospital resource management—all secured by enterprise-grade infrastructure.

---

## 📸 Screenshots

| Global Command Center | Medical Records | Emergency Dispatch |
|:---:|:---:|:---:|
| ![GCC Dashboard](https://via.placeholder.com/400x250?text=Command+Center) | ![EHR View](https://via.placeholder.com/400x250?text=Patient+Records) | ![Emergency Map](https://via.placeholder.com/400x250?text=Dispatch+Live) |

---

## 🏗 Architecture Overview

NexHeal is built on a Service-Oriented Architecture (SOA) that is robust, modular, and ready for future microservices extraction.

### Core Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn UI, Recharts.
- **Backend**: Node.js 20, Express, TypeScript.
- **Database**: PostgreSQL 15 via Prisma ORM.
- **Infrastructure**: Redis (Cache/Locks), RabbitMQ (Queues) [Stubs], Docker.
- **AI Gateway**: Provider-agnostic adapter architecture supporting OpenAI, Azure, Gemini, Claude, and Llama.

---

## 📁 Folder Structure

```
NexHeal/
├── backend/                  # Express.js REST API
│   ├── prisma/               # Database schemas and migrations
│   ├── src/
│   │   ├── controllers/      # Thin HTTP handlers
│   │   ├── infrastructure/   # Cache, Queues, Config, WebSockets
│   │   ├── middlewares/      # Security, RBAC, Validation
│   │   ├── routes/           # Express Routers (/api/v1)
│   │   └── services/         # Core Business Logic & AI Gateway
│   └── tests/                # Jest Unit & Integration Tests
├── web/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/              # App Router Pages
│   │   ├── components/       # Reusable UI (Charts, Cards, Forms)
│   │   └── lib/              # Utility functions
│   └── tests/                # React Testing Library Tests
├── docs/                     # Architecture & Technical Documentation
└── docker-compose.yml        # Orchestration
```

---

## 🚀 Installation & Deployment

### Environment Setup
Create a `.env` file in the root, `backend`, and `web` directories based on the `.env.example` files provided.

### Docker Deployment (Recommended)
```bash
docker-compose up --build -d
```
Access the application at `http://localhost:3000`.

### Manual Development Setup
1. **Database:** Ensure PostgreSQL is running.
2. **Backend:**
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm run dev
   ```
3. **Frontend:**
   ```bash
   cd web
   npm install
   npm run dev
   ```

---

## 🔑 Demo Accounts & Seed Strategy

*Note: You must run the Prisma seed script to generate these accounts.*
- **Super Admin:** `admin@nexheal.com` / `admin123`
- **Doctor:** `doctor@nexheal.com` / `doctor123`
- **Patient:** `patient@nexheal.com` / `patient123`

---

## 🗺 Future Roadmap (v2.0)
- True Microservices Extraction (extracting AI, Notification, and Dispatch into distinct containers).
- Kubernetes Helm Charts.
- Native Mobile App (React Native).
- Advanced Predictive AI modeling for epidemiological tracking.
