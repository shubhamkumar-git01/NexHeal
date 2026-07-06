"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  Settings, 
  LogOut,
  Bell,
  Sparkles,
  HeartHandshake,
  Siren,
  FileText
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/dashboard/appointments", icon: CalendarCheck },
    { name: "My Patients", href: "/dashboard/patients", icon: Users },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: HeartHandshake },
    { name: "Emergency", href: "/dashboard/emergency", icon: Siren, isAlert: true },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#09090b] overflow-hidden transition-colors">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#09090b] border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col transition-colors">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <img src="/logo.jpg" alt="NexHeal Logo" className="h-7 w-7 rounded-md mr-3 object-cover shadow-sm" />
          <h1 className="text-xl font-extrabold text-blue-700 dark:text-blue-500 tracking-tight">NexHeal</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <ul className="space-y-1.5 px-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' 
                        : item.isAlert 
                          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
                          : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${isActive ? '' : item.isAlert ? '' : 'text-slate-400 dark:text-slate-500'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
            
            <li>
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-4 mx-2"></div>
            </li>
            
            <li>
              <Link href="/dashboard/ai-assistant" className="flex items-center justify-between px-3 py-2.5 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30">
                <div className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-3 text-purple-600 dark:text-purple-400" />
                  AI Assistant
                </div>
                <span className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">PRO</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#09090b]">
          <ul className="space-y-1">
            <li>
              <Link href="/dashboard/settings" className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors ${pathname === '/dashboard/settings' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'}`}>
                <Settings className="w-5 h-5 mr-3 text-slate-500" />
                Settings
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-50 dark:bg-black transition-colors">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-[#09090b] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0 transition-colors">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
            {navItems.find(n => n.href === pathname)?.name || 'Dashboard'}
          </h2>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative outline-none">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#09090b]"></span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 dark:bg-slate-900 dark:border-slate-800">
                <DropdownMenuLabel className="font-semibold flex justify-between items-center">
                  Notifications <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">2 New</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <DropdownMenuItem className="p-3 cursor-pointer dark:hover:bg-slate-800">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">New Appointment Request</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Rahul Sharma wants to book a video call.</p>
                    <p className="text-xs text-slate-400">5 mins ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer dark:hover:bg-slate-800">
                  <div className="space-y-1 flex items-start">
                    <Siren className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-600 dark:text-red-400 leading-none">Emergency Volunteer Needed</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">O+ Blood required at City Hospital.</p>
                      <p className="text-xs text-slate-400 mt-1">10 mins ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <div className="p-2 text-center text-sm text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                  View all notifications
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center space-x-3 border-l border-slate-200 dark:border-slate-800 pl-4 ml-1">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white dark:ring-[#09090b]">
                {user?.firstName?.charAt(0) || "D"}{user?.lastName?.charAt(0) || "R"}
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-semibold text-slate-700 dark:text-slate-200 leading-tight">Dr. {user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.role?.toLowerCase() || "Doctor"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide relative">
          {children}
        </main>
      </div>
    </div>
  );
}
