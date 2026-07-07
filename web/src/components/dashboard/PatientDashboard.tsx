import { UserProfile } from "@/lib/auth";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { DashboardWidgets } from "@/components/dashboard/DashboardWidgets";
import { StatCard } from "@/components/dashboard/StatCard";
import { AppointmentItem } from "@/components/dashboard/AppointmentItem";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { Pill, CalendarClock, HeartPulse, FileText, Sparkles, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function PatientDashboard({ user }: { user: UserProfile | null }) {
  // Dummy data for patient dashboard
  const data = {
    healthScore: 85,
    nextAppointment: "Today, 4:30 PM",
    activeMedicines: 3,
    reportsPending: 1,
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <WelcomeSection user={user} />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <DashboardWidgets />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Health Score" value={`${data.healthScore}/100`} icon={HeartPulse} description="Based on recent vitals" highlightColor="success" highlightText="Good" />
        <StatCard title="Next Consult" value={data.nextAppointment} icon={CalendarClock} description="Dr. Sharma (Cardio)" />
        <StatCard title="Active Medicines" value={data.activeMedicines} icon={Pill} description="2 doses remaining today" highlightColor="warning" highlightText="Action Needed" />
        <StatCard title="Pending Reports" value={data.reportsPending} icon={FileText} description="Blood work from 24th Oct" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Appointments & Medicines */}
        <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
              <Link href="/dashboard/appointments" className="text-sm text-primary hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <AppointmentItem 
                  patientInitial="D"
                  patientName="Dr. Anil Sharma"
                  type="Video Consult - Cardiology"
                  timeString="04:30 PM"
                  status="Confirmed"
                  onClick={() => {}}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg">Active Medicines</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <AlertCard 
                  title="Metformin (500mg)"
                  description="Take 1 pill after dinner. Next dose in 4 hours."
                  icon={Pill}
                  type="info"
                  onClick={() => {}}
                />
                <AlertCard 
                  title="Atorvastatin (20mg)"
                  description="Missed morning dose. Please take it as soon as possible."
                  icon={AlertTriangle}
                  type="destructive"
                  onClick={() => {}}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Suggestions & Reports */}
        <motion.div className="space-y-6 lg:col-span-1 h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          
          <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-background border-purple-100 dark:border-purple-900/50">
            <CardHeader className="pb-3 border-b border-purple-100/50 dark:border-purple-900/30">
              <CardTitle className="text-lg flex items-center text-purple-900 dark:text-purple-300">
                <Sparkles className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
                AI Health Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Based on your recent BP logs, consider reducing sodium intake today.
                </p>
                <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 p-2 rounded-md">
                  <strong>Notice:</strong> Detailed AI insights require backend sync (Currently Unavailable).
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg">Recent Reports</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <AlertCard 
                  title="Lipid Profile"
                  description="Ready to view. Uploaded on 24th Oct."
                  icon={FileText}
                  type="info"
                  onClick={() => {}}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
