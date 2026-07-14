<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=3b82f6&height=200&section=header&text=NexHeal&fontSize=90&fontAlignY=35&desc=AI-Powered%20Enterprise%20Healthcare%20Platform&descAlignY=55&descAlign=62&fontColor=ffffff" alt="NexHeal Banner" />
  
  <h3><strong>The Future of Healthcare Management & Intelligence</strong></h3>
  
  <p align="center">
    A provider-agnostic, robust, and modern electronic health records (EHR) and emergency command center built for scale.
  </p>

  <div>
    <a href="https://nex-heal.vercel.app/"><img src="https://img.shields.io/badge/Live_Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" /></a>
    <a href="https://nexheal.onrender.com/api/v1/public/stats"><img src="https://img.shields.io/badge/Live_Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render Backend" /></a>
    <img src="https://img.shields.io/badge/Version-v1.0.0-blue?style=for-the-badge" alt="Version" />
    <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
  </div>
</div>

---

## 🌟 Overview

**NexHeal** is an enterprise-grade medical platform designed to bridge the gap between patients, healthcare providers, and emergency responders. By integrating powerful AI capabilities and a modular, service-oriented architecture, NexHeal provides a centralized hub for managing everything from daily appointments and prescriptions to critical emergency triage and volunteer coordination.

### 🔗 Live Links
- **🌍 Frontend (Next.js):** [https://nex-heal.vercel.app/](https://nex-heal.vercel.app/)
- **⚙️ Backend API (Node.js):** [https://nexheal.onrender.com](https://nexheal.onrender.com)

---

## ✨ Key Features

🚀 **Global Command Center (GCC)**  
Real-time analytics and monitoring of hospital resources, patient influx, and active emergency calls. 

🤖 **AI-Powered Diagnostics & Triage**  
Built-in AI Assistant trained to assist doctors in generating structured prescriptions and helping patients assess symptoms safely. 

🏥 **Electronic Health Records (EHR)**  
Secure, encrypted, and longitudinal tracking of patient medical history, prescriptions, and test results.

🚨 **Emergency Dispatch & Volunteer Network**  
An integrated SOS system that intelligently routes emergency requests to nearby hospitals and mobilizes registered volunteers (e.g., blood donors).

🔒 **Enterprise-Grade Security**  
Role-Based Access Control (RBAC), JWT authentication, rate-limiting, and sanitized data payloads.

---

## 💻 Technology Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs,express,postgres,prisma,docker" alt="Tech Stack" />
</div>

<br/>

| **Layer** | **Technologies Used** |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Tailwind CSS 4, Shadcn UI, Framer Motion, Recharts |
| **Backend** | Node.js 20, Express.js, TypeScript, Zod |
| **Database** | PostgreSQL 15, Prisma ORM |
| **AI Integration** | Provider-Agnostic Gateway (OpenAI, Gemini, Llama) |
| **Deployment** | Vercel (Frontend), Render (Backend), Supabase (PostgreSQL) |

---

## 📸 Platform Sneak Peek

*Experience a beautiful, glassmorphic UI optimized for speed and accessibility.*

<div align="center">
  <table style="width:100%">
    <tr>
      <td align="center"><strong>Patient Dashboard</strong></td>
      <td align="center"><strong>AI Intelligence Hub</strong></td>
    </tr>
    <tr>
      <td><img src="https://via.placeholder.com/600x350/0f172a/38bdf8?text=NexHeal+Modern+Dashboard" alt="Dashboard" /></td>
      <td><img src="https://via.placeholder.com/600x350/0f172a/a855f7?text=NexHeal+AI+Assistant" alt="AI Chat" /></td>
    </tr>
  </table>
</div>

---

## 🚀 Quick Start Guide

Want to run NexHeal locally? Follow these simple steps:

### 1. Clone & Setup
```bash
git clone https://github.com/shubhamkumar-git01/NexHeal.git
cd NexHeal
```

### 2. Environment Variables
Create `.env` files in both the `web` and `backend` directories.  
*(Use the provided `.env.example` templates).*

### 3. Start the Backend
```bash
cd backend
npm install
npx prisma db push    # Initialize Database Schema
npx prisma db seed    # Seed Database with demo data
npm run dev
```

### 4. Start the Frontend
```bash
cd ../web
npm install
npm run dev
```

Visit `http://localhost:3000` to view the application! 🎉

---

## 🔐 Demo Credentials

Use the following credentials to explore different roles (requires running `npx prisma db seed`):

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@nexheal.com` | `admin123` |
| **Doctor** | `doctor@nexheal.com` | `doctor123` |
| **Patient** | `patient@nexheal.com` | `patient123` |
| **Volunteer** | `volunteer@nexheal.com` | `volunteer123` |

---

## 🤝 Contributing & Future Roadmap

NexHeal is an ever-evolving platform. Our v2.0 roadmap includes:
- True microservices extraction (Kubernetes / Helm Charts).
- Native Mobile App built with React Native.
- Advanced Predictive AI modeling for epidemiological tracking.
- WebRTC integration for live doctor-patient video consultations.

---
<div align="center">
  Made with ❤️ for the future of healthcare.
</div>
