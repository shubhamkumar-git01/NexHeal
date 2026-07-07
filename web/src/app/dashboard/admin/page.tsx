"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Users, Activity, BarChart3, Settings, AlertTriangle, Ambulance, Bed, HeartPulse, Pill, TestTube2, Stethoscope as OT, Server, BrainCircuit, Globe, RefreshCcw, Download, Building2, Clock, History, Percent } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";
import { cn } from "@/lib/utils";

// Reusable Charts
import { LineChartCard } from "@/components/ui/charts/LineChartCard";
import { BarChartCard } from "@/components/ui/charts/BarChartCard";
import { PieChartCard } from "@/components/ui/charts/PieChartCard";
import { AreaChartCard } from "@/components/ui/charts/AreaChartCard";

export default function AdminPortalPage() {
  const { user, isLoading: authLoading } = useAuth(false);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Healthcare");
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const isAdmin = user?.role?.toLowerCase() === 'admin' || user?.role?.toLowerCase() === 'super admin' || user?.role?.toLowerCase() === 'hospital_admin';

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchAnalytics(activeTab);
    }
  }, [isAdmin, activeTab]);

  const fetchAnalytics = async (tab: string) => {
    setLoading(true);
    try {
      const endpointMap: Record<string, string> = {
        "Healthcare": "healthcare",
        "Emergency": "emergency",
        "Community": "community",
        "ERP": "erp",
        "AI": "ai",
        "Infrastructure": "infrastructure"
      };
      
      const res = await fetch(`http://localhost:5000/api/v1/analytics/${endpointMap[tab]}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setAnalyticsData(data);
    } catch (e) {
      console.error("Failed to fetch analytics", e);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async (format: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/analytics/export`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ type: activeTab, format, filters: {} })
      });
      const data = await res.json();
      alert(data.message || "Export initiated");
    } catch (e) {
      alert("Failed to export report");
    }
  };

  if (authLoading || !isAdmin) return <DashboardLoading />;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 dark:bg-slate-950 p-6 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight flex items-center text-white">
            <Globe className="w-8 h-8 mr-3 text-primary" />
            Global Command Center
          </h1>
          <p className="text-slate-400 mt-1 text-sm max-w-xl">
            Enterprise analytics, predictive intelligence, and operational health monitoring across all NexHeal modules.
          </p>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <Button variant="outline" size="sm" onClick={() => fetchAnalytics(activeTab)} className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
            <RefreshCcw className="w-4 h-4 mr-2" /> Refresh
          </Button>
          <Button variant="default" size="sm" onClick={() => handleExport('PDF')} className="bg-primary hover:bg-primary/90 text-white">
            <Download className="w-4 h-4 mr-2" /> Export Report
          </Button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-200 dark:border-slate-800">
        {["Healthcare", "Emergency", "Community", "ERP", "AI", "Infrastructure"].map(tab => (
          <Button 
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"} 
            size="sm" 
            className={`rounded-full shrink-0 ${activeTab === tab ? '' : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "Healthcare" && <HeartPulse className="w-4 h-4 mr-2" />}
            {tab === "Emergency" && <Ambulance className="w-4 h-4 mr-2" />}
            {tab === "Community" && <Users className="w-4 h-4 mr-2" />}
            {tab === "ERP" && <Building2 className="w-4 h-4 mr-2" />}
            {tab === "AI" && <BrainCircuit className="w-4 h-4 mr-2" />}
            {tab === "Infrastructure" && <Server className="w-4 h-4 mr-2" />}
            {tab}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <RefreshCcw className="w-8 h-8 animate-spin text-primary opacity-50" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* KPI Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {analyticsData?.kpis && Object.entries(analyticsData.kpis).map(([key, data]: [string, any]) => (
              <Card key={key}>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold flex items-baseline gap-1">
                    {data.total}
                    {data.unit && <span className="text-sm font-normal text-muted-foreground">{data.unit}</span>}
                  </p>
                  {data.growth !== undefined && (
                    <p className={`text-xs mt-1 font-medium ${data.growth >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {data.growth >= 0 ? '+' : ''}{data.growth}% vs last period
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {activeTab === "Healthcare" && analyticsData?.patientGrowth && (
              <>
                <AreaChartCard 
                  title="Patient Growth" 
                  description="Monthly active patients over time"
                  data={analyticsData.patientGrowth} 
                  xAxisKey="month" 
                  areas={[{ key: "patients", name: "Patients" }]} 
                />
                <BarChartCard 
                  title="OPD Utilization" 
                  description="Visits by department"
                  data={analyticsData.opdAnalytics} 
                  xAxisKey="department" 
                  bars={[{ key: "visits", name: "Visits" }]} 
                />
              </>
            )}

            {activeTab === "Emergency" && analyticsData?.responseTimes && (
              <>
                <LineChartCard 
                  title="Average Response Time by Zone" 
                  data={analyticsData.responseTimes} 
                  xAxisKey="zone" 
                  lines={[{ key: "time", name: "Response Time (mins)" }]} 
                />
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                  <CardHeader><CardTitle className="text-lg">Incident Heatmap</CardTitle></CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                      <p className="text-muted-foreground text-sm flex items-center"><Globe className="w-4 h-4 mr-2"/> Map visualization requires Google Maps API</p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "Community" && analyticsData?.volunteerTrends && (
              <>
                <LineChartCard 
                  title="Active Volunteers" 
                  data={analyticsData.volunteerTrends} 
                  xAxisKey="month" 
                  lines={[{ key: "active", name: "Volunteers" }]} 
                />
              </>
            )}

            {activeTab === "AI" && analyticsData?.providerUsage && (
              <>
                <PieChartCard 
                  title="Token Usage by Provider" 
                  data={analyticsData.providerUsage.map((p: any) => ({ name: p.provider, value: p.tokens }))}
                  innerRadius={60}
                />
              </>
            )}

            {activeTab === "ERP" && (
              <div className="lg:col-span-2">
                 <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                  <CardHeader><CardTitle className="text-lg flex items-center"><AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Operational Alerts</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">ERP detailed charts are rendering...</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
