"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarClock, TrendingUp, Activity } from "lucide-react";
import DashboardLoading from "./loading";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${API_URL}/api/dashboard/stats`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          console.error("Failed to fetch dashboard stats");
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [router]);

  if (loading) {
    return <DashboardLoading />;
  }

  // Fallback to empty if stats failed to load completely
  const data = stats || {
    totalPatients: 0,
    appointmentsToday: 0,
    revenue: 0,
    upcomingAppointments: []
  };

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPatients}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-500 font-medium">Active patients</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
            <CalendarClock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.appointmentsToday}</div>
            <p className="text-xs text-slate-500 mt-1">
              Scheduled for today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (Monthly)</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{data.revenue.toLocaleString()}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-500 font-medium">Estimated</span> based on completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Accuracy Score</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-slate-500 mt-1">
              Symptom prediction accuracy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  No upcoming appointments found.
                </div>
              ) : (
                data.upcomingAppointments.map((apt: any, i: number) => {
                  // Format time safely
                  const aptDate = new Date(apt.date);
                  const timeString = aptDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  
                  return (
                    <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                          {apt.patient?.firstName?.charAt(0) || "P"}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{apt.patient?.firstName} {apt.patient?.lastName}</p>
                          <p className="text-sm text-slate-500">{apt.type || "General Checkup"}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-700">{timeString}</p>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${apt.status === 'PENDING' || apt.status === 'Waiting' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Patient Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Dummy alerts for visual context as AI integration expands */}
              <div className="flex p-4 bg-red-50 rounded-lg border border-red-100">
                <Activity className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-red-800">High Blood Pressure</h4>
                  <p className="text-sm text-red-600 mt-1">Patient 'Anil Verma' reported BP 150/95 via AI symptom checker.</p>
                </div>
              </div>
              <div className="flex p-4 bg-amber-50 rounded-lg border border-amber-100">
                <Activity className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800">Missed Medication</h4>
                  <p className="text-sm text-amber-600 mt-1">Sunita Devi missed her morning dosage (Diabetes Type 2).</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
