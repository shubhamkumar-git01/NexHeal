import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarPlus, HeartPulse, FileText, UploadCloud, Users, Search, Bell, Video } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export function QuickActions() {
  const { user } = useAuth(false);
  const isDoctor = user?.role?.toLowerCase() !== 'patient';

  const patientActions = [
    { name: "Book Consult", icon: CalendarPlus, href: "/dashboard/appointments", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "Emergency SOS", icon: HeartPulse, href: "/dashboard/emergency", color: "bg-destructive/10 text-destructive dark:bg-destructive/20" },
    { name: "AI Assistant", icon: FileText, href: "/dashboard/ai-assistant", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
    { name: "Video Call", icon: Video, href: "/dashboard/appointments", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { name: "Find Doctor", icon: Search, href: "/dashboard/patients", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    { name: "Upload Record", icon: UploadCloud, href: "/dashboard/records", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
    { name: "Reminders", icon: Bell, href: "/dashboard/medicines", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  ];

  const doctorActions = [
    { name: "New Prescription", icon: FileText, href: "/dashboard/patients", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    { name: "AI Copilot", icon: FileText, href: "/dashboard/ai-assistant", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
    { name: "Video Call", icon: Video, href: "/dashboard/appointments", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { name: "Patient List", icon: Users, href: "/dashboard/patients", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
    { name: "Emergency Cases", icon: HeartPulse, href: "/dashboard/emergency", color: "bg-destructive/10 text-destructive dark:bg-destructive/20" },
    { name: "Review Records", icon: UploadCloud, href: "/dashboard/records", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400" },
    { name: "Schedule", icon: CalendarPlus, href: "/dashboard/appointments", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
    { name: "Reminders", icon: Bell, href: "/dashboard/settings", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" },
  ];

  const actions = isDoctor ? doctorActions : patientActions;

  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          {actions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link key={i} href={action.href} className="group flex flex-col items-center gap-2">
                <div className={`p-3 sm:p-4 rounded-2xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-md ${action.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">
                  {action.name}
                </span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
