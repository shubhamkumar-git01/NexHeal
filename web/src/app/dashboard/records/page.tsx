"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileArchive, Search, Filter, Printer } from "lucide-react";
import { RecordCard } from "@/components/dashboard/RecordCard";
import DashboardLoading from "../loading";

export default function RecordsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Lab Reports");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  interface MedicalRecord {
    id: string;
    type: string;
    date: string;
    size: string;
    uploadedBy: string;
  }
  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setRecords([
        { id: "REC-1", type: "Blood Report", date: "Oct 12, 2026", size: "1.2 MB", uploadedBy: "City Lab" },
        { id: "REC-2", type: "MRI Scan", date: "Sep 28, 2026", size: "14.5 MB", uploadedBy: "Dr. Sharma" },
        { id: "REC-3", type: "Prescription", date: "Sep 15, 2026", size: "450 KB", uploadedBy: "Dr. Smith" },
        { id: "REC-4", type: "Vaccination", date: "Aug 10, 2026", size: "200 KB", uploadedBy: "City Clinic" },
        { id: "REC-5", type: "X-ray", date: "Jul 05, 2026", size: "8.1 MB", uploadedBy: "City Lab" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <DashboardLoading />;

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <FileArchive className="w-6 h-6 mr-3 text-primary" />
            Medical Records
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and access your medical history, prescriptions, and lab reports securely.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" className="shadow-sm border-slate-200 dark:border-slate-700 w-full sm:w-auto">
            <Printer className="w-4 h-4 mr-2" /> Print All
          </Button>
          <Button className="shadow-sm w-full sm:w-auto">
            <Upload className="w-4 h-4 mr-2" /> Upload
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation for EHR */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Overview" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Overview")}>
            <FileArchive className="w-4 h-4 mr-2" /> Health Overview
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Timeline" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Timeline")}>
            <FileArchive className="w-4 h-4 mr-2" /> Medical Timeline
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Lab Reports" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Lab Reports")}>
            <FileArchive className="w-4 h-4 mr-2" /> Lab Reports & Files
          </Button>
          <Button variant="ghost" className={`w-full justify-start ${activeTab === "Prescriptions" ? "text-primary bg-primary/5" : "text-muted-foreground"}`} onClick={() => setActiveTab("Prescriptions")}>
            <FileArchive className="w-4 h-4 mr-2" /> Prescriptions
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "Overview" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Conditions & Allergies</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Chronic Diseases</p>
                    <p className="font-medium text-sm">Hypertension, Type 2 Diabetes</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Allergies</p>
                    <p className="font-medium text-sm text-red-500">Penicillin, Peanuts</p>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Current Medications</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-sm border-b pb-2 dark:border-slate-800">
                    <span className="font-medium text-blue-700 dark:text-blue-400">Metformin 500mg</span>
                    <span className="text-muted-foreground">1-0-1</span>
                  </li>
                  <li className="flex justify-between items-center text-sm border-b pb-2 dark:border-slate-800">
                    <span className="font-medium text-blue-700 dark:text-blue-400">Lisinopril 10mg</span>
                    <span className="text-muted-foreground">1-0-0</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm md:col-span-2">
                <h3 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">Medical History & Surgeries</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Past Surgeries</p>
                    <p className="font-medium text-sm">Appendectomy (2015)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Family History</p>
                    <p className="font-medium text-sm">Father: Heart Disease</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Timeline" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-6 text-slate-800 dark:text-slate-200">Chronological Medical Timeline</h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] bg-primary text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <FileArchive className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                      <span className="text-xs font-bold text-primary">12 Oct 2026</span>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-1">General Checkup - Dr. Rahul Sharma</h3>
                      <p className="text-sm text-slate-500 mt-1">Blood Report uploaded. Prescription updated for Metformin.</p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] bg-slate-200 dark:bg-slate-800 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                      <FileArchive className="w-4 h-4" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm">
                      <span className="text-xs font-bold text-slate-500">28 Sep 2026</span>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-1">MRI Scan Uploaded</h3>
                      <p className="text-sm text-slate-500 mt-1">File: Brain_MRI_Scan.pdf uploaded by Dr. Sharma.</p>
                    </div>
                  </div>
              </div>
            </div>
          )}

          {activeTab === "Prescriptions" && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">Rx - 12 Oct 2026</h4>
                    <p className="text-sm text-muted-foreground">Dr. Rahul Sharma - Cardiologist</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="w-8 h-8"><Printer className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" className="w-8 h-8"><FileArchive className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm bg-slate-50 dark:bg-slate-900/30 p-3 rounded-md">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">1. Metformin 500mg</span>
                      <p className="text-xs text-muted-foreground mt-0.5">Take after meals.</p>
                    </div>
                    <span className="text-muted-foreground font-medium text-right">1-0-1<br/><span className="text-xs">15 days</span></span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <div>
                      <span className="font-medium text-blue-700 dark:text-blue-400">2. Vitamin D3 60K</span>
                    </div>
                    <span className="text-muted-foreground font-medium text-right">1 per week<br/><span className="text-xs">4 weeks</span></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Lab Reports" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="text" 
                    placeholder="Search by type or doctor..." 
                    className="pl-10 bg-white dark:bg-[#09090b] shadow-sm border-slate-200 dark:border-slate-800"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {["All", "Blood Report", "MRI Scan", "X-ray", "Vaccination"].map((type) => (
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

              {filteredRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-[#09090b] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center">
                  <FileArchive className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No records found</h3>
                  <p className="text-slate-500 text-sm mt-1 max-w-sm">
                    We couldn&apos;t find any medical records matching your search or filters. Try adjusting them.
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSearch(""); setFilterType("All"); }}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredRecords.map((record, idx) => (
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
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
