"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { 
  LayoutDashboard, 
  Users, 
  CalendarCheck, 
  HeartHandshake,
  Siren,
  FileText,
  Pill,
  UserCircle,
  ShieldAlert
} from "lucide-react";

const getNavItems = (role: string = 'doctor') => {
  const isPatient = role.toLowerCase() === 'patient';
  const isAdmin = role.toLowerCase() === 'admin' || role.toLowerCase() === 'super admin';
  
  if (isPatient) {
    return [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "My Appointments", href: "/dashboard/appointments", icon: CalendarCheck },
      { name: "Medical Records", href: "/dashboard/records", icon: FileText },
      { name: "Medicines", href: "/dashboard/medicines", icon: Pill },
      { name: "Emergency", href: "/dashboard/emergency", icon: Siren, isAlert: true },
      { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
    ];
  }
  
  const items = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/dashboard/appointments", icon: CalendarCheck },
    { name: "My Patients", href: "/dashboard/patients", icon: Users },
    { name: "Medical Records", href: "/dashboard/records", icon: FileText },
    { name: "Volunteers", href: "/dashboard/volunteers", icon: HeartHandshake },
    { name: "Emergency", href: "/dashboard/emergency", icon: Siren, isAlert: true },
  ];

  if (isAdmin) {
    items.push({ name: "Admin Portal", href: "/dashboard/admin", icon: ShieldAlert });
  }

  return items;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth(true);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-muted-foreground font-medium animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  const navItems = getNavItems(user?.role);

  return (
    <div className="flex h-screen bg-background overflow-hidden transition-colors">
      <Sidebar navItems={navItems} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-background transition-colors">
        <Header navItems={navItems} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide relative">
          {children}
        </main>
      </div>
    </div>
  );
}
