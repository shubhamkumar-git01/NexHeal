"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  ArrowRight, HeartPulse, Activity, ShieldCheck, Siren, Sparkles, 
  Stethoscope, Users, Building2, CalendarCheck, FileText, Bot, 
  Phone, Mail, CheckCircle2, ChevronRight
} from "lucide-react";

export function LandingPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex flex-col font-sans overflow-x-hidden selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-400 dark:to-indigo-400">
            NexHeal
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">How it Works</a>
          <a href="#ai" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">AI Copilot</a>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:block">
            <Button variant="ghost" className="font-semibold">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 shadow-md shadow-blue-600/20 transition-all hover:shadow-lg hover:shadow-blue-600/30">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial="initial" animate="animate" variants={stagger}
        >
          <motion.div variants={fadeIn} className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-100 dark:border-blue-800 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            The Future of Enterprise Healthcare
          </motion.div>
          
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6">
            Intelligent Healthcare, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Zero Boundaries.
            </span>
          </motion.h1>
          
          <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Connect patients, doctors, hospitals, and emergency responders in a single, secure, AI-powered ecosystem designed for modern medical operations.
          </motion.p>
          
          <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 rounded-full text-lg shadow-xl shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 transition-all hover:-translate-y-1">
                Start for Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 rounded-full text-lg border-2">
                Explore Features
              </Button>
            </Link>
          </motion.div>
          
          <motion.div variants={fadeIn} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> HIPAA Ready</div>
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> 24/7 Support</div>
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> 99.9% Uptime</div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex-1 relative w-full h-[500px] lg:h-[600px] max-w-lg lg:max-w-none perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>

          {/* Center Main Dashboard Glass Card */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 10, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, rotateY: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="absolute top-[10%] left-[5%] right-[5%] bottom-[10%] bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/50 dark:border-slate-700/50 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 overflow-hidden z-10"
          >
            {/* Top Bar Mock */}
            <div className="flex items-center justify-between pb-4 border-b border-white/20 dark:border-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
                <div className="w-24 h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded-full"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80"></div>
                <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/80"></div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 flex gap-4">
              <div className="w-1/3 flex flex-col gap-4">
                <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-2xl p-4 flex flex-col justify-end relative overflow-hidden">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="w-full h-1/2 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-t-lg mt-auto relative">
                    <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M0,10 Q20,20 40,5 T60,15 T80,5 T100,10" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 bg-white/60 dark:bg-slate-800/60 rounded-2xl p-4"></div>
              </div>
              <div className="w-2/3 bg-white/60 dark:bg-slate-800/60 rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="w-3/4 h-6 bg-slate-200/80 dark:bg-slate-700/80 rounded-full mb-6"></div>
                <div className="space-y-3">
                  <div className="w-full h-12 bg-white/50 dark:bg-slate-700/50 rounded-xl"></div>
                  <div className="w-full h-12 bg-white/50 dark:bg-slate-700/50 rounded-xl"></div>
                  <div className="w-full h-12 bg-white/50 dark:bg-slate-700/50 rounded-xl"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 1: AI Copilot */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-10 top-[20%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-20 w-64 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">NexHeal AI</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Diagnosis Ready</p>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-700/50 p-2 rounded-lg text-[10px] text-slate-600 dark:text-slate-300">
              Analysis shows 98% probability of viral infection.
            </div>
          </motion.div>

          {/* Floating Element 2: Emergency Alert */}
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -right-8 bottom-[15%] bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl border border-red-100 dark:border-red-900/30 z-20 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-600 relative z-10">
                  <Siren className="w-6 h-6" />
                </div>
              </div>
              <div>
                <p className="text-xs text-red-500 font-bold tracking-wider">CRITICAL ALERT</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Ambulance Dispatched</p>
              </div>
            </div>
          </motion.div>

          {/* Floating Element 3: Doctor Appointment */}
          <motion.div 
            animate={{ y: [0, 10, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute right-4 top-[5%] bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-0 backdrop-blur-xl bg-opacity-80"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600">
                <CalendarCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Dr. Sharma</p>
                <p className="text-[10px] text-muted-foreground">Confirmed 10:30 AM</p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">120+</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wider">Hospitals</p>
              <p className="text-xs text-slate-400 mt-1">Partnered Institutions</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">5k+</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wider">Doctors</p>
              <p className="text-xs text-slate-400 mt-1">Verified Specialists</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">50k+</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wider">Patients</p>
              <p className="text-xs text-slate-400 mt-1">Active Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">10k+</h3>
              <p className="text-sm font-medium text-slate-500 mt-2 uppercase tracking-wider">Volunteers</p>
              <p className="text-xs text-slate-400 mt-1">Community Responders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Complete Ecosystem in One Platform</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            NexHeal replaces fragmented legacy systems with a unified, modern architecture tailored for every stakeholder.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Bot, title: "AI Copilot", desc: "Intelligent medical report summarization, prescription explanation, and clinical SOAP note drafting.", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
            { icon: Siren, title: "Emergency SOS", desc: "One-tap emergency alerts triggering a real-time command center for hospitals and nearby volunteers.", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
            { icon: Stethoscope, title: "Doctor Portal", desc: "Dedicated interfaces for patient management, instant prescriptions, and daily queue overviews.", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
            { icon: Users, title: "Patient Portal", desc: "Personalized dashboard for health scores, family members, upcoming appointments, and AI suggestions.", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
            { icon: FileText, title: "Electronic Health Records", desc: "Secure, timeline-based storage for prescriptions, lab reports, X-rays, and medical history.", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
            { icon: HeartPulse, title: "Volunteer Network", desc: "Verified community response network mapping blood donors and medical volunteers to live incidents.", color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
            { icon: CalendarCheck, title: "Smart Appointments", desc: "Frictionless scheduling connecting patients to specialized doctors and partnered hospitals.", color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
            { icon: ShieldCheck, title: "Admin Center", desc: "Role-Based Access Control, doctor verification workflows, and operational analytics.", color: "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300" },
            { icon: Building2, title: "Hospital Directory", desc: "Centralized management of hospital capacities, departments, and partner NGOs.", color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-900/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">How NexHeal Works</h2>
            <p className="text-lg text-slate-400">A seamless workflow connecting care seekers with care providers.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Join the Network", desc: "Register as a Patient, Doctor, or Volunteer. Complete identity and medical verification for privileged roles." },
              { step: "02", title: "Connect & Consult", desc: "Book appointments, access electronic health records, and use the AI Copilot to understand your health." },
              { step: "03", title: "Emergency Response", desc: "Trigger SOS alerts to instantly dispatch nearby volunteers and notify partner hospitals." },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-white/5 mb-4">{item.step}</div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                {idx < 2 && <ChevronRight className="hidden md:block absolute top-12 -right-8 w-8 h-8 text-slate-700" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI & Emergency Showcase */}
      <section id="ai" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-purple-700 bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-100 dark:border-purple-800 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Copilot
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Personal Health Assistant</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              NexHeal AI acts as an intelligent companion. It explains complex medical jargon, summarizes lab reports, checks symptoms, and drafts clinical notes for doctors.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Explain Prescriptions & Dosages</li>
              <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Pre-consultation Symptom Checker</li>
              <li className="flex items-center text-slate-700 dark:text-slate-300"><CheckCircle2 className="w-5 h-5 mr-3 text-purple-500" /> Automated SOAP Note Drafting</li>
            </ul>
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50">
              <p className="text-sm text-amber-800 dark:text-amber-500 font-medium">
                Disclaimer: NexHeal AI provides informational support only and does not replace qualified healthcare professionals.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
             {/* Mock Chat UI */}
             <div className="bg-white dark:bg-[#09090b] rounded-2xl p-4 shadow-sm h-96 flex flex-col justify-end gap-4 border border-slate-200 dark:border-slate-800">
               <div className="flex gap-3 justify-end">
                 <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm max-w-[80%]">
                   Can you explain my recent CBC report?
                 </div>
               </div>
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                   <Bot className="w-4 h-4 text-purple-600" />
                 </div>
                 <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-slate-700 dark:text-slate-300 w-full">
                   Based on your CBC report, your Hemoglobin is slightly low at 11.2 g/dL. I recommend discussing iron-rich foods or supplements with Dr. Sharma during your next visit. <br/><br/>*Note: This is an informational summary, not a diagnosis.*
                 </div>
               </div>
               <div className="relative mt-2">
                 <Input className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-xl pr-12" placeholder="Ask NexHeal AI..." />
                 <Button size="icon" className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-blue-600"><ArrowRight className="w-4 h-4"/></Button>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 dark:bg-[#09090b] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-16">Trusted by Healthcare Professionals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 text-left">
                <div className="flex text-amber-400 mb-4">
                  {"★★★★★"}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic mb-6">
                  "NexHeal has transformed how our clinic operates. The AI Copilot saves me 2 hours a day on drafting notes."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
                  <div>
                    <h4 className="font-bold">Featured Specialist</h4>
                    <p className="text-sm text-slate-500">Chief Medical Officer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 relative z-10">Ready to transform healthcare?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
            Join thousands of patients, doctors, and volunteers on the NexHeal network today.
          </p>
          <Link href="/register" className="relative z-10">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-50 h-14 px-10 rounded-full text-lg font-bold shadow-xl">
              Create an Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#09090b] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <HeartPulse className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold tracking-tight">NexHeal</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              Intelligent healthcare ecosystem connecting patients, doctors, and emergency responders.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Mail className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
              <Phone className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#ai" className="hover:text-blue-600 transition-colors">AI Copilot</a></li>
              <li><Link href="/login" className="hover:text-blue-600 transition-colors">Patient Portal</Link></li>
              <li><Link href="/login" className="hover:text-blue-600 transition-colors">Doctor Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Contact</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><Link href="#" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-600">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600">HIPAA Compliance</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 NexHeal Inc. All rights reserved.</p>
          <div className="text-sm text-slate-400">v0.1.0 • Platform Status: <span className="text-emerald-500 font-medium">All Systems Operational</span></div>
        </div>
      </footer>
    </div>
  );
}
