"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, Settings, LogOut } from "lucide-react";
import { ElementType } from "react";

interface NavItem {
  name: string;
  href: string;
  icon: ElementType;
  isAlert?: boolean;
}

interface SidebarProps {
  navItems: NavItem[];
  isMobile?: boolean;
}

export function Sidebar({ navItems, isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth(false);

  return (
    <aside className={`${isMobile ? 'w-full flex' : 'w-64 hidden md:flex'} bg-white dark:bg-[#09090b] border-r border-slate-200 dark:border-slate-800 flex-col transition-colors h-full`}>
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <Image src="/logo.jpg" alt="NexHeal Logo" width={28} height={28} className="rounded-md mr-3 object-cover shadow-sm" priority />
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
                  className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
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
            <Link 
              href="/dashboard/ai-assistant" 
              className="flex items-center justify-between px-3 py-2.5 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
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
            <Link 
              href="/dashboard/settings" 
              className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                pathname === '/dashboard/settings' 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50'
              }`}
            >
              <Settings className="w-5 h-5 mr-3 text-slate-500" />
              Settings
            </Link>
          </li>
          <li>
            <button 
              onClick={() => logout()}
              className="w-full flex items-center px-3 py-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
