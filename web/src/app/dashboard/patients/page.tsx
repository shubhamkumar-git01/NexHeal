"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Search, Filter, Plus, PhoneCall, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";

export default function PatientsPage() {
  const { user } = useAuth(false);
  const isDoctor = user?.role?.toLowerCase() !== 'patient';
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    // Instant mock data load
    setPatients([
      { id: "PT-001", name: "Rahul Sharma", age: 34, gender: "M", bloodGroup: "O+", lastVisit: "2026-10-12", status: "ACTIVE" },
      { id: "PT-002", name: "Priya Singh", age: 28, gender: "F", bloodGroup: "B+", lastVisit: "2026-09-28", status: "ACTIVE" },
      { id: "PT-003", name: "Amit Kumar", age: 45, gender: "M", bloodGroup: "A-", lastVisit: "2026-06-15", status: "INACTIVE" },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <DashboardLoading />;

  if (!isDoctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Users className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground mt-2 max-w-md">You do not have permission to view this page. This area is restricted to healthcare providers.</p>
        <Link href="/dashboard">
          <Button className="mt-6">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const filteredPatients = patients.filter(pt => {
    const matchesSearch = pt.name.toLowerCase().includes(search.toLowerCase()) || pt.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || pt.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-6xl mx-auto pb-12"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <Users className="w-6 h-6 mr-3 text-primary" />
            Patient Directory
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage assigned patients, view medical histories, and add consultation notes.</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <Button className="w-full sm:w-auto shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> Add Patient
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Search by name or ID (e.g. PT-001)..." 
            className="pl-10 bg-white dark:bg-[#09090b] shadow-sm border-slate-200 dark:border-slate-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All", "Active", "Inactive"].map((f) => (
            <Button 
              key={f} 
              variant={filter === f ? "default" : "outline"}
              size="sm"
              className="shrink-0 rounded-full"
              onClick={() => setFilter(f)}
            >
              {f === "All" && <Filter className="w-3 h-3 mr-2" />}
              {f}
            </Button>
          ))}
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#09090b] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
          <Users className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No patients found</h3>
          <p className="text-slate-500 text-sm mt-1 max-w-sm">
            We couldn't find any patients matching your search criteria.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPatients.map((pt) => (
            <Card key={pt.id} className="shadow-sm border-slate-200 dark:border-slate-800 hover:shadow-md transition-all group">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                      {pt.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{pt.name}</h3>
                      <p className="text-xs text-muted-foreground">{pt.id}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${pt.status === 'Active' ? 'text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30' : 'text-slate-600 bg-slate-100 dark:text-slate-400 dark:bg-slate-900/30'}`}>
                    {pt.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Age/Gender</p>
                    <p className="font-medium">{pt.age} yrs, {pt.gender.charAt(0)}</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Blood Group</p>
                    <p className="font-medium text-red-500">{pt.bloodGroup}</p>
                  </div>
                  <div className="col-span-2 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-md">
                    <p className="text-xs text-muted-foreground">Last Visit</p>
                    <p className="font-medium">{pt.lastVisit}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20">
                    <PhoneCall className="w-4 h-4 mr-2" /> Call
                  </Button>
                  <Link href={`/dashboard/patients/${pt.id}`} className="w-full">
                    <Button size="sm" className="w-full group-hover:bg-primary/90 transition-colors">
                      View Profile <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
