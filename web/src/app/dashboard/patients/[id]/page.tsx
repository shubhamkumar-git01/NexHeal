"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, UserCircle, FileText, FileSignature, Save, Clock, Download, Printer, Activity, Syringe, HeartPulse } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../../loading";
import { useParams } from "next/navigation";
import { RecordCard } from "@/components/dashboard/RecordCard";
import { Search, Filter, FileArchive } from "lucide-react";

export default function PatientDetailsPage() {
  const { user } = useAuth(false);
  const isDoctor = user?.role?.toLowerCase() !== 'patient';
  const { id } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    // Instant fetch
    setRecords([
      { id: "REC-1", type: "Blood Report", date: "Oct 12, 2026", size: "1.2 MB", uploadedBy: "City Lab" },
      { id: "REC-2", type: "MRI Scan", date: "Sep 28, 2026", size: "14.5 MB", uploadedBy: "Dr. Sharma" },
    ]);
    setLoading(false);
  }, []);

  if (loading) return <DashboardLoading />;

  if (!isDoctor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <Link href="/dashboard"><Button className="mt-4">Return</Button></Link>
      </div>
    );
  }

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.type.toLowerCase().includes(search.toLowerCase()) || record.uploadedBy.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "All" || record.type.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-6xl mx-auto pb-12"
    >
      <div className="flex items-center gap-4 mb-2">
        <Link href="/dashboard/patients">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            Rahul Sharma <span className="text-sm font-normal text-muted-foreground ml-3 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{id}</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">34 yrs • Male • O+ Blood Group</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-2">
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Overview" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Overview")}>
            <UserCircle className="w-4 h-4 mr-2" /> Overview
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Medical Timeline" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Medical Timeline")}>
            <Clock className="w-4 h-4 mr-2" /> Medical Timeline
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Medications" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Medications")}>
            <FileSignature className="w-4 h-4 mr-2" /> Medications & Rx
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Lab Reports" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Lab Reports")}>
            <FileArchive className="w-4 h-4 mr-2" /> Labs & Imaging
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Vaccinations" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Vaccinations")}>
            <Syringe className="w-4 h-4 mr-2" /> Vaccinations
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Family History" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Family History")}>
            <HeartPulse className="w-4 h-4 mr-2" /> Family History
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Consultation Notes" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Consultation Notes")}>
            <FileText className="w-4 h-4 mr-2" /> SOAP Notes
          </Button>
        </div>

        <div className="md:col-span-3 space-y-6">
          {activeTab === "Overview" && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="shadow-sm border-slate-200 dark:border-slate-800 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Conditions & Allergies</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Chronic Diseases</p>
                    <p className="font-medium text-sm">Hypertension, Type 2 Diabetes</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Allergies</p>
                    <p className="font-medium text-sm text-red-500">Penicillin, Peanuts</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200 dark:border-slate-800 md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Vitals History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                    <span className="text-muted-foreground text-sm">Height / Weight</span>
                    <span className="font-medium text-sm">175 cm / 72 kg (BMI: 23.5)</span>
                  </div>
                  <div className="flex justify-between border-b pb-2 dark:border-slate-800">
                    <span className="text-muted-foreground text-sm">Blood Pressure</span>
                    <span className="font-medium text-sm text-amber-600">130/85 mmHg</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-muted-foreground text-sm">Heart Rate</span>
                    <span className="font-medium text-sm">78 bpm</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "Consultation Notes" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">New SOAP Note</CardTitle>
                <Button size="sm"><Save className="w-4 h-4 mr-2" /> Save Note</Button>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Subjective</label>
                  <Textarea placeholder="Patient's chief complaints..." className="resize-none h-20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Objective</label>
                  <Textarea placeholder="Clinical observations and vitals..." className="resize-none h-20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessment (Diagnosis)</label>
                  <Input placeholder="Primary diagnosis..." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Plan</label>
                  <Textarea placeholder="Treatment plan and follow-up..." className="resize-none h-20" />
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "Medications" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Medications & Prescriptions</CardTitle>
                <Button size="sm"><FileSignature className="w-4 h-4 mr-2" /> New Prescription</Button>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold">Active Medications</h4>
                      <p className="text-sm text-muted-foreground">Prescribed on 12 Oct 2026</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="w-8 h-8"><Printer className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon" className="w-8 h-8"><Download className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                    <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                      <span className="font-medium">1. Metformin 500mg</span>
                      <span className="text-muted-foreground">1-0-1 (After meals) x 15 days</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-medium">2. Vitamin D3 60K</span>
                      <span className="text-muted-foreground">1 per week x 4 weeks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "Medical Timeline" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle>Longitudinal Health Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] bg-blue-500 text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                      <span className="text-xs font-bold text-blue-500">Today, 10:30 AM</span>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-1">Lab Results Uploaded</h3>
                      <p className="text-sm text-slate-500 mt-1">CBC and Lipid Profile results are available.</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                      <span className="text-xs font-bold text-primary">12 Oct 2026</span>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-1">Consultation with Dr. Sharma</h3>
                      <p className="text-sm text-slate-500 mt-1">Diagnosed with mild hypertension. Medication prescribed.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "Lab Reports" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Labs & Imaging</CardTitle>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline"><FileArchive className="w-4 h-4 mr-2" /> New Lab Order</Button>
                  <Button size="sm"><FileArchive className="w-4 h-4 mr-2" /> Upload File</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="Search reports or DICOM..." 
                      className="pl-10"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {["All", "Blood Report", "MRI Scan"].map((type) => (
                      <Button 
                        key={type} 
                        variant={filterType === type ? "default" : "outline"}
                        size="sm"
                        className="shrink-0 rounded-full"
                        onClick={() => setFilterType(type)}
                      >
                        {type === "All" && <Filter className="w-3 h-3 mr-2" />}
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 mt-4">
                  {filteredRecords.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground border border-dashed rounded-xl">No reports found.</div>
                  ) : (
                    filteredRecords.map((record, idx) => (
                      <RecordCard
                        key={record.id}
                        id={record.id}
                        type={record.type}
                        date={record.date}
                        size={record.size}
                        uploadedBy={record.uploadedBy}
                        idx={idx}
                        canDelete={true}
                      />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "Vaccinations" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Vaccination History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <div>
                      <h4 className="font-semibold">COVID-19 (Pfizer)</h4>
                      <p className="text-sm text-muted-foreground">Dose 2 - Administered by City Hospital</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">Jan 12, 2022</p>
                      <p className="text-xs text-emerald-600 font-medium">Completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "Family History" && (
            <Card className="shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="text-lg">Family Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg bg-slate-50 dark:bg-slate-900/50">
                    <div>
                      <h4 className="font-semibold">Father</h4>
                      <p className="text-sm text-muted-foreground">Condition: Type 2 Diabetes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Diagnosed at age 50</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
}
