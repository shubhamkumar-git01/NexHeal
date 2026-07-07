"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarClock, UserPlus, HeartPulse, FileText, Bot } from "lucide-react";

import { motion } from "framer-motion";
import { authService } from "@/lib/auth";
import { UserProfile } from "@/lib/auth";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { AppointmentItem } from "@/components/dashboard/AppointmentItem";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { HealthInsights } from "@/components/dashboard/HealthInsights";
import { DashboardWidgets } from "@/components/dashboard/DashboardWidgets";

export function DoctorDashboard({ user, logout }: { user: UserProfile | null, logout: () => void }) {
  interface Appointment {
    patient: { firstName: string; lastName: string };
    type: string;
    date: string;
    status: string;
  }
  interface DashboardStats {
    totalPatients: number;
    appointmentsToday: number;
    revenue: number;
    upcomingAppointments: Appointment[];
  }
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = authService.getToken();
        if (!token) return;

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/dashboard/stats`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else if (res.status === 401 || res.status === 403) {
          console.warn("Session expired or unauthorized");
          logout();
        } else {
          console.error("Failed to fetch dashboard stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const data = stats || {
    totalPatients: 1240,
    appointmentsToday: 15,
    revenue: 45000,
    upcomingAppointments: []
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Module 1: Welcome Section */}
      <WelcomeSection user={user} />

      {/* Module 9: Dashboard Widgets (Weather, AQI, Status) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <DashboardWidgets />
      </motion.div>

      {/* Module 2: Quick Statistics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard title="Appointments" value={data.appointmentsToday} icon={CalendarClock} description="Scheduled today" highlightColor="primary" />
        <StatCard title="Total Patients" value={data.totalPatients} icon={Users} description="Active patients" />
        <StatCard title="Emergency Cases" value={2} icon={HeartPulse} description="Pending review" highlightText="Critical" highlightColor="destructive" />
        <StatCard title="Active AI Sessions" value={5} icon={Bot} description="Prescriptions drafting" highlightText="Real-time" highlightColor="success" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Module 3: Quick Actions */}
        <motion.div className="lg:col-span-1 h-full" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <QuickActions />
        </motion.div>

        {/* Module 8: Analytics */}
        <motion.div className="lg:col-span-2 h-full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
          <AnalyticsChart />
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Module 4 & 5: Schedule & Activity */}
        <motion.div className="lg:col-span-2 space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg">Today&apos;s Schedule & Patient Queue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {data.upcomingAppointments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground bg-muted/50 rounded-xl border border-dashed border-border">
                    No upcoming appointments found.
                  </div>
                ) : (
                  data.upcomingAppointments.map((apt: Appointment, i: number) => {
                    const aptDate = new Date(apt.date);
                    const timeString = aptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <AppointmentItem 
                        key={i}
                        patientInitial={apt.patient?.firstName?.charAt(0) || "P"}
                        patientName={`${apt.patient?.firstName} ${apt.patient?.lastName}`}
                        type={apt.type || "General Checkup"}
                        timeString={timeString}
                        status={apt.status}
                        onClick={() => console.log('Navigate to appointment')}
                      />
                    );
                  })
                )}
                {/* Dummy Patient Queue for UI population */}
                {data.upcomingAppointments.length === 0 && (
                   <AppointmentItem 
                      patientInitial="R"
                      patientName="Rahul Sharma"
                      type="Video Consult"
                      timeString="10:30 AM"
                      status="Confirmed"
                      onClick={() => {}}
                    />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Module 7: Health Insights & Notifications */}
        <motion.div className="space-y-6 lg:col-span-1 h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <HealthInsights />
          
          <Card className="shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-lg">Pending Reports</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <AlertCard 
                  title="Lab Results: Pending"
                  description="Awaiting blood report for patient 'Anil Verma'."
                  icon={FileText}
                  type="warning"
                  onClick={() => {}}
                />
                <AlertCard 
                  title="New Message"
                  description="Volunteer requested emergency supply restock."
                  icon={UserPlus}
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
