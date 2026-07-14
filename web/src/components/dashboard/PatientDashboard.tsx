"use client";

import { useState, useEffect } from "react";
import { UserProfile } from "@/lib/auth";
import { fetchApi } from "@/lib/api";
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
  const [data, setData] = useState({
    healthScore: 85,
    nextAppointment: "Loading...",
    activeMedicines: 0,
    reportsPending: 0,
    timeline: [],
    recentAppointments: []
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await fetchApi("/api/v1/dashboard/patient");
        if (res.data) {
          setData({
            healthScore: 92, // Calculate from vitals later
            nextAppointment: res.data.upcomingAppointments?.length > 0 
              ? new Date(res.data.upcomingAppointments[0].date).toLocaleString() 
              : "No upcoming appointments",
            activeMedicines: res.data.timeline?.filter((e: any) => e.eventType === 'PRESCRIPTION').length || 0,
            reportsPending: res.data.timeline?.filter((e: any) => e.eventType === 'LAB_REPORT').length || 0,
            timeline: res.data.timeline || [],
            recentAppointments: res.data.upcomingAppointments || []
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, []);

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
        <StatCard title="Next Consult" value={data.nextAppointment} icon={CalendarClock} description="Tap to view details" />
        <StatCard title="Active Medicines" value={data.activeMedicines} icon={Pill} description="Currently prescribed" highlightColor="warning" highlightText="Action Needed" />
        <StatCard title="Pending Reports" value={data.reportsPending} icon={FileText} description="Recent lab results" />
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
                {data.recentAppointments.length > 0 ? (
                  data.recentAppointments.map((apt: any) => (
                    <AppointmentItem 
                      key={apt.id}
                      patientInitial="Dr"
                      patientName={`Dr. ${apt.doctor?.firstName || 'Assigned'}`}
                      type={`Consultation - ${apt.urgencyLevel}`}
                      timeString={new Date(apt.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      status={apt.status}
                      onClick={() => {}}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No upcoming appointments.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg">Medical Timeline</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                {data.timeline.length > 0 ? (
                  data.timeline.slice(0, 3).map((event: any) => (
                    <AlertCard 
                      key={event.id}
                      title={event.title}
                      description={event.description || "Medical event logged."}
                      icon={FileText}
                      type="info"
                      onClick={() => {}}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No recent timeline events.</p>
                )}
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
                NexHeal Copilot Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {data.recentAppointments.length > 0 
                    ? `You have an upcoming appointment. Consider reviewing your symptoms in the AI Assistant beforehand.`
                    : `Your health timeline is stable. Keep up the good work!`}
                </p>
                <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 p-2 rounded-md font-medium">
                  Use the Copilot tab for personalized analysis.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
