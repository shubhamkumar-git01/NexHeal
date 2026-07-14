<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=3b82f6&height=200&section=header&text=NexHeal&fontSize=90&fontAlignY=35&desc=AI-Powered%20Enterprise%20Healthcare%20Platform&descAlignY=55&descAlign=62&fontColor=ffffff" alt="NexHeal Banner" />
  
  <br />
  <!-- Logo Section -->
  <a href="https://nex-heal.vercel.app/">
    <img src="https://raw.githubusercontent.com/shubhamkumar-git01/NexHeal/main/web/public/logo.jpg" alt="NexHeal Logo" width="150" height="150" style="border-radius: 50%; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
  </a>
  
  <br /><br />
  
  <!-- Typing SVG Animation -->
  <a href="https://nex-heal.vercel.app/">
    <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=24&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&lines=The+Future+of+Healthcare+Management;AI-Powered+Diagnostics+%26+Triage;Global+Emergency+Command+Center;Longitudinal+Health+Records" alt="Typing Animation" />
  </a>

  <p align="center">
    A provider-agnostic, robust, and modern electronic health records (EHR) and emergency command center built for scale.
  </p>

  <div>
    <a href="https://nex-heal.vercel.app/"><img src="https://img.shields.io/badge/Live_Frontend-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Deployment" /></a>
    <a href="https://nexheal.onrender.com/api/v1/public/stats"><img src="https://img.shields.io/badge/Live_Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render Backend" /></a>
    <img src="https://img.shields.io/badge/Version-v1.0.0-blue?style=for-the-badge" alt="Version" />
    <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status" />
  </div>
</div>

---

## 🌟 Overview

**NexHeal** is an enterprise-grade medical platform designed to bridge the gap between patients, healthcare providers, and emergency responders. By integrating powerful AI capabilities and a modular, service-oriented architecture, NexHeal provides a centralized hub for managing everything from daily appointments and prescriptions to critical emergency triage and volunteer coordination.

### 🔗 Official Live Links
- **🌍 Frontend (Next.js):** [https://nex-heal.vercel.app/](https://nex-heal.vercel.app/)
- **⚙️ Backend API (Node.js):** [https://nexheal.onrender.com](https://nexheal.onrender.com)

---

## ✨ Key Features & Capabilities

<div align="center">
  <img src="https://raw.githubusercontent.com/shubhamkumar-git01/NexHeal/main/web/public/logo.jpg" alt="NexHeal Mini Logo" width="80" style="border-radius: 12px; margin-bottom: 10px;" />
</div>

🚀 **Global Command Center (GCC)**  
Real-time analytics and monitoring of hospital resources, patient influx, and active emergency calls via an interactive dashboard.

🤖 **AI-Powered Diagnostics & Triage**  
Built-in AI Intelligence Hub trained to assist doctors in generating structured prescriptions and helping patients assess symptoms safely. 

🏥 **Electronic Health Records (EHR)**  
Secure, encrypted, and longitudinal tracking of patient medical history, prescriptions, and test results accessible anywhere.

🚨 **Emergency Dispatch & Volunteer Network**  
An integrated SOS system that intelligently routes emergency requests to nearby hospitals and mobilizes registered volunteers (e.g., blood donors, first responders).

🔒 **Enterprise-Grade Security**  
Role-Based Access Control (RBAC) supporting Super Admins, Doctors, Patients, and Volunteers with strict data sanitization and JWT authentication.

---

## 💻 Technology Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,nodejs,express,postgres,prisma,docker,vercel&perline=10" alt="Tech Stack" />
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

## 🚀 Getting Started

*NexHeal is a proprietary-grade application. The following steps are for authorized local development and testing only.*

### 1. Environment Setup
Create `.env` files in both the `web` and `backend` directories using the provided `.env.example` templates. You will need your own Supabase Database URL and AI API keys.

### 2. Booting the Core Servers
```bash
# Start the Backend & Initialize DB
cd backend
npm install
npx prisma db push
npx prisma db seed    # Seeds demo accounts
npm run dev

# Start the Frontend (in a new terminal)
cd web
npm install
npm run dev
```

Visit **`http://localhost:3000`** to access the local development server.

---

## 🔐 System Access (Demo Mode)

For authorized testing, use the following generated credentials after running the seed command:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@nexheal.com` | `admin123` | Full system override, analytics, user management |
| **Doctor** | `doctor@nexheal.com` | `doctor123` | Prescription generation, appointment management |
| **Patient** | `patient@nexheal.com` | `patient123` | Personal EHR access, AI symptom triage |
| **Volunteer** | `volunteer@nexheal.com` | `volunteer123` | Emergency alerts, donation drives |

---

## 🤝 Future Roadmap (v2.0)

NexHeal is an ever-evolving platform. Our upcoming roadmap includes:
- **WebRTC Integration** for live Doctor-Patient video consultations directly on the platform.
- **Native Mobile App** built with React Native for push notifications.
- **Advanced Predictive AI** modeling for epidemiological tracking.
- **Kubernetes Helm Charts** for true microservices extraction and scaling.

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/shubhamkumar-git01/NexHeal/main/web/public/logo.jpg" alt="NexHeal Logo" width="50" style="border-radius: 50%; margin-top: 20px;" />
  <br/>
  <strong>Made with ❤️ for the future of healthcare.</strong>
</div>
