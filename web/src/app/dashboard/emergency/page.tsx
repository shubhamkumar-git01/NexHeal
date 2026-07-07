"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Siren, PhoneCall, Navigation, Droplet, HeartHandshake, Users, AlertTriangle, CheckCircle2, Clock, MapPin, Ambulance, ShieldAlert, Flame, Car, Map as MapIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLoading from "../loading";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Provider-agnostic map placeholder
const MapPlaceholder = () => (
  <div className="w-full h-64 bg-slate-100 dark:bg-slate-900 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center text-slate-400">
    <MapIcon className="w-12 h-12 mb-2 opacity-50" />
    <p className="font-medium">Map Interface (Provider Agnostic)</p>
    <p className="text-xs">Live tracking grid will render here.</p>
  </div>
);

export default function EmergencyPage() {
  const { user } = useAuth(false);
  const role = user?.role?.toLowerCase() || 'patient';
  const isPatient = role === 'patient';
  const isDoctor = role === 'doctor';
  const isVolunteer = role === 'volunteer';
  const isAdmin = role === 'super_admin' || role === 'zone_admin' || role === 'admin';
  const isResponder = role === 'responder';
  
  const [loading, setLoading] = useState(true);
  
  // Patient State
  const [isSosDialogOpen, setIsSosDialogOpen] = useState(false);
  const [sosReason, setSosReason] = useState("");
  const [isSosSubmitting, setIsSosSubmitting] = useState(false);
  const [activeIncident, setActiveIncident] = useState<any>(null);

  // Global State (For non-patients)
  const [incidents, setIncidents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("Active");

  const contacts = [
    { name: "Rahul Sharma (Brother)", phone: "+91 9876543210", type: "Family" },
    { name: "Dr. Anil (Family Doc)", phone: "+91 9123456789", type: "Doctor" },
    { name: "City Hospital", phone: "108", type: "Hospital" },
    { name: "Police", phone: "100", type: "Police" }
  ];

  useEffect(() => {
    // Simulate API / WebSocket hook fetch
    setTimeout(() => {
      if (!isPatient) {
        setIncidents([
          { id: "EMG-102", patient: "Rahul Sharma", reason: "Suspected Heart Attack", type: "MEDICAL", priority: "CRITICAL", status: "EN_ROUTE", time: "10 mins ago", location: "Sector 4, City Center" },
          { id: "EMG-101", patient: "Sneha Patel", reason: "Car Accident", type: "ACCIDENT", priority: "HIGH", status: "ASSIGNED", time: "2 mins ago", location: "Highway 12" },
          { id: "EMG-104", patient: "Ravi Kumar", reason: "Robbery", type: "POLICE", priority: "HIGH", status: "CREATED", time: "Just now", location: "Street 5, Downtown" },
        ]);
      }
      setLoading(false);
    }, 800);
  }, [isPatient]);

  const handleSosTrigger = () => setIsSosDialogOpen(true);

  const handleSosConfirm = () => {
    if (!sosReason) return;
    setIsSosSubmitting(true);
    // Simulate API POST /api/emergency/trigger
    setTimeout(() => {
      setIsSosSubmitting(false);
      setIsSosDialogOpen(false);
      setActiveIncident({
        id: "EMG-105",
        reason: sosReason,
        priority: "HIGH", // AI predicted
        status: "CREATED",
        timeline: [
          { status: "CREATED", time: new Date().toLocaleTimeString(), completed: true, notes: "SOS Triggered" },
          { status: "ACKNOWLEDGED", time: "", completed: false },
          { status: "ASSIGNED", time: "", completed: false },
          { status: "EN_ROUTE", time: "", completed: false },
          { status: "ARRIVED", time: "", completed: false },
        ]
      });
    }, 1500);
  };

  const cancelSos = () => setActiveIncident(null);

  if (loading) return <DashboardLoading />;

  if (isPatient) {
    if (activeIncident) {
      return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 pb-12">
          <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-200 dark:border-red-900 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 animate-pulse">
                <Siren className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-700 dark:text-red-400">Emergency Active</h1>
                <p className="font-medium text-red-600/80">ID: {activeIncident.id} • Priority: {activeIncident.priority}</p>
              </div>
            </div>
            <Button variant="destructive" onClick={cancelSos}>Cancel Emergency</Button>
          </div>

          <MapPlaceholder />

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Incident Timeline</CardTitle>
                <CardDescription>Live real-time status tracking.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                  {activeIncident.timeline.map((step: any, i: number) => (
                    <div key={i} className="relative flex items-center gap-4">
                      <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-[#09090b] z-10 shrink-0", step.completed ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-400")}>
                        {step.completed ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className={cn("font-semibold", step.completed ? "text-slate-900 dark:text-slate-100" : "text-slate-500")}>{step.status}</h4>
                        {step.time && <p className="text-xs text-muted-foreground">{step.time} {step.notes && `- ${step.notes}`}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border">
                    <Ambulance className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-medium">Ambulance Dispatch</p>
                      <p className="text-sm text-muted-foreground">Searching via GeoHash...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border">
                    <HeartHandshake className="w-8 h-8 text-emerald-500" />
                    <div>
                      <p className="font-medium">Community Volunteer</p>
                      <p className="text-sm text-muted-foreground">Alerting nearby verified responders.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-8 pb-12">
        <div className="flex flex-col items-center justify-center text-center space-y-6 bg-red-50 dark:bg-red-950/20 py-12 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500 blur-3xl opacity-10 rounded-full animate-pulse"></div>
          
          <Button 
            variant="destructive" 
            size="lg"
            onClick={handleSosTrigger}
            className="w-32 h-32 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all relative z-10 flex flex-col items-center justify-center space-y-2 bg-red-600 hover:bg-red-700"
          >
            <Siren className="w-10 h-10 animate-pulse" />
            <span className="font-extrabold text-xl tracking-wider">SOS</span>
          </Button>

          <div className="relative z-10 max-w-lg">
            <h1 className="text-3xl font-extrabold tracking-tight text-red-700 dark:text-red-400">Enterprise Emergency Engine</h1>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-2 font-medium">
              Tap to dispatch Police, Medical, Fire, or Volunteer assistance. AI will prioritize your request.
            </p>
          </div>
        </div>

        <Dialog open={isSosDialogOpen} onOpenChange={setIsSosDialogOpen}>
          <DialogContent className="sm:max-w-md border-red-200 dark:border-red-900">
            <DialogHeader>
              <DialogTitle className="text-red-600 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Declare Emergency</DialogTitle>
              <DialogDescription>AI will automatically categorize and dispatch the nearest response unit.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Type / Description</label>
                <Select value={sosReason} onValueChange={(v) => setSosReason(v || "")}>
                  <SelectTrigger>
                    <SelectValue placeholder="What is your emergency?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical: Heart Attack">Medical: Suspected Heart Attack</SelectItem>
                    <SelectItem value="Medical: Stroke">Medical: Suspected Stroke</SelectItem>
                    <SelectItem value="Accident: Vehicle">Accident: Vehicle Collision</SelectItem>
                    <SelectItem value="Police: Women Safety">Police: Women Safety SOS</SelectItem>
                    <SelectItem value="Police: Robbery">Police: Robbery / Intrusion</SelectItem>
                    <SelectItem value="Fire: Building">Fire: Building Fire</SelectItem>
                    <SelectItem value="Civic: Roadside">Civic: Roadside Assistance / Tow</SelectItem>
                    <SelectItem value="Medical: Blood Donor">Medical: Urgent Blood Required</SelectItem>
                    <SelectItem value="Disaster: Flood">Disaster: Flood / Earthquake Relief</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button type="button" variant="ghost" onClick={() => setIsSosDialogOpen(false)}>Cancel</Button>
              <Button type="button" variant="destructive" onClick={handleSosConfirm} disabled={!sosReason || isSosSubmitting}>
                {isSosSubmitting ? "Connecting to Dispatch..." : "Confirm SOS"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-red-200 dark:border-red-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
                <Ambulance className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Medical Services</h3>
              <p className="text-xs text-muted-foreground">Ambulance & Hospital Locator</p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Police Assistance</h3>
              <p className="text-xs text-muted-foreground">Women Safety & Crime SOS</p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900/50 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                <Flame className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Fire & Rescue</h3>
              <p className="text-xs text-muted-foreground">Fire department dispatch</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Roadside Assist</h3>
              <p className="text-xs text-muted-foreground">Tow, Fuel, or Flat Tyre</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    );
  }

  // -------------------------------------------------------------
  // COMMAND CENTER (Admin/Doctor/Responder/Volunteer)
  // -------------------------------------------------------------
  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#09090b] p-6 rounded-2xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-red-600 flex items-center">
            <Siren className="w-6 h-6 mr-3" /> Enterprise Command Center
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Multi-modal dispatch grid for AI-prioritized incidents.</p>
        </div>
      </div>

      <MapPlaceholder />

      <div className="flex gap-2 pb-2 overflow-x-auto">
        {["Active", "Pending Dispatch", "En Route", "Resolved", "Cancelled"].map((tab) => (
          <Button 
            key={tab} 
            variant={activeTab === tab ? "default" : "outline"}
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => setActiveTab(tab)}
          >
            {tab} {tab === "Active" && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{incidents.length}</span>}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {incidents.length === 0 ? (
          <div className="p-12 text-center border border-dashed rounded-xl text-muted-foreground">
            No active emergencies at the moment.
          </div>
        ) : (
          incidents.map((inc) => (
            <Card key={inc.id} className={cn("overflow-hidden transition-all hover:shadow-md", inc.priority === 'CRITICAL' ? "border-red-300 dark:border-red-900/50" : "")}>
              <div className={cn("h-1 w-full", inc.priority === 'CRITICAL' ? "bg-red-500" : inc.priority === 'HIGH' ? "bg-orange-500" : "bg-blue-500")} />
              <CardContent className="p-5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{inc.patient}</h3>
                    <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600">{inc.id}</span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded">{inc.type}</span>
                  </div>
                  <p className={cn("text-sm font-medium", inc.priority === 'CRITICAL' ? "text-red-600 dark:text-red-400" : "text-orange-600 dark:text-orange-400")}>
                    {inc.reason} • Priority: {inc.priority}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                    <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {inc.location}</span>
                    <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {inc.time}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                    {inc.status}
                  </span>
                  <div className="flex flex-wrap gap-2 w-full mt-2 justify-end">
                    {isDoctor && (
                      <Link href={`/dashboard/patients/${inc.id}`}>
                        <Button size="sm" variant="outline" className="w-full">View Medical Records</Button>
                      </Link>
                    )}
                    {isVolunteer && (
                      <>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">Accept Dispatch</Button>
                        <Button size="sm" variant="outline" className="text-destructive">Reject</Button>
                      </>
                    )}
                    {isAdmin && (
                      <Button size="sm">Manage Lifecycle</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  );
}
