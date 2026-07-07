"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldAlert, Users, Building2, Stethoscope, HeartHandshake, 
  Activity, BarChart3, Settings, AlertTriangle, ShieldCheck, 
  CheckCircle2, XCircle, Search, FileText, Server
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";
import { cn } from "@/lib/utils";

export default function AdminPortalPage() {
  const { user, isLoading: authLoading } = useAuth(false);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [searchQuery, setSearchQuery] = useState("");

  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'super admin';

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      setTimeout(() => setLoading(false), 800);
    }
  }, [isAdmin]);

  if (authLoading || loading || !isAdmin) return <DashboardLoading />;

  const unverifiedDoctors = [
    { id: "DOC-092", name: "Dr. Ananya Sharma", spec: "Cardiology", hospital: "Apollo Center", exp: "12 Yrs", status: "Pending License" },
    { id: "DOC-093", name: "Dr. Rajesh Kumar", spec: "Neurology", hospital: "Fortis", exp: "8 Yrs", status: "Awaiting Background Check" },
  ];

  const systemAlerts = [
    { id: 1, type: "critical", message: "Database CPU utilization at 85%", time: "5 mins ago" },
    { id: 2, type: "warning", message: "23 Pending SOS alerts in North Zone", time: "12 mins ago" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center text-indigo-900 dark:text-indigo-100">
            <ShieldAlert className="w-8 h-8 mr-3 text-indigo-600 dark:text-indigo-400" />
            Operations Command Center
          </h1>
          <p className="text-indigo-700/70 dark:text-indigo-300/70 mt-1 text-sm">
            Platform administration, system health, and verification workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded">
            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            System Healthy
          </span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Button variant={activeTab === "Overview" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Overview")}>
          <Activity className="w-4 h-4 mr-2" /> Overview
        </Button>
        <Button variant={activeTab === "Users" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Users")}>
          <Users className="w-4 h-4 mr-2" /> Users
        </Button>
        <Button variant={activeTab === "Doctors" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Doctors")}>
          <Stethoscope className="w-4 h-4 mr-2" /> Doctor Verification
        </Button>
        <Button variant={activeTab === "Hospitals" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Hospitals")}>
          <Building2 className="w-4 h-4 mr-2" /> Hospitals
        </Button>
        <Button variant={activeTab === "Analytics" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Analytics")}>
          <BarChart3 className="w-4 h-4 mr-2" /> Analytics
        </Button>
        <Button variant={activeTab === "Settings" ? "default" : "outline"} size="sm" className="rounded-full shrink-0" onClick={() => setActiveTab("Settings")}>
          <Settings className="w-4 h-4 mr-2" /> Settings
        </Button>
      </div>

      {activeTab === "Overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center"><Users className="w-3 h-3 mr-1"/> Total Users</p>
                <p className="text-2xl font-bold">14,209</p>
                <p className="text-xs text-emerald-600 mt-1">+124 this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center"><Stethoscope className="w-3 h-3 mr-1"/> Verified Docs</p>
                <p className="text-2xl font-bold text-blue-600">842</p>
                <p className="text-xs text-amber-600 mt-1">12 pending verification</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center"><HeartHandshake className="w-3 h-3 mr-1"/> Volunteers</p>
                <p className="text-2xl font-bold text-emerald-600">3,490</p>
                <p className="text-xs text-emerald-600 mt-1">680 active today</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950/10 border-red-100 dark:border-red-900/30">
              <CardContent className="p-4">
                <p className="text-xs text-red-600/70 dark:text-red-400 uppercase font-bold tracking-wider mb-1 flex items-center"><ShieldAlert className="w-3 h-3 mr-1"/> Active SOS</p>
                <p className="text-2xl font-bold text-red-600">24</p>
                <p className="text-xs text-red-600 mt-1">Require immediate action</p>
              </CardContent>
            </Card>
            <Card className="hidden lg:block">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center"><Server className="w-3 h-3 mr-1"/> AI Usage</p>
                <p className="text-2xl font-bold text-purple-600">42.5k</p>
                <p className="text-xs text-purple-600 mt-1">Tokens today</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Critical System Alerts</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 border-b last:border-0 flex items-start gap-3">
                    <div className={cn("mt-0.5 w-2 h-2 rounded-full shrink-0", alert.type === 'critical' ? 'bg-red-500' : 'bg-amber-500')} />
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg flex items-center"><Activity className="w-5 h-5 mr-2 text-primary" /> Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">API Latency (Global)</span>
                    <span className="text-emerald-600">42ms</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Database Load</span>
                    <span className="text-amber-600">68%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">WebSocket Connections</span>
                    <span className="text-blue-600">1,204 Active</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "Doctors" && (
        <Card>
          <CardHeader>
            <CardTitle>Doctor Verification Queue</CardTitle>
            <CardDescription>Review and approve doctor licenses to enable clinical features.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Doctor Name</th>
                    <th className="px-6 py-3 font-medium">Specialization</th>
                    <th className="px-6 py-3 font-medium">Hospital</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {unverifiedDoctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20">
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                        {doc.name}
                        <div className="text-xs text-muted-foreground">{doc.id}</div>
                      </td>
                      <td className="px-6 py-4">{doc.spec}</td>
                      <td className="px-6 py-4">{doc.hospital}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30">
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <Button size="sm" variant="outline" className="h-8">Review Docs</Button>
                        <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Users" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage Patients, Doctors, Hospitals, and Volunteers.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-9 h-9" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
              <Users className="w-12 h-12 mb-3 opacity-20" />
              <p>Select a user type to view directory.</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">Patients</Button>
                <Button variant="outline" size="sm">Doctors</Button>
                <Button variant="outline" size="sm">Volunteers</Button>
                <Button variant="outline" size="sm">Admins</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Hospitals" && (
        <Card>
          <CardHeader>
            <CardTitle>Hospital Directory</CardTitle>
            <CardDescription>Manage partnered hospitals and emergency capacities.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
              <Building2 className="w-12 h-12 mb-3 opacity-20" />
              <p>Hospital management view pending backend integration.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Analytics" && (
        <Card>
          <CardHeader>
            <CardTitle>Platform Analytics</CardTitle>
            <CardDescription>Growth and operational metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed rounded-lg border-slate-200 dark:border-slate-800">
              <BarChart3 className="w-12 h-12 mb-3 opacity-20" />
              <p>Analytics reports require telemetry backend.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "Settings" && (
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>Global platform configurations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div>
                <p className="font-semibold">Maintenance Mode</p>
                <p className="text-sm text-muted-foreground">Disables logins for all non-admin users.</p>
              </div>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">Enable</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <div>
                <p className="font-semibold">Audit Logs Export</p>
                <p className="text-sm text-muted-foreground">Download security and action logs for the last 30 days.</p>
              </div>
              <Button variant="outline"><FileText className="w-4 h-4 mr-2" /> Export CSV</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
