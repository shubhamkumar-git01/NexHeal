"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut,
  Bell,
  Sparkles
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!isMounted) return null; // Prevent hydration mismatch

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">NexHeal</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/dashboard" className="flex items-center px-3 py-2.5 bg-blue-50 text-blue-700 rounded-lg font-medium">
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/appointments" className="flex items-center px-3 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                <CalendarCheck className="w-5 h-5 mr-3 text-slate-500" />
                Appointments
              </Link>
            </li>
            <li>
              <Link href="/dashboard/patients" className="flex items-center px-3 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                <Users className="w-5 h-5 mr-3 text-slate-500" />
                My Patients
              </Link>
            </li>
            <li>
              <Link href="/dashboard/ai-assistant" className="flex items-center px-3 py-2.5 text-purple-700 hover:bg-purple-50 rounded-lg font-medium transition-colors mt-4 bg-purple-50/50 border border-purple-100">
                <Sparkles className="w-5 h-5 mr-3 text-purple-600" />
                AI Assistant <span className="ml-auto bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">PRO</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200">
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard/settings" className="flex items-center px-3 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                <Settings className="w-5 h-5 mr-3 text-slate-500" />
                Settings
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <h2 className="text-xl font-semibold text-slate-800">Overview</h2>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.charAt(0) || "D"}{user?.lastName?.charAt(0) || "R"}
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-medium text-slate-700">Dr. {user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase() || "Doctor"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
