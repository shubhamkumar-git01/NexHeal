import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Activity, ShieldCheck, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Activity className="w-8 h-8 text-blue-600" />
          <span className="text-2xl font-extrabold text-blue-900 tracking-tight">NexHeal</span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline" className="font-semibold text-blue-600 border-blue-200 hover:bg-blue-50">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 font-semibold shadow-md">
              Register
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 mb-8 animate-fade-in-up">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
          AI-Powered Telemedicine Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mb-6">
          Healthcare of the future, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            accessible today.
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Connect with top doctors via secure WebRTC video calls, manage appointments, and get AI-assisted prescriptions instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/login">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all">
              Go to Dashboard <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mt-24">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
              <Activity className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">AI Prescriptions</h3>
            <p className="text-slate-500">Smart AI engine drafts medical prescriptions based on patient symptoms.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Secure Video Calls</h3>
            <p className="text-slate-500">Peer-to-peer WebRTC video consultations with zero latency.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
              <Clock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Smart Scheduling</h3>
            <p className="text-slate-500">Manage daily walk-ins and video appointments effortlessly.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
