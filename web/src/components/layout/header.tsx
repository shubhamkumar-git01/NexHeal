"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Siren, Check, Info, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";

interface HeaderProps {
  navItems: { name: string; href: string, icon: any, isAlert?: boolean }[];
}

export function Header({ navItems }: HeaderProps) {
  const pathname = usePathname();
  const { user } = useAuth(false);
  const title = navItems.find((n) => n.href === pathname)?.name || "Dashboard";
  
  // Real notification center mockup (pending backend integration)
  interface Notification {
    id: number;
    title: string;
    desc: string;
    time: string;
    read: boolean;
    priority: string;
  }
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Close sheet on route change
  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setNotifications([
        { id: 1, title: "New Appointment Request", desc: "Rahul Sharma wants to book a video call.", time: "5 mins ago", read: false, priority: "normal" },
        { id: 2, title: "Emergency Volunteer Needed", desc: "O+ Blood required at City Hospital.", time: "10 mins ago", read: false, priority: "high" },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <header className="h-16 bg-white dark:bg-[#09090b] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 shrink-0 transition-colors">
      <div className="flex items-center gap-3">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="md:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md">
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-slate-200 dark:border-r-slate-800">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            {/* We reuse the Sidebar but force it to display flex instead of hidden md:flex */}
            <div className="flex h-full w-full flex-col bg-white dark:bg-[#09090b]">
              <Sidebar navItems={navItems} isMobile />
            </div>
          </SheetContent>
        </Sheet>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">{title}</h2>
      </div>
      
      <div className="flex items-center space-x-2 sm:space-x-3">
        <ThemeToggle />
        
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="View notifications" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors relative outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background animate-pulse"></span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-h-[85vh] overflow-y-auto">
            <DropdownMenuLabel className="font-semibold flex justify-between items-center">
              <div className="flex items-center gap-2">
                Notifications 
                {unreadCount > 0 && <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400 px-2 py-0.5 rounded-full">{unreadCount} New</span>}
              </div>
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="text-xs font-normal text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <Check className="w-3 h-3" /> Mark all read
                </button>
              )}
            </DropdownMenuLabel>
            
            <div className="px-2 py-1 bg-amber-50 dark:bg-amber-950/30 border-y border-amber-100 dark:border-amber-900/50 flex items-start gap-2 mb-1">
              <Info className="w-3 h-3 text-amber-600 mt-0.5 shrink-0" />
              <p className="text-[10px] text-amber-700 dark:text-amber-500 leading-tight">Backend API unavailable. Displaying local simulated notifications.</p>
            </div>
            
            {loading ? (
              <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center space-y-2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p>Loading notifications...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center">
                <Bell className="w-8 h-8 text-muted-foreground/30 mb-2" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No new notifications.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className={`p-3 cursor-pointer items-start flex-col ${notif.read ? 'opacity-60' : 'bg-muted/30'}`} onClick={(e) => markAsRead(notif.id, e)}>
                  <div className="flex items-start w-full gap-3">
                    {notif.priority === 'high' ? (
                      <div className="mt-1 bg-destructive/10 p-1.5 rounded-full">
                        <Siren className="w-4 h-4 text-destructive" />
                      </div>
                    ) : (
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                        <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                    )}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <p className={`text-sm leading-none truncate ${notif.priority === 'high' ? 'text-destructive font-bold' : 'font-medium'}`}>
                        {notif.title}
                      </p>
                      <p className="text-sm text-muted-foreground break-words line-clamp-2">{notif.desc}</p>
                      <p className="text-[10px] text-muted-foreground font-medium">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-1.5"></div>}
                  </div>
                </DropdownMenuItem>
              ))
            )}
            
            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <div className="p-2 text-center text-sm text-primary font-medium cursor-pointer hover:underline">
                  View all notifications
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="flex items-center space-x-3 border-l border-border pl-4 ml-1" aria-label="User profile">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-background">
            {user?.firstName?.charAt(0) || "D"}{user?.lastName?.charAt(0) || "R"}
          </div>
          <div className="text-sm hidden sm:block">
            <p className="font-semibold text-slate-700 dark:text-slate-200 leading-tight">
              Dr. {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
              {user?.role?.toLowerCase() || "Doctor"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
